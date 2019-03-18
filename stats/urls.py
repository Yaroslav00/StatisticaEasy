from django.urls import include, path
from rest_framework import routers
from stats.views import main_page, info_demo_regression

urlpatterns = [
    path('', main_page.as_view(), name='main_page'),
    path('regression_demo_info/',info_demo_regression.as_view(), name='info_demo_regression')
]