from rest_framework import serializers
from .models import Pelotones


class PelotonesSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Pelotones
        fields = '__all__'