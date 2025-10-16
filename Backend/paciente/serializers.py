from rest_framework import serializers
from . import models as m

class LogEliminacionPacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.LogEliminacionPaciente
        fields = ['motivo']

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Paciente
        fields = '__all__' 



class EpicrisisSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Epicrisis
        fields = ['id', 'paciente', 'foto', 'fecha_creacion']
        read_only_fields = ['fecha_creacion'] 

