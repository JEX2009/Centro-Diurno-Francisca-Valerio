from rest_framework import serializers
from . import models as m

class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Reporte
        fields = '__all__'
        
class ReportePreviewSerializer(serializers.Serializer):
    fecha_inicio = serializers.DateField()
    fecha_fin = serializers.DateField()
    
