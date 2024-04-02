from rest_framework import serializers
from .models import Rangos

class RangosSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Rangos
        fields = '__all__'