from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.main, name="main"),
    path('arenas/', views.arenas, name="arenas"),
    path('colors/', views.getColors, name="getColors"),
    # path('problemImg/', views.getProblemImg, name="problemImg"),
    path('score/', views.getScore, name="getScore")
]