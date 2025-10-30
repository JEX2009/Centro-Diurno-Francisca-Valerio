from rest_framework import serializers
from . import models as m
from paciente import models as mPaciente
from paciente.serializers import PacienteSerializer

class MedicamentoWriteSerializer(serializers.ModelSerializer):
    paciente = serializers.PrimaryKeyRelatedField(
        queryset=mPaciente.Paciente.objects.all()
    )
    class Meta:
        model = m.Medicamento
        fields = ['id', 'paciente', 'nombre', 'dosis', 'frecuencia', 'motivo', 'fecha_inicio', 'fecha_fin', 'instrucciones']
class MedicamentoReadSerializer(serializers.ModelSerializer):
    paciente = PacienteSerializer(read_only=True)
    
    class Meta:
        model = m.Medicamento
        fields = ['id', 'paciente', 'nombre', 'dosis', 'frecuencia', 'motivo', 'fecha_inicio', 'fecha_fin', 'instrucciones']