from rest_framework import routers
from . import views as v

router = routers.DefaultRouter()
router.register(r'cita', v.CitaViewSet)
router.register(r'tipo-terapia', v.TerapiaViewSet)
router.register(r'completar_cita', v.AtencionCitaViewSet)
urlpatterns = router.urls