from django.conf.urls import patterns, include, url

from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^users/logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}, name="user-logout"),
    url(r'^$', 'core.views.home',),
    url(r'^article/$', 'core.views.article'),
    url(r'^colabora/$', 'core.views.colabora'),
]