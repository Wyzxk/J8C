# Generated by Django 4.2.4 on 2024-03-27 18:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rangos', '0003_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rangos',
            name='cantidadRango',
        ),
    ]
