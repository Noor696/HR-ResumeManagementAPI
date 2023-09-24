from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod 
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...
 
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# api_view : takes alist of HTTP method can send to the view
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',  
         '/api/token/refresh',
    ]

    return Response(routes)

#'/api/token' : # the first endpoint this is where you can actually submit a username and password and get back access and refresh token  
# '/api/token/refresh' : # this will give us a new token based on a refresh token that sent to the backend.