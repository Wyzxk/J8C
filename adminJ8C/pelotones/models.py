from django.db import models

# Create your models here.

class Pelotones(models.Model):
    idPeloton =  models.BigAutoField(primary_key=True)
    nombreP = models.CharField(max_length=30)
    descripcionP = models.CharField(max_length=255)
    ubicacionP = models.CharField(max_length=255)
    activo = models.CharField(max_length=6)
    class Meta: 
        db_table = "Pelotones"