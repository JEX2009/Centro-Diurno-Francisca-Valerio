from rest_framework import serializers
from . import models as m
from paciente import models as mPaciente
from usuario import models as mUsuario

#Serializers para crear y listar una prueba
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

class OpcionRespuestaWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.OpcionRespuesta
        fields = ['id','texto_opcion', 'valor_puntaje']

class PreguntaWriteSerializer(serializers.ModelSerializer):
    opciones = OpcionRespuestaWriteSerializer(many=True, required=False)
    class Meta:
        model = m.Pregunta
        fields = ['id', 'texto_pregunta', 'tipo_pregunta', 'opciones']

class PruebaWriteSerializer(serializers.ModelSerializer):
    preguntas = PreguntaWriteSerializer(many=True)
    
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
#El json que recibe para crear o actualizar una prueba es:
# {
#     "nombre": "Índice de Barthel",
#     "categoria": "Funcional",
#     "preguntas": [
#         {
#             "texto_pregunta": "Comer",
#             "tipo_pregunta": "Opcion_Multiple",
#             "opciones": [
#                 {
#                     "texto_opcion": "Independiente: Capaz de usar cualquier instrumento",
#                     "valor_puntaje": 10
#                 },
#                 {
#                     "texto_opcion": "Necesita ayuda para cortar, etc.",
#                     "valor_puntaje": 5
#                 },
#                 {
#                     "texto_opcion": "Dependiente",
#                     "valor_puntaje": 0
#                 }
#             ]
#         },
#         {
#             "texto_pregunta": "Trasladarse entre la silla y la cama",
#             "tipo_pregunta": "Opcion_Multiple",
#             "opciones": [
#                  {
#                     "texto_opcion": "Independiente",
#                     "valor_puntaje": 15
#                 },
#                 {
#                     "texto_opcion": "Mínima ayuda (verbal o física)",
#                     "valor_puntaje": 10
#                 },
#                 {
#                     "texto_opcion": "Gran ayuda (un asistente fuerte o dos)",
#                     "valor_puntaje": 5
#                 },
#                 {
#                     "texto_opcion": "Dependiente",
#                     "valor_puntaje": 0
#                 }
#             ]
#         },
#         {
#             "texto_pregunta": "Puntuación de dolor subjetivo (0-10)",
#             "tipo_pregunta": "Numerico"
#         }
#     ]
# }

#Serializers para crear y listar un resultado de prueba con respuestas anidadas
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
    # Anidamos el serializador de lectura de respuestas aquí
    respuestas = RespuestaReadSerializer(many=True, read_only=True) 
    
    class Meta:
        model = m.ResultadoPrueba
        fields = ['id', 'paciente', 'prueba', 'usuario', 'fecha_evaluacion', 'puntuacion_total', 'observaciones', 'respuestas']

class RespuestaNestedWriteSerializer(serializers.ModelSerializer):
    """Serializador para recibir las respuestas DENTRO del resultado principal."""
    pregunta = serializers.PrimaryKeyRelatedField(queryset=m.Pregunta.objects.all())
    opcion_respuesta = serializers.PrimaryKeyRelatedField(queryset=m.OpcionRespuesta.objects.all(), required=False, allow_null=True)
    
    class Meta:
        model = m.Respuesta
        fields = ['pregunta', 'valor', 'opcion_respuesta']

class ResultadoPruebaWriteSerializer(serializers.ModelSerializer):
    """
    Serializador principal para CREAR un resultado y todas sus respuestas en una sola petición.
    """
    paciente = serializers.PrimaryKeyRelatedField(queryset=mPaciente.Paciente.objects.all())
    prueba = serializers.PrimaryKeyRelatedField(queryset=m.Prueba.objects.all())
    usuario = serializers.PrimaryKeyRelatedField(queryset=mUsuario.Usuario.objects.all())
    
    # Aquí está la clave: aceptamos una lista de respuestas anidadas.
    respuestas = RespuestaNestedWriteSerializer(many=True)

    class Meta:
        model = m.ResultadoPrueba
        fields = ['paciente', 'prueba', 'usuario', 'observaciones', 'respuestas']

    def create(self, validated_data):
        respuestas_data = validated_data.pop('respuestas')
        resultado_prueba = m.ResultadoPrueba.objects.create(**validated_data)
        for respuesta_data in respuestas_data:
            m.Respuesta.objects.create(resultado_prueba=resultado_prueba, **respuesta_data)
        # Aquí podrías añadir lógica para calcular y guardar la 'puntuacion_total'.
        return resultado_prueba
    
#Recibe un JSON con la siguiente estructura:
# {
#     "paciente": 1,
#     "prueba": 1,
#     "usuario": 1,
#     "observaciones": "El paciente se mostró atento durante la prueba.",
#     "respuestas": [
#         {
#             "pregunta": 1,
#             "valor": "5"
#         },
#         {
#             "pregunta": 2,
#             "opcion_respuesta": 15
#         },
#         {
#             "pregunta": 3,
#             "valor": "Recordó 4 de 5 palabras."
#         }
#     ]
# }