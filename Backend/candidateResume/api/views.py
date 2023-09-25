# views.py
from candidateResume.models import Candidate
from candidateResume.api.serializers import CandidateSerializer
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import FileResponse
from django.shortcuts import get_object_or_404

from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateAPIView
)
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated , IsAdminUser

# Using Concrete View Classes

class CandidateListView(ListCreateAPIView):
    #  (ListCreateAPIView)
    queryset = Candidate.objects.all() # take all object and give him to serilizer
    serializer_class = CandidateSerializer # a file resposible to convert python code to JSON data/ format
    permission_classes = [IsAdminUser]

class CandidateDetailsView(RetrieveUpdateDestroyAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    # permission_classes = [IsAdminUser]

class CandidateCreateView(CreateAPIView):
    #  (ListCreateAPIView)
    queryset = Candidate.objects.all() # take all object and give him to serilizer
    serializer_class = CandidateSerializer # a file resposible to convert python code to JSON data/ format
    permission_classes = [AllowAny]



def download_file(request, file_id):
    # Replace 'your_file_model' with your actual model and field names
    file_instance = get_object_or_404(Candidate, id=file_id)
    file_path = file_instance.file_field.path
    return FileResponse(open(file_path, 'rb'))