from django.shortcuts import render
from rest_framework import viewsets, mixins
from . import models as m
from . import serializers as s
# Create your views here.

class CasoViewSet(mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet):
    queryset = m.Caso.objects.all().order_by("fecha_creacion")
    serializer_class = s.CasoWriteSerializer
    # permission_classes = [permissions.IsAdminUser] 
    #  Descomentar para proteger
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return s.CasoReadSerializer
        return s.CasoWriteSerializer