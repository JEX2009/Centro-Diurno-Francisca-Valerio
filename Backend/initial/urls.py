"""
URL configuration for initial project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/usuarios/', include('usuario.urls')),
    path('api/v1/pacientes/', include('paciente.urls')),
    path('api/v1/encargados/', include('encargado.urls')),
    path('api/v1/medicamentos/', include('medicamento.urls')),
    path('api/v1/pruebas/', include('pruebas.urls')),
    path('api/v1/casos/', include('caso.urls')),
    path('api/v1/citas/', include('cita.urls')),
    path('api/v1/reportes/', include('reporte.urls')),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
