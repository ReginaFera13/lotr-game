# Generated by Django 4.2.4 on 2024-04-15 14:22

import dev_dialogue_options_app.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('dev_quest_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DevSubquest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descrip', models.TextField(validators=[dev_dialogue_options_app.validators.validate_text])),
                ('order', models.BigIntegerField()),
                ('quest_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dev_quest_app.devquest')),
            ],
        ),
    ]
