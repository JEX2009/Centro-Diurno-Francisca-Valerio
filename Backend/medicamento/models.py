from django.db import models

# Create your models here.
class Medicamento(models.Model):
    paciente = models.ForeignKey('paciente.Paciente', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    dosis = models.CharField(max_length=100)
    frecuencia = models.CharField(max_length=100)
    motivo = models.TextField(blank=True, null=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(null=True, blank=True)
    instrucciones = models.TextField(null=True, blank=True)