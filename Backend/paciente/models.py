from django.db import models

# Create your models here.
class Paciente(models.Model):
    class Genero(models.TextChoices):
        MASCULINO = 'Masculino', 'Masculino'
        FEMENINO = 'Femenino', 'Femenino'
        OTRO = 'Otro', 'Otro'

    nombre_completo = models.CharField(max_length=100)
    cedula = models.CharField(max_length=20, unique=True)
    email = models.EmailField(blank=True, null=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    
    # Usamos las constantes definidas arriba
    genero = models.CharField(
        max_length=10, 
        choices=Genero.choices, 
        default=Genero.OTRO
    )
    
    fecha_nacimiento = models.DateField()
    cantidad_hijos = models.IntegerField(blank=True, null=True, default=0)
    profesion = models.CharField(max_length=100, blank=True, null=True)
    fecha_ingreso = models.DateField(auto_now_add=True)
    enfermedades = models.TextField(blank=True, null=True)
    estado_pension = models.CharField(max_length=50, blank=True, null=True)
    monto_pension = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    personas_con_las_que_habita = models.TextField(blank=True, null=True)
    tiene_diabetes = models.BooleanField(default=False)
    fecha_diagnostico_diabetes = models.DateField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    # The `esta_activo` field in the `Paciente` model is a BooleanField that represents whether the
    # patient is currently active or not. By default, it is set to `True`, indicating that the patient
    # is active. This field allows you to easily track the active status of a patient within your
    # system.
    esta_activo = models.BooleanField(default=True)
    
    def __str__(self):
        return self.nombre_completo

class Epicrisis(models.Model):
    """
    Almacena una foto de epicrisis para un paciente.
    Un paciente puede tener múltiples fotos de epicrisis.
    """
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='epicrisis_fotos')
    foto = models.ImageField(upload_to='epicrisis_fotos/')
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Epicrisis de {self.paciente.nombre_completo} - {self.fecha_creacion.strftime('%Y-%m-%d')}"     

class LogEliminacionPaciente(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    usuario = models.ForeignKey('usuario.Usuario', on_delete=models.CASCADE)
    fecha_eliminacion = models.DateTimeField(auto_now_add=True)
    motivo = models.TextField(max_length=500)