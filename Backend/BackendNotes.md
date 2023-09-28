**To Create Virtual Environment:** 

`python -m venv .venv`
`python3.10 -m venv .venv`

**To Activate The Virtual Environment:**

`source .venv/bin/activate`

**To Deactivate The Virtual Environment:**

`deactivate`

**To Install Any Library:**

`pip3 install <library_name>`

**To Run A File As A Script:**

`python <file_name.py>`

**Requirements File:**

`pip3 freeze > requirements.txt`
`pip3 install -r requirements.txt`

**Install django by using pip**

`pip install django`

**Create a project**

`django-admin startproject <project_name> .`
project name : HrRecruitmentSystem

**Create an application** 

`python manage.py startapp <app_name>`

apps name: candidateResume , base

**create a super user**:
python manage.py createsuperuser

**update the database:**
`python manage.py makemigrations`
`python manage.py migrate`

* Django comes default with sqlite3 database and since we install django which is a python framework, this framework comes by default with tables like user tables, authentications and these tables needs to be created, so to create tables we will type `python manage.py migrate`

**create a super user:** 

`python manage.py createsuperuser`

- this user is what we use to login to the backend or the admin site of django

**How to Run Django Development Server:**

`python manage.py runserver`

**registering the modal in the admin.py**

**JWT** :
allow us to change our authentication system in django 

**Access Token** : stores all the information about a user / short life (5-15 minutes).

**Refresh Token** : has a longer life span is meant to simply get a new access token/ change depending on how secure you want application

**I used json-web-token-authentication**
`https://www.django-rest-framework.org/api-guide/authentication/#json-web-token-authentication`

and then go to `https://github.com/jazzband/djangorestframework-simplejwt` 
simplejwt is a package that allows us to work with jwt and this is the documentaion for it `https://django-rest-framework-simplejwt.readthedocs.io/en/latest/`

* we need the access token in the frontend in order to store inside of local storage and inside of state in the frontend to make sure that a user is authenticated.

* in this app I used :
    `"ACCESS_TOKEN_LIFETIME": timedelta(minutes=5), `
    - we can increase the access time but 5 min is good.
    `"REFRESH_TOKEN_LIFETIME": timedelta(days=90),` 
    - to make user still logged in.

* after this we should run `python manage.py migrate` to add refresh database teble

* work on cors configuration (cross origin resource sharing)
react works from 3000 port
django works from 8000 port

* I use tis packege `https://github.com/adamchainz/django-cors-headers/tree/main` to solve cors issue
