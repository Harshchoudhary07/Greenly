from django.db import models
from vendors.models import Vendor

class Product(models.Model):
    """Product model for fruits, vegetables, etc."""
    
    CATEGORY_CHOICES = [
        ('fruit', 'Fruits'),
        ('vegetable', 'Vegetables'),
        ('leafy', 'Leafy Greens'),
        ('herbs', 'Herbs & Spices'),
        ('other', 'Other'),
    ]
    
    UNIT_CHOICES = [
        ('kg', 'Kilogram'),
        ('g', 'Gram'),
        ('piece', 'Piece'),
        ('dozen', 'Dozen'),
        ('bunch', 'Bunch'),
    ]
    
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=80, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=20, choices=UNIT_CHOICES)
    stock = models.IntegerField(default=0)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    freshness_tag = models.CharField(max_length=80, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_stock_update = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} - {self.vendor.shop_name}"
    
    class Meta:
        db_table = 'products'
        ordering = ['-created_at']
