from django.db import models
from users.models import User

class Vendor(models.Model):
    """Vendor profile for local sellers"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='vendor_profile')
    shop_name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    photo = models.ImageField(upload_to='vendors/', null=True, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    address = models.TextField()
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    is_active = models.BooleanField(default=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_reviews = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.shop_name
    
    class Meta:
        db_table = 'vendors'
        ordering = ['-created_at']
