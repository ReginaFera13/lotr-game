# Generated by Django 4.2.4 on 2024-04-15 14:21

import dev_area_app.validators
import dev_inventory_item_app.validators
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DevInventoryItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(unique=True, validators=[django.core.validators.MinLengthValidator(4), django.core.validators.MaxLengthValidator(50), dev_area_app.validators.validate_name])),
                ('category', models.CharField(validators=[dev_inventory_item_app.validators.validate_category])),
                ('stat', models.BigIntegerField()),
                ('weight', models.DecimalField(decimal_places=2, max_digits=4)),
            ],
        ),
    ]
