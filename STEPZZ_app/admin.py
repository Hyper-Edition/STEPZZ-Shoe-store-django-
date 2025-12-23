from django.contrib import admin
from django.contrib.auth.admin import UserAdmin  # Import UserAdmin for custom User model
from .models import User, Product  # Import the custom User model and Product model

# Register the User model with UserAdmin
admin.site.register(User, UserAdmin)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'brand', 'price', 'rating')
    list_filter = ('category', 'brand')
    search_fields = ('name', 'brand')