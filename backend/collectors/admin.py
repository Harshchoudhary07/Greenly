from django.contrib import admin
from .models import Collector, ScrapPickup

@admin.register(Collector)
class CollectorAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'user', 'phone', 'service_radius', 'created_at')
    search_fields = ('company_name', 'user__username', 'phone')
    readonly_fields = ('created_at',)

@admin.register(ScrapPickup)
class ScrapPickupAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'collector', 'category', 'status', 'created_at')
    list_filter = ('status', 'category', 'created_at')
    search_fields = ('customer__username', 'collector__company_name')
    readonly_fields = ('created_at',)
