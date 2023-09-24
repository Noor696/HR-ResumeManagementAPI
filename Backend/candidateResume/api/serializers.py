from rest_framework import serializers
from candidateResume.models import Candidate
from django import forms

class CandidateSerializer(serializers.ModelSerializer):
    """Candidate Serializer."""
    class Meta:
        model = Candidate
        fields = ['id','full_name', 'date_of_birth', 'years_of_experience', 'department', 'resume']
        # exclude = ['resume']  # Exclude the 'resume' field

        # id = serializers.IntegerField(read_only=True)
        # full_Name = serializers.CharField()

# class CandidateRegistrationForm(forms.ModelForm):
#     class Meta:
#         model = Candidate
#         fields = '__all__'

#     def clean_years_of_experience(self):
#         years_of_experience = self.cleaned_data.get('years_of_experience')
#         if years_of_experience < 0:
#             raise forms.ValidationError("Years of experience cannot be negative.")
#         return years_of_experience
