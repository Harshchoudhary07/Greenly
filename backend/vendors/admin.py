from django.contrib import admin
from .models import Vendor

@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ('shop_name', 'user', 'is_active', 'rating', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('shop_name', 'user__username', 'address')
    readonly_fields = ('created_at', 'rating', 'total_reviews')
    
    fieldsets = (
        ('Basic Info', {'fields': ('user', 'shop_name', 'description', 'photo')}),
        ('Location', {'fields': ('latitude', 'longitude', 'address')}),
        ('Operating Hours', {'fields': ('opening_time', 'closing_time', 'is_active')}),
        ('Stats', {'fields': ('rating', 'total_reviews', 'created_at')}),
    )
