from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.files.storage import FileSystemStorage  # Importa FileSystemStorage
from django.db import connection
from .serializer import MiembrosSerializer
from .models import Miembros
from django.conf import settings
import os

# Create your views here.

@api_view(['POST','GET','PUT'])
def ManejarMiembros(request):
    if request.method == 'POST':
        idPeloton = request.data.get('peloton')
        serializer = MiembrosSerializer(data=request.data)
        if serializer.is_valid():
            # Guarda la imagen utilizando FileSystemStorage
            foto = request.data.get('fotoM')
            if foto:
                fs = FileSystemStorage()
                foto_name = fs.save(foto.name, foto)
                request.data['fotoM'] = foto_name  # Actualiza el nombre de la imagen en los datos
            serializer.save()
            id_miembro = serializer.instance.idMiembro
            print(id_miembro)
            print(idPeloton)
            Miembro = connection.cursor()
            Miembro.execute("CALL setMiembro('" + str(id_miembro) + "','" + str(idPeloton) + "')")
            return Response(status=200)
        else:
            return Response(serializer.errors, status=400)
    if request.method == 'GET':
        idMiembro = request.query_params.get('idMiembro')
        if idMiembro:
            try:    
                miembro = Miembros.objects.get(idMiembro=idMiembro)
                serializer = MiembrosSerializer(miembro)
                return Response(serializer.data, status=200)
            except Miembros.DoesNotExist:
                return Response({'message': 'Miembro no encontrado'}, status=404)
        else:
            miembros = Miembros.objects.all()
            serializer = MiembrosSerializer(miembros, many=True)
            return Response(serializer.data, status=200)
    if request.method == 'PUT':
        idMiembro = request.data.get('idMiembro')
        putMiembro = Miembros.objects.get(idMiembro=idMiembro)
        serializer = MiembrosSerializer(putMiembro, data=request.data, partial=True)
        if serializer.is_valid():
            # Actualiza la imagen solo si se proporciona una nueva imagen
            foto = request.data.get('fotoM')
            if foto:
                # Elimina la imagen anterior si existe
                if putMiembro.fotoM:
                    # Elimina la imagen utilizando el método de Django
                    putMiembro.fotoM.delete(save=False)
                # Guarda la nueva imagen utilizando el método de Django
                serializer.save()
                return Response(serializer.data, status=200)
            else:
                # Si no se proporciona una nueva imagen, simplemente guarda los datos sin actualizar la imagen
                serializer.save()
                return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)
    else:
        return Response(status=404)