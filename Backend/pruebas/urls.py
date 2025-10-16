from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

# Endpoint para gestionar las plantillas de las pruebas (Admin)
router.register(r'pruebas', views.PruebaViewSet, basename='prueba')

# Endpoint para gestionar los resultados de las pruebas (Terapeutas)
router.register(r'resultados-pruebas', views.ResultadoPruebaViewSet, basename='resultadoprueba')

urlpatterns = router.urls