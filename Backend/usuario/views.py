from django.shortcuts import render
from rest_framework import viewsets, permissions
from . import models as m
from . import serializers as s
# Create your views here.

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = m.Usuario.objects.all()
    serializer_class = s.UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]