from . import models as m
from rest_framework import serializers

class CasoSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Caso
        fields = '__all__'