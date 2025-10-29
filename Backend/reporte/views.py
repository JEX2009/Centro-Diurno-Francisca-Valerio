from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from . import models as m
from . import serializers as s
from cita import models as m_cita
from caso import models as m_caso
from usuario.models import Usuario as m_usuario
from caso.serializers import CasoReadSerializer

#http://localhost:8000/api/v1/reportes/reporte/generate-preview/
class ReporteViewSet(viewsets.ModelViewSet):
    queryset = m.Reporte.objects.all()
    serializer_class = s.ReporteSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'], url_path='generate-preview')
    def generate_preview(self, request):
        """
        Calcula las estadísticas para un rango de fechas y devuelve una vista previa
        para el machote del reporte.
        """
        preview_serializer = s.ReportePreviewSerializer(data=request.data)
        preview_serializer.is_valid(raise_exception=True)
        
        inicio = preview_serializer.validated_data['fecha_inicio']
        fin = preview_serializer.validated_data['fecha_fin']
        
        # --- Consultas a la Base de Datos ---
        
        # Base para filtrar citas y atenciones en el rango de fechas
        citas_en_rango = m_cita.Cita.objects.filter(fecha__range=[inicio, fin])
        atenciones_en_rango = m_cita.AtencionCita.objects.filter(cita__fecha__range=[inicio, fin])

        # Estadísticas generales
        cantidad_citas_sesiones = citas_en_rango.filter(estado_cita='COMPLETA').count()
        cantidad_pacientes_atendidos = citas_en_rango.values('paciente').distinct().count()
        cantidad_ausencias_justificadas = citas_en_rango.filter(estado_cita='AUSENCIA', justificacion_ausencia__isnull=False).count()
        cantidad_ausencias_injustificadas = citas_en_rango.filter(estado_cita='AUSENCIA', justificacion_ausencia__isnull=True).count()
        
        # CAMBIO: Conteo de terapias específicas (Asumiendo que los nombres en la BD son exactos)
        terapias_realizadas = m_cita.CitaTerapia.objects.filter(id_cita__in=atenciones_en_rango)
        
        num_electroterapias = terapias_realizadas.filter(id_terapia__nombre__iexact='Electroterapia').count()
        num_ejercicios_terapeuticos = terapias_realizadas.filter(id_terapia__nombre__iexact='Ejercicio Terapeutico').count()
        num_terapias_cognitivas = terapias_realizadas.filter(id_terapia__nombre__iexact='Ejercicio Terapias Cognitivas PAM con DC').count()
        
        num_terapias_grupales = citas_en_rango.filter(es_grupal=True, estado_cita='COMPLETA').count()

        # Casos relevantes
        casos_relevantes_qs = m_caso.Caso.objects.filter(fecha_creacion__date__range=[inicio, fin])
        casos_relevantes_serializer = CasoReadSerializer(casos_relevantes_qs, many=True)

        #para debuggin 
        if not request.user.is_authenticated:
            usuario_actual = m_usuario.objects.get(id='1')
        else:
            usuario_actual = request.user['usuario']
        nombre_completo_usuario = f"{usuario_actual.first_name} {usuario_actual.last_name}"

        response_data = {
            "mes": inicio.strftime("%B").capitalize(), 
            "anio": inicio.year,
            "persona_que_genera": nombre_completo_usuario,
            "codigo_persona": usuario_actual.codigo,
            "consultorio": "Terapia Fisica",
            "resumen_del_mes": {
                "usuarios_atendidos": cantidad_pacientes_atendidos,
                "sesiones_realizadas": cantidad_citas_sesiones,
            },
            "estadisticas_de_tratamiento": {
                "total_usuarios_atendidos": cantidad_pacientes_atendidos,
                "total_electroterapias": num_electroterapias,
                "total_ejercicios_terapeuticos": num_ejercicios_terapeuticos,
                "total_terapias_cognitivas_pam": num_terapias_cognitivas,
                "ausencias_justificadas": cantidad_ausencias_justificadas,
                "ausencias_injustificadas": cantidad_ausencias_injustificadas,
                "evaluaciones_realizadas": "DATO_PENDIENTE", # Necesitaríamos saber qué cuenta como 'evaluación'
                "terapias_grupales": num_terapias_grupales,
            },
            "casos_destacados": casos_relevantes_serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)