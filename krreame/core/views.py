from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.core.mail import send_mail, BadHeaderError
from core.forms import ContactForm
from django.conf import settings


def home(request):
   context = RequestContext(request,
                           {'user': request.user, 'site_url': settings.SITE_URL})
   return render_to_response('index.html',
                             context_instance=context)

def article(request):
   context = RequestContext(request,
                           {'user': request.user})
   return render_to_response('article.html',
                             context_instance=context)

def colabora(request):
   form = ContactForm
   context = RequestContext(request,
                           {'user': request.user, 'form': form})

   if request.method == 'POST':
    form = ContactForm(request.POST)
    if form.is_valid():
      message = form.cleaned_data['message']
      from_email = form.cleaned_data['from_email']
      subject = from_email
      try:
        send_mail(subject, message, 'asd', [settings.EMAIL_HOST_USER], fail_silently=False)
        return HttpResponseRedirect(reverse("core.views.colabora"))
      except BadHeaderError:
        return HttpResponse('Invalid header found.') 
   return render_to_response('colabora.html',
                             context_instance=context)