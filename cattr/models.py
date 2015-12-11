from django.db import models
from django.contrib.auth.models import User
#from geography.models import ZipCode


class Cat(models.Model):
  name = models.CharField(max_length=128)
  age = models.IntegerField()
  variety = models.CharField(max_length=128)
  owner = models.ForeignKey(User)
  description = models.CharField(max_length=300)
  # zip_code = models.ForeignKey(
  #       ZipCode,
  #       on_delete=models.SET_NULL,
  #       blank=True,
  #       null=True,
  #   ) 
  last_updated = models.DateTimeField(auto_now=True)

class Reservations(models.Model):
  cat   = models.ForeignKey(Cat, on_delete=models.CASCADE)
  start = models.DateTimeField(auto_now_add=True, blank=True)
  end   = models.DateTimeField(auto_now_add=True, blank=True)
  host  = models.ForeignKey( User, null=True, on_delete=models.SET_NULL)
