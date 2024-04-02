from django.urls import path
from .views import ManejarMiembros

urlpatterns = [
    path('',ManejarMiembros)
]