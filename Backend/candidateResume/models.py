from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.core.validators import MinValueValidator , FileExtensionValidator
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

def validate_date_not_in_future(value):
    if value > timezone.now().date():
        raise ValidationError("Date of birth cannot be in the future.")
    
class Candidate(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    # owner=models.ForeignKey(get_user_model(),on_delete=models.CASCADE,null=True)
    full_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(validators=[validate_date_not_in_future])
    years_of_experience = models.IntegerField(validators=[MinValueValidator(0)])
    resume = models.FileField(
        upload_to='resumes/',
        validators=[
            FileExtensionValidator(allowed_extensions=['pdf', 'docx'])
        ]
    )

    department_choices = [
        ('IT', 'IT'),
        ('HR', 'HR'),
        ('Finance', 'Finance'),
    ]
    department = models.CharField(max_length=10, choices=department_choices)
    date=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.full_name
    
    class Meta:
        ordering = ["-pk"]
    
    