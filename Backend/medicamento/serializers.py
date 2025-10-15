from rest_framework import serializers
from . import models as m
from paciente import models as mPaciente

class MedicamentoSerializer(serializers.ModelSerializer):
    paciente_id = serializers.PrimaryKeyRelatedField(queryset=mPaciente.Paciente.objects.all(), source='paciente')

    class Meta:
        model = m.Medicamento
        fields = ['id', 'paciente_id', 'nombre', 'dosis', 'frecuencia', 'motivo', 'fecha_inicio', 'fecha_fin', 'instrucciones']