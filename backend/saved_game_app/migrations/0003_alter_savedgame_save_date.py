# Generated by Django 4.2.4 on 2024-04-14 23:01

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('saved_game_app', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='savedgame',
            name='save_date',
            field=models.TimeField(default=django.utils.timezone.now),
        ),
    ]
