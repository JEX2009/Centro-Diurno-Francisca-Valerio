from django.shortcuts import render

from rest_framework import viewsets, permissions, mixins
from . import models as m
from . import serializers as s

class PruebaViewSet(viewsets.ModelViewSet):
    """
    Gestiona las plantillas de Pruebas.
    Permite la creación/actualización anidada de Preguntas y Opciones.
    """
    queryset = m.Prueba.objects.all()
    # permission_classes = [permissions.IsAdminUser] # Descomentar para proteger

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return s.PruebaWriteSerializer
        return s.PruebaReadSerializer


class ResultadoPruebaViewSet(viewsets.ModelViewSet):
    """
    Gestiona los resultados de las pruebas llenados por los terapeutas.
    Permite la creación anidada de Respuestas.
    """
    queryset = m.ResultadoPrueba.objects.all().order_by('-fecha_evaluacion')
    # permission_classes = [permissions.IsAuthenticated] # Descomentar para proteger

    def get_serializer_class(self):
        if self.action == 'create': # Solo se necesita anidación para crear
            return s.ResultadoPruebaWriteSerializer
        return s.ResultadoPruebaReadSerializer