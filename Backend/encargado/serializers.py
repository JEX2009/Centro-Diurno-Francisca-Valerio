from rest_framework import serializers
from . import models as m
from paciente import models as mPaciente
from paciente.serializers import PacienteSerializer

class EncargadoWriteSerializer(serializers.ModelSerializer):
    paciente = serializers.PrimaryKeyRelatedField(queryset=mPaciente.Paciente.objects.all())
    class Meta:
        model = m.Encargado
        fields = ['id', 'paciente', 'nombre_completo', 'cedula', 'telefono', 'direccion']
        
class EncargadoReadSerializer(serializers.ModelSerializer):
    paciente = PacienteSerializer(read_only=True)
    class Meta:
        model = m.Encargado
        fields = ['id', 'paciente', 'nombre_completo', 'cedula', 'telefono', 'direccion']