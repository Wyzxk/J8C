from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import connection
from .models import Rangos
from .serializer import RangosSerializer

# Create your views here.

@api_view(['POST','GET','PUT'])
def ManejarRangos(request):
    if request.method == 'POST':
        # Guarda los datos en variables
        nombreRango = request.data.get('nombreRango')
        descripcionRango = request.data.get('descripcionRango')
        desExpRango = request.data.get('desExpRango')
        activo = request.data.get('activo')
        print(activo)
        Rango = connection.cursor()
        try: 
            # Llama el procedimiento en BD para agregar el Rango
            Rango.execute("CALL agregarRango('" + nombreRango + "','" + descripcionRango + "','" + desExpRango + "','" + str(activo) + "')")
            return Response(status=200)
        except Exception as e:   
            # Devuelve el mensaje de error como respuesta
            return Response({'error': str(e)}, status=400)  # Devuelve el mensaje de error como respuesta
    if request.method == 'GET':
        if request.query_params.get('idRango'):
            idRango = request.query_params.get('idRango')
            Rango = connection.cursor()
            Rango.execute("CALL obtenerRango('" + idRango + "')")
            respuesta = Rango.fetchone()
            return Response(respuesta, status=200)
        else:
            # Obtener todos los objetos de Rangos
            rangos = Rangos.objects.all()
            # Serializar los datos de los rangos
            serializer = RangosSerializer(rangos, many=True)
            # Devolver la respuesta
            return Response(serializer.data, status=200)
    if request.method == 'PUT':
        # Guarda los datos en variables
        idRango = request.data.get('idRango')
        nombreRango = request.data.get('nombreRango')
        descripcionRango = request.data.get('descripcionRango')
        desExpRango = request.data.get('desExpRango')
        activo = request.data.get('activo')
        print(activo)
        Rango = connection.cursor()
        try:
            # Construye la consulta SQL
            sql_query = "CALL actRango("
            sql_query += "'" + str(idRango) + "',"
            if nombreRango is not None:
                sql_query += "'" + nombreRango + "',"
            else:
                sql_query += "NULL,"
            if descripcionRango is not None:
                sql_query += "'" + descripcionRango + "',"
            else:
                sql_query += "NULL,"
            if desExpRango is not None:
                sql_query += "'" + desExpRango + "',"
            else:
                sql_query += "NULL,"
            if activo is not None:
                sql_query += "'" + str(activo) + "')"
            else:
                sql_query += "NULL)"

        # Llama el procedimiento en BD para agregar el Rango
            Rango.execute(sql_query)
            return Response(status=200)
        except Exception as e:
        # Devuelve el mensaje de error como respuesta
            return Response({'error': str(e)}, status=400)

    else: 
        return Response(status=404)
        
    
