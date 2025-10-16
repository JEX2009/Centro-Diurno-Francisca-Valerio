from rest_framework import viewsets, permissions,mixins
from . import models as m
from . import serializers as s

class PruebaViewSet(viewsets.ModelViewSet):
    queryset = m.Prueba.objects.all()
    permission_classes = [permissions.AllowAny]
    # Elige el serializador según la acción
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return s.PruebaWriteSerializer
        return s.PruebaReadSerializer

class CreateRetrieveViewSet(mixins.CreateModelMixin,
                            mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            viewsets.GenericViewSet):
    """
    Un ViewSet personalizado que solo permite crear, listar y recuperar.
    No incluye los mixins de Update o Destroy.
    """
    pass

class ResultadoPruebaViewSet(CreateRetrieveViewSet):
    queryset = m.ResultadoPrueba.objects.all()
    permission_classes = [permissions.AllowAny]
    # Elige el serializador según la acción
    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return s.ResultadoPruebaWriteSerializer
        return s.ResultadoPruebaReadSerializer