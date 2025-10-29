from . import models as m
from rest_framework import serializers
from paciente import models as mPaciente
from paciente.serializers import PacienteSerializer

class CasoWriteSerializer(serializers.ModelSerializer):
    paciente = serializers.PrimaryKeyRelatedField(
        queryset=mPaciente.Paciente.objects.all()
    )
    class Meta:
        model = m.Caso
        fields = ["paciente", "usuario", "titulo", "descripcion", "fecha_creacion"]

class CasoReadSerializer(serializers.ModelSerializer):
    paciente = PacienteSerializer(read_only=True)
    
    class Meta:
        model = m.Caso
        fields = ["paciente", "usuario", "titulo", "descripcion", "fecha_creacion"]