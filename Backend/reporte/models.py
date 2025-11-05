from django.db import models
from django.conf import settings

class Reporte(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reportes')
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    
    # Campos de texto del formulario
    medios_terapeuticos_utilizados = models.TextField(blank=True, null=True)
    dificultades_encontradas = models.TextField(blank=True, null=True)
    recomendaciones = models.TextField(blank=True, null=True)
    
    # Campo numérico
    evaluaciones_realizadas = models.IntegerField(blank=True, null=True, default=0)
    
    comentarios = models.CharField(max_length=100, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reporte de {self.usuario.get_full_name()} ({self.fecha_inicio} a {self.fecha_fin})"