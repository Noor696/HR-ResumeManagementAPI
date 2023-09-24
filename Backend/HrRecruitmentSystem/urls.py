from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('candidate/', include('candidateResume.api.urls')),
    path('api/', include('base.api.urls'))
   
]
