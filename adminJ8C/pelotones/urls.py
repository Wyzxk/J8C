from django.urls import path
from .views import ManejarPelotones

urlpatterns = [
    path('',ManejarPelotones)
]