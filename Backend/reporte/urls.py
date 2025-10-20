from rest_framework import routers
from .views import ReporteViewSet

router = routers.DefaultRouter()
router.register(r'reporte', ReporteViewSet, basename='reporte')
urlpatterns = router.urls