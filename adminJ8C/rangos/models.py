from django.db import models

# Create your models here.

class Rangos(models.Model):
    idRango =  models.BigAutoField(primary_key=True)
    nombreRango = models.CharField(max_length=50)
    descripcionRango = models.CharField(max_length=255)
    desExpRango = models.CharField(max_length=255)
    activo = models.CharField(max_length=6)
    class Meta: 
        db_table = "rangos"