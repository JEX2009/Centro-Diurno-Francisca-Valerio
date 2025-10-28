from rest_framework import serializers
from . import models as m
from paciente.serializers import PacienteSerializer
from paciente.models import Paciente 
from usuario.models import Usuario

class CitaReadSerializer(serializers.ModelSerializer):
    paciente = PacienteSerializer(read_only=True) 
    
    class Meta:
        model = m.Cita
        fields = ['id','paciente','usuario','fecha','hora','motivo_consulta','estado_cita','es_grupal','justificacion_ausencia']

class CitaWriteSerializer(serializers.ModelSerializer):
    paciente = serializers.PrimaryKeyRelatedField(
        queryset=Paciente.objects.all()
    )
    usuario = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = m.Cita
        fields = ['paciente', 'usuario', 'fecha', 'hora', 
                  'motivo_consulta', 'estado_cita', 'es_grupal']

class CitaStatusUpdateSerializer(serializers.ModelSerializer):
            estado_cita = serializers.ChoiceField(choices=[
                m.Cita.ESTADO_CITA.CANCELADA, 
                m.Cita.ESTADO_CITA.AUSENCIA
            ])
            
            class Meta:
                model = m.Cita
                fields = ['estado_cita', 'justificacion_ausencia']

class TerapiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Terapia
        fields = ['id', 'nombre']

class CitaTerapiaReadSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='id_terapia.id')
    nombre = serializers.ReadOnlyField(source='id_terapia.nombre')

    class Meta:
        model = m.CitaTerapia
        fields = ['id', 'nombre']

class AtencionCitaReadSerializer(serializers.ModelSerializer):
    cita = CitaReadSerializer(read_only=True)
    terapias_aplicadas = CitaTerapiaReadSerializer(many=True, read_only=True)
    
    class Meta:
        model = m.AtencionCita
        fields = [
            'id', 'cita', 'dolor_localizacion', 'procedimiento', 'pulso_bpm', 
            'oxigeno_spo2', 'peso_kg', 'altura_cm', 'presion_sistolica', 
            'presion_diastolica', 'glicemia', 'terapias_aplicadas'
        ]

class AtencionCitaSerializer(serializers.ModelSerializer):
    cita = serializers.PrimaryKeyRelatedField(queryset=m.Cita.objects.all())
    terapias_aplicadas = serializers.PrimaryKeyRelatedField(
        queryset=m.Terapia.objects.all(), 
        many=True, 
    )
    
    class Meta:
        model = m.AtencionCita
        fields = [
            'id', 'cita', 'dolor_localizacion', 'procedimiento', 'pulso_bpm', 
            'oxigeno_spo2', 'peso_kg', 'altura_cm', 'presion_sistolica', 
            'presion_diastolica', 'glicemia', 'terapias_aplicadas'
        ]

    def validate_cita(self, value):
        if hasattr(value, 'atencion'):
            raise serializers.ValidationError("Esta cita ya tiene un registro de atención.")
        return value

    def create(self, validated_data):
        terapias_data = validated_data.pop('terapias_aplicadas')
        atencion_cita = m.AtencionCita.objects.create(**validated_data)

        for terapia_obj in terapias_data:
            m.CitaTerapia.objects.create(id_cita=atencion_cita, id_terapia=terapia_obj)
        
        cita_original = validated_data.get('cita')
        if cita_original:
            cita_original.estado_cita = m.Cita.ESTADO_CITA.COMPLETA
            cita_original.save()

        return atencion_cita