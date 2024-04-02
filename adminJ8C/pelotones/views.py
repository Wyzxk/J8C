from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Pelotones
from miembros.models import Miembros
from .serializer import PelotonesSerializer
# Create your views here.

@api_view(['POST','GET','PUT'])
def ManejarPelotones(request):
    if request.method == 'POST':
        serializer = PelotonesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=200)
        else: 
            return Response(serializer.errors, status=400)
    if request.method == 'GET':
        idPeloton = request.query_params.get('idPeloton')
        if idPeloton:
            try:
                peloton = Pelotones.objects.get(idPeloton=idPeloton)
                serializer = PelotonesSerializer(peloton)
                return Response(serializer.data, status=200)
            except Pelotones.DoesNotExist:
                return Response({'error': 'Pelotón no encontrado'}, status=404)
        else:
            pelotones = Pelotones.objects.all()
            serializer = PelotonesSerializer(pelotones, many=True)
            return Response(serializer.data, status=200)
    if request.method == 'PUT':
        idPeloton = request.data.get('idPeloton')
        activo = request.data.get('activo')
        putPeloton = Pelotones.objects.get(idPeloton=idPeloton)
        serializer = PelotonesSerializer(putPeloton,data=request.data,partial=True)
        if serializer.is_valid():
            if activo == "False":
                peloton = request.data.get('idPeloton')
                Miembros.objects.filter(peloton=peloton).update(activo="False")
            elif activo == "True":
                peloton = request.data.get('idPeloton')
                Miembros.objects.filter(peloton=peloton).update(activo="True")
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)
    else: 
        return Response(status=404)