from django.db import models

# Create your models here.


class Point(models.Model):
    x = models.FloatField()
    y = models.FloatField()

    def __ge__(self, other):
        return self.x >= other.x

class DataFile(models.Model):
    file = models.FileField(blank=False, null=False)


# class LinearRegresion(models.Model):
#     alpha = models.FloatField()
#     beta = models.FloatField()
#     prediction = models.Field()
