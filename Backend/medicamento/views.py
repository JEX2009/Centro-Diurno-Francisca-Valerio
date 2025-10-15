from django.shortcuts import render 
from rest_framework import viewsets, permissions
from . import models as m
from . import serializers as s
# Create your views here.

class MedicamentoViewSet(viewsets.ModelViewSet):
    queryset = m.Medicamento.objects.all().order_by('id')
    permission_classes = [permissions.AllowAny]
    serializer_class = s.MedicamentoSerializer