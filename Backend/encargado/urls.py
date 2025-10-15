from django.urls import path, include
from rest_framework import routers
from . import views as v


router = routers.DefaultRouter()

router.register(r'encargado', v.EncargadoViewSet)
urlpatterns = [
    path('', include(router.urls)),
]