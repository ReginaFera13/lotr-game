# Generated by Django 4.2.4 on 2024-04-15 14:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('dev_inventory_item_app', '0001_initial'),
        ('dev_character_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DevStartingInventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.BigIntegerField()),
                ('char_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dev_character_app.devcharacter')),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dev_inventory_item_app.devinventoryitem')),
            ],
        ),
    ]
