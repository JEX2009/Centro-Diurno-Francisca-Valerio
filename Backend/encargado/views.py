from django.shortcuts import render
from rest_framework import viewsets, permissions
from . import models as m
from . import serializers as s

# Create your views here.

class EncargadoViewSet(viewsets.ModelViewSet):
    queryset = m.Encargado.objects.all()
    serializer_class = s.EncargadoWriteSerializer
    permission_classes = [permissions.AllowAny]
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return s.EncargadoReadSerializer
        return s.EncargadoWriteSerializer
