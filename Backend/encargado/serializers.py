from rest_framework import serializers
from . import models as m
from paciente import models as mPaciente

class EncargadoSerializer(serializers.ModelSerializer):
    paciente_id = serializers.PrimaryKeyRelatedField(queryset=mPaciente.Paciente.objects.all(), source='paciente')
    class Meta:
        model = m.Encargado
        fields = ['id', 'paciente_id', 'nombre_completo', 'cedula', 'telefono', 'direccion']