from django.shortcuts import render
from rest_framework import viewsets, permissions
from . import models as m
from . import serializers as s

# Create your views here.

class EncargadoViewSet(viewsets.ModelViewSet):
    queryset = m.Encargado.objects.all()
    serializer_class = s.EncargadoSerializer
    permission_classes = [permissions.AllowAny]