from django.db import models
from django.utils import timezone
from pelotones.models import Pelotones
from rangos.models import Rangos
# Create your models here.

class Miembros(models.Model):
    idMiembro = models.BigAutoField(primary_key=True)
    nombreM = models.CharField(max_length=50)
    apellidosM = models.CharField(max_length=50)
    edadM = models.CharField(max_length=3)
    direcciónM = models.CharField(max_length=50)
    telefonoM = models.CharField(max_length=15)
    correoM = models.EmailField()
    fotoM = models.ImageField(upload_to='miembros/', null=True)
    # Relación ForeignKey con Pelotones
    peloton = models.ForeignKey(Pelotones, on_delete=models.CASCADE)
    # Relación ForeignKey con Rangos
    rango = models.ForeignKey(Rangos, on_delete=models.CASCADE)
    # Campo de fecha de ingreso que se establece automáticamente como la fecha actual
    fechaIngresoM = models.DateTimeField(default=timezone.now, editable=False)
    activo = models.CharField(max_length=6)
    class Meta: 
        db_table = "Miembros"    
    