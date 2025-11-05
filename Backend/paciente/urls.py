from django.urls import path, include
from rest_framework import routers
from . import views 

router = routers.DefaultRouter()

router.register(r'paciente', views.PacienteViewSet)
router.register(r'epicrisis', views.EpicrisisViewSet)

urlpatterns = [
    path('', include(router.urls)),
]