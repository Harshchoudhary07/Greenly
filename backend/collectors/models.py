from django.db import models
from users.models import User

class Collector(models.Model):
    """Scrap collector profile"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='collector_profile')
    company_name = models.CharField(max_length=255)
    categories = models.JSONField(default=list)  # [{"type": "plastic", "price_per_kg": 5}]
    latitude = models.FloatField()
    longitude = models.FloatField()
    service_radius = models.IntegerField(default=5)  # km
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.company_name
    
    class Meta:
        db_table = 'collectors'
        ordering = ['-created_at']


class ScrapPickup(models.Model):
    """Scrap pickup request"""
    
    STATUS_CHOICES = [
        ('requested', 'Requested'),
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pickups')
    collector = models.ForeignKey(Collector, on_delete=models.SET_NULL, null=True, related_name='pickups')
    category = models.CharField(max_length=80)
    estimated_weight = models.DecimalField(max_digits=10, decimal_places=3)
    pickup_address = models.TextField()
    pickup_latitude = models.FloatField()
    pickup_longitude = models.FloatField()
    status = models.CharField(max_length=40, choices=STATUS_CHOICES, default='requested')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Pickup #{self.id} - {self.category}"
    
    class Meta:
        db_table = 'scrap_pickups'
        ordering = ['-created_at']
