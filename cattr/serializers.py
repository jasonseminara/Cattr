from rest_framework import serializers
from .models import Cat, Reservation, Posting, Address,User,Availability
from django.contrib.auth.models import User



class CatSerializer(serializers.HyperlinkedModelSerializer):
  owner = serializers.ReadOnlyField(source='owner.username')
  owner_url = serializers.ReadOnlyField(source='owner.url')
  class Meta:
    model = Cat
    fields = ('url','name','birthdate','sex','variety','owner','owner_url','description')


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = ('url', 'username', 'email', 'is_staff')


class PostSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model=Posting
    fields = ('url',
      'author',
      'title',
      'body',
      'start',
      'end',
      'display',
      'smokingEnviron',)

class AvailabilitySerializer(serializers.HyperlinkedModelSerializer):
  catName = serializers.ReadOnlyField(source='cat.name')
  class Meta:
    model=Availability
    fields = ('url',
      'catName',
      'start',
      'end',
    )

