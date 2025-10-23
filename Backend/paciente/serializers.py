from rest_framework import serializers
from . import models as m
from usuario import models as m_user

class LogEliminacionPacienteSerializer(serializers.ModelSerializer):
    id_usuario = serializers.PrimaryKeyRelatedField(
        queryset=m_user.Usuario.objects.all(),
        source='usuario',
        write_only=True
    )
    
    class Meta:
        model = m.LogEliminacionPaciente
        # Ahora incluimos ambos campos que vienen en el payload
        fields = ['motivo', 'id_usuario']

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Paciente
        fields = '__all__' 


class EpicrisisSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Epicrisis
        fields = ['id', 'paciente', 'foto', 'fecha_creacion']
        read_only_fields = ['fecha_creacion'] 

