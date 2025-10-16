from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'caso', views.CasoViewSet, basename='casos')

urlpatterns = router.urls
