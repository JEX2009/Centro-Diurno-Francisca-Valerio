from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'prueba', views.PruebaViewSet, basename='pruebas')
router.register(r'resultado', views.ResultadoPruebaViewSet, basename='preguntas')

urlpatterns = router.urls