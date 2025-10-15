from django.db import models

# Create your models here.

class Encargado(models.Model):
    paciente = models.ForeignKey('paciente.Paciente', on_delete=models.CASCADE)
    nombre_completo = models.CharField(max_length=100)
    cedula = models.CharField(max_length=20, unique=True)
    telefono = models.CharField(max_length=15)
    direccion = models.CharField(max_length=200)