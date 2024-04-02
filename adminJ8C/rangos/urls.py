from django.urls import path
from .views import ManejarRangos

urlpatterns = [
    path('', ManejarRangos),
]