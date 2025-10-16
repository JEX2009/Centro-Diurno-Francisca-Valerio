from django.db import models

# Create your models here.
#Apartado para crear las pruebas 
class Prueba(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.nombre} ({self.categoria})"

# Apartado para generar preguntas y su valor
class Pregunta(models.Model):
    class TipoPregunta(models.TextChoices):
        NUMERICO = 'Numerico', 'Numerico'
        OPCION_MULTIPLE = 'Opcion_Multiple', 'Opcion_Multiple'
        TEXTO = 'Texto', 'Texto'
    
    prueba = models.ForeignKey(Prueba, on_delete=models.CASCADE,related_name='preguntas')
    texto_pregunta = models.TextField()
    tipo_pregunta= models.CharField( 
        max_length=20,
        choices=TipoPregunta.choices, 
        default=TipoPregunta.TEXTO
    )
    def __str__(self):
        return f"{self.texto_pregunta[:50]}... ({self.prueba.nombre})"

class OpcionRespuesta(models.Model):
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE,related_name='opciones')
    texto_opcion = models.CharField(max_length=100)
    valor_puntaje = models.IntegerField()    
    def __str__(self):
        return f"{self.texto_opcion} ({self.valor_puntaje} puntos)"

# Apartado para registrar los resultados de las pruebas
class ResultadoPrueba(models.Model):
    paciente = models.ForeignKey('paciente.Paciente', on_delete=models.CASCADE,related_name='resultados_pruebas')
    prueba = models.ForeignKey(Prueba, on_delete=models.CASCADE,related_name='resultados')
    usuario = models.ForeignKey('usuario.Usuario', on_delete=models.CASCADE,related_name='resultados_pruebas_realizadas')
    fecha_evaluacion = models.DateField(auto_now_add=True) 
    puntuacion_total = models.IntegerField(null=True, blank=True, help_text="Puntaje final calculado para el test")
    observaciones = models.TextField(blank=True, null=True, help_text="Observaciones generales del terapeuta")

    def __str__(self):
        return f"Resultado de {self.prueba.nombre} para {self.paciente} - {self.fecha_evaluacion}"

class Respuesta(models.Model):
    resultado_prueba = models.ForeignKey(ResultadoPrueba, on_delete=models.CASCADE,related_name='respuestas')
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE,related_name='respuestas_dadas')
    valor = models.CharField(max_length=255,blank=True, null=True, help_text="Para respuestas de tipo numérico o texto")
    opcion_respuesta = models.ForeignKey(OpcionRespuesta, on_delete=models.CASCADE, blank=True, null=True,related_name='respuestas_seleccionadas')

    def __str__(self):
        return f"Respuesta a '{self.pregunta.texto_pregunta[:30]}...' en resultado {self.resultado_prueba.id}"
    
