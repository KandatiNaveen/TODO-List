from django.db import models

# Create your models here.
class Board(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    des = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Task(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    disp = models.CharField(max_length=100)
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.title
