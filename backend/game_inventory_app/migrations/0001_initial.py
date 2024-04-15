# Generated by Django 4.2.4 on 2024-04-15 14:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('dev_inventory_item_app', '__first__'),
        ('game_character_app', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameInventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.BigIntegerField()),
                ('equipt', models.BooleanField(default=False)),
                ('char_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game_character_app.gamecharacter')),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dev_inventory_item_app.devinventoryitem')),
            ],
        ),
    ]
