# Generated by Django 4.2.4 on 2024-04-07 17:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('dev_quest_app', '0001_initial'),
        ('game_quest_app', '0001_initial'),
        ('saved_game_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamequest',
            name='game_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='saved_game_app.savedgame'),
        ),
        migrations.AddField(
            model_name='gamequest',
            name='quest_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dev_quest_app.devquest'),
        ),
    ]