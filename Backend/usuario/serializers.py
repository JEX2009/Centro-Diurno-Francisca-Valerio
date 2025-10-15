from rest_framework import serializers
from . import models as m
from django.db import transaction

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = m.Usuario
        fields = ['id', 'username', 'first_name', 'last_name', 'codigo' , 'password']
        
    def create(self, validated_data):
        worker = m.Usuario.objects.create_user(**validated_data)
        return worker
    