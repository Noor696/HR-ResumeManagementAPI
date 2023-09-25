from django.urls import path, include
from candidateResume.api.views import *

urlpatterns = [
    path('list/', CandidateListView.as_view(), name='candidate-list'),
    path('create-resume/', CandidateCreateView.as_view(), name='candidate-create'),
    path('<int:pk>/', CandidateDetailsView.as_view(), name='candidate-detail'),
    path('api/download/<int:file_id>/', download_file, name='download_file'),
]
