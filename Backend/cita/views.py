from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from . import models as m
from . import serializers as s
from rest_framework import permissions 

class CitaViewSet(viewsets.ModelViewSet):
    queryset = m.Cita.objects.all().order_by('-fecha', 'hora')
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return s.CitaReadSerializer
        return s.CitaWriteSerializer

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        cita = self.get_object()
        
        serializer = CitaStatusUpdateSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        nuevo_estado = serializer.validated_data['estado_cita']
        cita.estado_cita = nuevo_estado
        
        if nuevo_estado == m.Cita.ESTADO_CITA.AUSENCIA:
            cita.justificacion_ausencia = serializer.validated_data.get('justificacion_ausencia', None)
        else:
            cita.justificacion_ausencia = None 

        cita.save()
        return Response(s.CitaReadSerializer(cita).data, status=status.HTTP_200_OK)

class AtencionCitaViewSet(viewsets.ModelViewSet):
    queryset = m.AtencionCita.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return s.AtencionCitaReadSerializer
        return s.AtencionCitaSerializer 

class TerapiaViewSet(viewsets.ModelViewSet):
    queryset = m.Terapia.objects.all().order_by('nombre')
    serializer_class = s.TerapiaSerializer
    permission_classes = [permissions.IsAuthenticated]