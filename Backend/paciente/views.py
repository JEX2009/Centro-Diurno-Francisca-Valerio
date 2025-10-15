from django.shortcuts import render
from rest_framework import viewsets, permissions
from . import models as m
from . import serializers as s
# Create your views here.

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = m.Paciente.objects.all()
    serializer_class = s.PacienteSerializer
    permission_classes = [permissions.AllowAny]