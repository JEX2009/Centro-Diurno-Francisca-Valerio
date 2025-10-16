from django.db import models

# Create your models here.
class Caso(models.Model):
    paciente = models.ForeignKey('paciente.Paciente', on_delete=models.CASCADE)
    usuario = models.ForeignKey('usuario.Usuario', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)