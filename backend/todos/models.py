from django.db import models

# Create your models here.

from django.db import models
#import datetime


class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    expireDate = models.DateTimeField()
    priority = models.IntegerField(default = 3)
    completed = models.BooleanField(default=False)

    def __str__(self):
        """A string representation of the model."""
        return self.title
