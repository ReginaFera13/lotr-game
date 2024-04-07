# Generated by Django 4.2.4 on 2024-04-07 17:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('dev_dialogue_options_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameDialogueOptions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('repeatable', models.BooleanField(default=False)),
                ('visited', models.BooleanField(default=False)),
                ('dialogue_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dev_dialogue_options_app.devdialogueoptions')),
            ],
        ),
    ]