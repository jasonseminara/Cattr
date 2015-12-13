from django.conf.urls import patterns,include,url

urlpatterns =[
  url(r'^home$','user.views.home',name='user_home'),
]