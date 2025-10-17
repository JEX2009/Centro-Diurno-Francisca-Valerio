from rest_framework import serializers
from . import models as m

# --- Serializadores Base (Para anidar en otros) ---

class CitaSerializer(serializers.ModelSerializer):
    """Serializador simple para mostrar la información de una Cita."""
    class Meta:
        model = m.Cita
        fields = '__all__'

class TerapiaSerializer(serializers.ModelSerializer):
    """Serializador simple para mostrar la información de una Terapia."""
    class Meta:
        model = m.Terapia
        fields = ['id', 'nombre']

# --- Serializadores para LEER Datos (GET) ---

class CitaTerapiaReadSerializer(serializers.ModelSerializer):
    """
    Serializador para la tabla intermedia CitaTerapia.
    Su trabajo es "saltar" desde CitaTerapia hasta Terapia para obtener el nombre.
    """
    # Usa 'source' para buscar el dato en el modelo relacionado 'id_terapia'.
    id = serializers.ReadOnlyField(source='id_terapia.id')
    nombre = serializers.ReadOnlyField(source='id_terapia.nombre')

    class Meta:
        model = m.CitaTerapia
        fields = ['id', 'nombre']

class AtencionCitaReadSerializer(serializers.ModelSerializer):
    """
    Serializador para MOSTRAR los detalles de una atención.
    Anida la información de la cita y la lista de terapias aplicadas.
    """
    # Anida los detalles completos de la cita.
    cita = CitaSerializer(read_only=True)
    # Anida la lista de terapias usando nuestro serializador intermedio.
    terapias_aplicadas = CitaTerapiaReadSerializer(many=True, read_only=True)
    
    class Meta:
        model = m.AtencionCita
        fields = [
            'id', 'cita', 'dolor_localizacion', 'procedimiento', 'pulso_bpm', 
            'oxigeno_spo2', 'peso_kg', 'altura_cm', 'presion_sistolica', 
            'presion_diastolica', 'glicemia', 'terapias_aplicadas'
        ]

# --- Serializadores para ESCRIBIR Datos (POST) ---

class AtencionCitaSerializer(serializers.ModelSerializer):
    """
    Serializador para CREAR una atención de cita.
    Acepta una lista de IDs de terapias para la creación anidada.
    """
    # Para la escritura, solo necesitamos el ID de la cita.
    cita = serializers.PrimaryKeyRelatedField(queryset=m.Cita.objects.all())
    
    # Campo "virtual" para recibir la lista de IDs de las terapias.
    terapias_aplicadas = serializers.PrimaryKeyRelatedField(
        queryset=m.Terapia.objects.all(), 
        many=True, 
    )
    
    class Meta:
        model = m.AtencionCita
        fields = [
            'id', 'cita', 'dolor_localizacion', 'procedimiento', 'pulso_bpm', 
            'oxigeno_spo2', 'peso_kg', 'altura_cm', 'presion_sistolica', 
            'presion_diastolica', 'glicemia', 'terapias_aplicadas'
        ]

    def validate_cita(self, value):
        """Previene que se registre una atención para una cita que ya la tiene."""
        if hasattr(value, 'atencion'):
            raise serializers.ValidationError("Esta cita ya tiene un registro de atención.")
        return value

    def create(self, validated_data):
        """Crea la AtencionCita y sus CitaTerapia asociadas."""
        terapias_data = validated_data.pop('terapias_aplicadas')
        atencion_cita = m.AtencionCita.objects.create(**validated_data)

        # Usamos los nombres de campo del modelo: 'id_cita' e 'id_terapia'.
        for terapia_obj in terapias_data:
            m.CitaTerapia.objects.create(id_cita=atencion_cita, id_terapia=terapia_obj)
        
        # Opcional: Marcar la cita original como completada.
        cita_original = validated_data.get('cita')
        if cita_original:
            cita_original.estado_cita = m.Cita.ESTADO_CITA.COMPLETA
            cita_original.save()

        return atencion_cita