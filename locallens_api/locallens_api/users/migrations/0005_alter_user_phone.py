# Generated by Django 4.2.13 on 2024-05-27 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_user_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.CharField(blank=True, max_length=15, verbose_name='Phone number'),
        ),
    ]
