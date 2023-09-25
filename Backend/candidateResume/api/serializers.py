from rest_framework import serializers
from candidateResume.models import Candidate
from django import forms

class CandidateSerializer(serializers.ModelSerializer):
    """Candidate Serializer."""
    class Meta:
        model = Candidate
        fields = ['id','full_name', 'date_of_birth', 'years_of_experience', 'department', 'resume']
        # exclude = ['resume']  # Exclude the 'resume' field
