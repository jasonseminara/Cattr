from django.contrib import admin

from .models import Cat, Reservation,Address,Posting,Availability

admin.site.register(Cat)
admin.site.register(Reservation)
admin.site.register(Address)
admin.site.register(Posting)
admin.site.register(Availability)