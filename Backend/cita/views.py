from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from . import models as m
from . import serializers as s

# --- Vistas para la gestión de Citas ---

class CitaViewSet(viewsets.ModelViewSet):
    """
    Gestiona la creación y visualización de Citas.
    También incluye una acción para marcarlas como canceladas o ausentes.
    """
    queryset = m.Cita.objects.all().order_by('-fecha', '-hora')
    serializer_class = s.CitaSerializer

    @action(detail=True, methods=['patch'], url_path='update-status')
    def update_status(self, request, pk=None):
        """
        Acción personalizada para marcar una cita como CANCELADA o AUSENCIA.
        Espera un JSON con 'estado_cita' y opcionalmente 'justificacion_ausencia'.
        """
        cita = self.get_object()

        # Para esta acción, usamos un serializador simple que solo valida el estado.
        # (Este serializador debería estar en serializers.py)
        class CitaStatusUpdateSerializer(serializers.ModelSerializer):
            estado_cita = serializers.ChoiceField(choices=[
                m.Cita.ESTADO_CITA.CANCELADA, 
                m.Cita.ESTADO_CITA.AUSENCIA
            ])
            class Meta:
                model = m.Cita
                fields = ['estado_cita', 'justificacion_ausencia']
        
        serializer = CitaStatusUpdateSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        # Actualizamos la cita con los datos validados.
        cita.estado_cita = serializer.validated_data['estado_cita']
        if 'justificacion_ausencia' in serializer.validated_data:
            cita.justificacion_ausencia = serializer.validated_data['justificacion_ausencia']
        
        cita.save()
        return Response(s.CitaSerializer(cita).data)

class AtencionCitaViewSet(viewsets.ModelViewSet):
    """
    Gestiona el registro de la ATENCIÓN de una cita (cuando se completa).
    """
    queryset = m.AtencionCita.objects.all()

    def get_serializer_class(self):
        """
        Elige el serializador correcto según la acción (Leer o Escribir).
        """
        # Si la acción es GET (ver lista o detalle), usa el serializador de LECTURA.
        if self.action in ['list', 'retrieve']:
            return s.AtencionCitaReadSerializer
        # Para crear o actualizar, usa el serializador de ESCRITURA.
        return s.AtencionCitaSerializer

# --- Vista Administrativa (para el catálogo de terapias) ---

class TerapiaViewSet(viewsets.ModelViewSet):
    """
    Permite a un administrador gestionar el catálogo de terapias disponibles.
    """
    queryset = m.Terapia.objects.all().order_by('nombre')
    serializer_class = s.TerapiaSerializer
    # En un proyecto real, aquí añadirías: permission_classes = [IsAdminUser]