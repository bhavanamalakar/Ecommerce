from django.contrib import admin
# Register your models here.

from .models import *

admin.site.register(Category)
admin.site.register(SubCategory)
# add product in admin panel
admin.site.register(contact_us)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Blog)
admin.site.register(Brand)
admin.site.register(Size)
admin.site.register(Color)
admin.site.register(Cart)
admin.site.register(UserPreference)

admin.site.register(OrderItem)
admin.site.register(Payment)
admin.site.register(Cartitems)
admin.site.register(UserProfile)
admin.site.register(Address)
admin.site.register(Wishlist)
