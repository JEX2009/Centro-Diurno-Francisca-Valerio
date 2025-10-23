from django.shortcuts import render
from rest_framework import viewsets, permissions
from . import models as m
from . import serializers as s
# Create your views here.

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = m.Paciente.objects.all().order_by('-esta_activo')
    serializer_class = s.PacienteSerializer
    permission_classes = [permissions.AllowAny]
    def perform_destroy(self, instance):
        log_serializer = s.LogEliminacionPacienteSerializer(data=self.request.data)
        log_serializer.is_valid(raise_exception=True)
        
        # El serializador ya te entrega el objeto Usuario completo
        motivo = log_serializer.validated_data['motivo']
        usuario_eliminador = log_serializer.validated_data['usuario'] # ¡Aquí está la instancia!
        
        # 3. Crear el log con el objeto Usuario encontrado
        m.LogEliminacionPaciente.objects.create(
            paciente=instance,
            usuario=usuario_eliminador, # Pasas la instancia del Usuario
            motivo=motivo
        )
        
        # 4. Desactivar el paciente
        instance.esta_activo = False
        instance.save()