from django.conf.urls import patterns, include, url

from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'$', 'core.views.home', name='home'),
]