from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from .models import Cat,Posting,Availability
from .permissions import IsOwnerOrReadOnly
from .serializers import CatSerializer, UserSerializer, PostSerializer,AvailabilitySerializer


class CatViewSet(viewsets.ModelViewSet):
  
  queryset = Cat.objects.all()
  serializer_class = CatSerializer
  permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This endpoint presents the users in the system.
    As you can see, the collection of Cat instances owned by a user are
    serialized using a hyperlinked representation.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This endpoint presents the users in the system.
    As you can see, the collection of snippet instances owned by a user are
    serialized using a hyperlinked representation.
    """
    queryset = Posting.objects.filter(display=1)
    serializer_class = PostSerializer

def listCatAvailability(req,pk):
  
  serializer = AvailabilitySerializer(Availability.objects.filter(cat__id=pk),context={'request':req})
  return Response(serializer.data)


