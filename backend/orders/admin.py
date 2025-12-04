from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product_name', 'unit_price', 'quantity', 'subtotal')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'vendor', 'total_amount', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('customer__username', 'vendor__shop_name')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Order Info', {'fields': ('customer', 'vendor', 'status')}),
        ('Delivery', {'fields': ('delivery_address', 'delivery_latitude', 'delivery_longitude')}),
        ('Pricing', {'fields': ('total_amount', 'delivery_fee')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
