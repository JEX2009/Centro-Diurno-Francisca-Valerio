from django.db import models
from django.conf import settings

# Create your models here.
class Reporte(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reportes')
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    medios_terapeuticos_utilizados = models.TextField(blank=True, null=True)
    dificultades_encontradas = models.TextField(blank=True, null=True)
    recomendaciones = models.TextField(blank=True, null=True)
    comentarios = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre