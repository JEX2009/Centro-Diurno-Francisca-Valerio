from rest_framework import serializers
from . import models as m
from paciente.models import Paciente
from usuario.models import Usuario

# --- SERIALIZADORES PARA LA GESTIÓN DE PLANTILLAS (ADMIN) ---

# -- Escritura Profunda para Pruebas y sus Preguntas/Opciones --
class OpcionRespuestaNestedWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.OpcionRespuesta
        fields = ['texto_opcion', 'valor_puntaje']

class PreguntaNestedWriteSerializer(serializers.ModelSerializer):
    opciones = OpcionRespuestaNestedWriteSerializer(many=True, required=False)
    class Meta:
        model = m.Pregunta
        fields = ['texto_pregunta', 'tipo_pregunta', 'opciones']

class PruebaWriteSerializer(serializers.ModelSerializer):
    preguntas = PreguntaNestedWriteSerializer(many=True)
    class Meta:
        model = m.Prueba
        fields = ['nombre', 'categoria', 'preguntas']

    def create(self, validated_data):
        preguntas_data = validated_data.pop('preguntas')
        prueba = m.Prueba.objects.create(**validated_data)
        for pregunta_data in preguntas_data:
            opciones_data = pregunta_data.pop('opciones', [])
            pregunta = m.Pregunta.objects.create(prueba=prueba, **pregunta_data)
            for opcion_data in opciones_data:
                m.OpcionRespuesta.objects.create(pregunta=pregunta, **opcion_data)
        return prueba

    def update(self, instance, validated_data):
        preguntas_data = validated_data.pop('preguntas', [])
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.categoria = validated_data.get('categoria', instance.categoria)
        instance.save()
        instance.preguntas.all().delete()
        for pregunta_data in preguntas_data:
            opciones_data = pregunta_data.pop('opciones', [])
            pregunta = m.Pregunta.objects.create(prueba=instance, **pregunta_data)
            for opcion_data in opciones_data:
                m.OpcionRespuesta.objects.create(pregunta=pregunta, **opcion_data)
        return instance

# -- Lectura para Pruebas y sus Preguntas/Opciones --
class OpcionRespuestaReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.OpcionRespuesta
        fields = ['id', 'texto_opcion', 'valor_puntaje']

class PreguntaReadSerializer(serializers.ModelSerializer):
    opciones = OpcionRespuestaReadSerializer(many=True, read_only=True)
    class Meta:
        model = m.Pregunta
        fields = ['id', 'texto_pregunta', 'tipo_pregunta', 'opciones']

class PruebaReadSerializer(serializers.ModelSerializer):
    preguntas = PreguntaReadSerializer(many=True, read_only=True)
    class Meta:
        model = m.Prueba
        fields = ['id', 'nombre', 'categoria', 'preguntas']

# --- SERIALIZADORES PARA LA GESTIÓN DE RESULTADOS (TERAPEUTA) ---

# -- Lectura para Resultados y sus Respuestas --
class RespuestaReadSerializer(serializers.ModelSerializer):
    pregunta = serializers.StringRelatedField()
    opcion_respuesta = serializers.StringRelatedField()
    class Meta:
        model = m.Respuesta
        fields = ['id', 'pregunta', 'valor', 'opcion_respuesta']

class ResultadoPruebaReadSerializer(serializers.ModelSerializer):
    paciente = serializers.StringRelatedField()
    prueba = serializers.StringRelatedField()
    usuario = serializers.StringRelatedField()
    respuestas = RespuestaReadSerializer(many=True, read_only=True)
    class Meta:
        model = m.ResultadoPrueba
        fields = ['id', 'paciente', 'prueba', 'usuario', 'fecha_evaluacion', 'puntuacion_total', 'observaciones', 'respuestas']

# -- Escritura para Resultados y sus Respuestas --
class RespuestaNestedWriteSerializer(serializers.ModelSerializer):
    pregunta = serializers.PrimaryKeyRelatedField(queryset=m.Pregunta.objects.all())
    opcion_respuesta = serializers.PrimaryKeyRelatedField(queryset=m.OpcionRespuesta.objects.all(), required=False, allow_null=True)
    class Meta:
        model = m.Respuesta
        fields = ['pregunta', 'valor', 'opcion_respuesta']

class ResultadoPruebaWriteSerializer(serializers.ModelSerializer):
    paciente = serializers.PrimaryKeyRelatedField(queryset=Paciente.objects.all())
    prueba = serializers.PrimaryKeyRelatedField(queryset=m.Prueba.objects.all())
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())
    respuestas = RespuestaNestedWriteSerializer(many=True)
    class Meta:
        model = m.ResultadoPrueba
        fields = ['paciente', 'prueba', 'usuario', 'observaciones', 'respuestas']

    def create(self, validated_data):
        respuestas_data = validated_data.pop('respuestas')
        resultado_prueba = m.ResultadoPrueba.objects.create(**validated_data)
        for respuesta_data in respuestas_data:
            m.Respuesta.objects.create(resultado_prueba=resultado_prueba, **respuesta_data)
        return resultado_prueba
    
