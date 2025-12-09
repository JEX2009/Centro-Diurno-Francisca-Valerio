from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Usuario(AbstractUser):
    codigo= models.CharField(max_length=20, unique=True)
    def __str__(self):
        Usuario = self.first_name + ' ' + self.last_name
        return Usuario