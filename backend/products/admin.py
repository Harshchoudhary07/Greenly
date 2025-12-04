from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'vendor', 'category', 'price', 'unit', 'stock', 'is_active', 'created_at')
    list_filter = ('category', 'is_active', 'created_at')
    search_fields = ('name', 'vendor__shop_name')
    list_editable = ('stock', 'is_active')
    
    fieldsets = (
        ('Basic Info', {'fields': ('vendor', 'name', 'category', 'image')}),
        ('Pricing & Stock', {'fields': ('price', 'unit', 'stock', 'freshness_tag')}),
        ('Status', {'fields': ('is_active', 'created_at', 'last_stock_update')}),
    )
    
    readonly_fields = ('created_at', 'last_stock_update')
