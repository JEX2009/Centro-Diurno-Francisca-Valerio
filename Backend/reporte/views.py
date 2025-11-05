from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from . import models as m
from . import serializers as s
from cita import models as m_cita
from caso import models as m_caso
from usuario.models import Usuario as m_usuario
from caso.serializers import CasoReadSerializer
from django.db import models

class ReporteViewSet(viewsets.ModelViewSet):
    queryset = m.Reporte.objects.all()
    serializer_class = s.ReporteSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='generate-preview')
    def generate_preview(self, request):
        preview_serializer = s.ReportePreviewSerializer(data=request.data)
        preview_serializer.is_valid(raise_exception=True)
        
        inicio = preview_serializer.validated_data['fecha_inicio']
        fin = preview_serializer.validated_data['fecha_fin']
        
        # Obtiene el número de evaluaciones (debe ser un entero o 0)
        evaluaciones = preview_serializer.validated_data.get('evaluaciones_realizadas', 0) 
        medios = preview_serializer.validated_data.get('medios_terapeuticos_utilizados', '')
        dificultades = preview_serializer.validated_data.get('dificultades_encontradas', '')
        recomendaciones = preview_serializer.validated_data.get('recomendaciones', '')
        
        usuario_actual = request.user 
        
        if not isinstance(usuario_actual, m_usuario):
             return Response({"detail": "Usuario no autenticado o tipo incorrecto."}, status=status.HTTP_401_UNAUTHORIZED)
        
        nombre_completo_usuario = f"{usuario_actual.first_name} {usuario_actual.last_name}"

        citas_en_rango = m_cita.Cita.objects.filter(
            fecha__range=[inicio, fin]
        )
        atenciones_en_rango = m_cita.AtencionCita.objects.filter(cita__fecha__range=[inicio, fin])

        cantidad_citas_sesiones = citas_en_rango.filter(estado_cita='COMPLETA').count()
        cantidad_pacientes_atendidos = citas_en_rango.values('paciente').distinct().count()
        cantidad_ausencias_justificadas = citas_en_rango.filter(estado_cita='AUSENCIA', justificacion_ausencia__isnull=False).count()
        cantidad_ausencias_injustificadas = citas_en_rango.filter(estado_cita='AUSENCIA', justificacion_ausencia__isnull=True).count()
        
        terapias_realizadas = m_cita.CitaTerapia.objects.filter(id_cita__in=atenciones_en_rango.values('id'))
        
        terapias_contadas = terapias_realizadas.values(
            nombre_terapia=models.F('id_terapia__nombre')
        ).annotate(
            total=models.Count('id_terapia__nombre')
        ).order_by('nombre_terapia')
        
        num_terapias_grupales = citas_en_rango.filter(es_grupal=True, estado_cita='COMPLETA').count()

        casos_relevantes_qs = m_caso.Caso.objects.filter(fecha_creacion__date__range=[inicio, fin])
        casos_relevantes_serializer = CasoReadSerializer(casos_relevantes_qs, many=True)

        response_data = {
            "resumen": "Reporte generado con base en los datos estadísticos y parámetros de búsqueda.", 
            "mes": inicio.strftime("%B").capitalize(), 
            "anio": inicio.year,
            "persona_que_genera": nombre_completo_usuario,
            "codigo_persona": usuario_actual.codigo if hasattr(usuario_actual, 'codigo') else 'N/A',
            "consultorio": "Terapia Fisica",
            "resumen_del_mes": {
                "usuarios_atendidos": cantidad_pacientes_atendidos,
                "sesiones_realizadas": cantidad_citas_sesiones,
            },
            "estadisticas_de_tratamiento": {
                "total_usuarios_atendidos": cantidad_pacientes_atendidos,
                "terapias_dinamicas": list(terapias_contadas), 
                "ausencias_justificadas": cantidad_ausencias_justificadas,
                "ausencias_injustificadas": cantidad_ausencias_injustificadas,
                "evaluaciones_realizadas": evaluaciones, 
                "terapias_grupales": num_terapias_grupales,
            },
            "casos_destacados": casos_relevantes_serializer.data,
            
            "inicio_reporte": inicio,
            "fin_reporte": fin,
            "medios_terapeuticos_utilizados": medios,
            "dificultades_encontradas": dificultades,
            "recomendaciones": recomendaciones,
        }

        return Response(response_data, status=status.HTTP_200_OK)