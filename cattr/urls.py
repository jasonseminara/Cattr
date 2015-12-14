"""cattr URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import patterns,include,url
from django.contrib import admin
from django.contrib.auth import views
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
admin.autodiscover()


# Routers provide an easy way of automatically determining the URL conf.
router = routers.SimpleRouter()
router.register(r'users', views.UserViewSet)
router.register(r'cats', views.CatViewSet)
router.register(r'posts', views.PostViewSet)





urlpatterns = [
    url(r'cats/(?P<pk>[0-9]+)/availability$',views.listCatAvailability),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^user/', include('user.urls')),
    url(r'^hello$','main.views.home',name='cattr_home'),

    url(r'^login/$','django.contrib.auth.views.login',
      {'template_name':'login.html'},
      name='cattr_login'),

    url(r'^logout/$','django.contrib.auth.views.logout',
      {'next_page':'cattr_home'},
      name='cattr_logout'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^', include(router.urls)),

]
urlpatterns = format_suffix_patterns(urlpatterns)