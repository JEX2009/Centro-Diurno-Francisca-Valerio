from django.db import models

# Create your models here.


class Cita (models.Model):
    class ESTADO_CITA(models.TextChoices):
        PENDIENTE = 'PENDIENTE', 'Pendiente'
        COMPLETA = 'COMPLETA', 'Completa'
        AUSENCIA = 'AUSENCIA', 'Ausencia'
        CANCELADA = 'CANCELADA', 'Cancelada'
    
    paciente = models.ForeignKey('paciente.Paciente', on_delete=models.CASCADE)
    usuario = models.ForeignKey('usuario.Usuario', on_delete=models.CASCADE)
    fecha = models.DateField()
    hora = models.TimeField()
    motivo_consulta = models.TextField()
    estado_cita = models.CharField(choices=ESTADO_CITA.choices, default=ESTADO_CITA.PENDIENTE, max_length=10)
    justificacion_ausencia = models.TextField(blank=True, null=True)
    def __str__(self):
        return f"Cita de {self.paciente} con {self.usuario} el {self.fecha} a las {self.hora}"

class AtencionCita(models.Model):
    cita = models.OneToOneField(Cita, on_delete=models.CASCADE, related_name='atencion')
    dolor_localizacion = models.CharField(max_length=100, blank=True, null=True)
    procedimiento = models.TextField(blank=True, null=True)
    pulso_bpm = models.FloatField(blank=True, null=True)
    oxigeno_spo2=models.FloatField(blank=True, null=True)
    peso_kg = models.FloatField(blank=True, null=True)
    altura_cm = models.FloatField(blank=True, null=True)
    presion_sistolica = models.FloatField(blank=True, null=True)
    presion_diastolica = models.FloatField(blank=True, null=True)
    glicemia = models.FloatField(blank=True, null=True)
    def __str__(self):
        return f"Atención de la {self.cita}"

class Terapia (models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class CitaTerapia (models.Model):
    id_cita = models.ForeignKey('AtencionCita', on_delete=models.CASCADE, related_name="terapias_aplicadas")
    id_terapia = models.ForeignKey(Terapia, on_delete=models.CASCADE)
    def __str__(self):
        return f"Terapia {self.id_terapia} en {self.id_cita}"
