# Generated by Django 4.2.4 on 2024-03-27 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rangos', '0006_alter_rangos_activo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rangos',
            name='activo',
            field=models.BooleanField(),
        ),
    ]
