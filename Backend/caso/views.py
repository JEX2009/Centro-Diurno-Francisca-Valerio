from django.shortcuts import render
from rest_framework import viewsets, mixins
from . import models as m
from . import serializers as s
# Create your views here.

class CasoViewSet(mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet):
    queryset = m.Caso.objects.all()
    serializer_class = s.CasoSerializer
    # permission_classes = [permissions.IsAdminUser] # Descomentar para proteger
