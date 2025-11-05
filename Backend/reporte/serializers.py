from rest_framework import serializers

from . import models as m


class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Reporte
        fields = '__all__'
        
class ReportePreviewSerializer(serializers.Serializer):
    fecha_inicio = serializers.DateField()
    fecha_fin = serializers.DateField()
    
    medios_terapeuticos_utilizados = serializers.CharField(max_length=5000, required=False, allow_blank=True)
    dificultades_encontradas = serializers.CharField(max_length=5000, required=False, allow_blank=True)
    recomendaciones = serializers.CharField(max_length=5000, required=False, allow_blank=True)
    evaluaciones_realizadas = serializers.CharField(max_length=5000, required=False, allow_blank=True)