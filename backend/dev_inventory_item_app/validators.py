from django.core.exceptions import ValidationError
import re

def validate_category(category):
    allowed_types = ['Weapon', 'Consumable', 'Helmet', 'Cloak', 'Chest', 'Legs', 'Footware', 'Currency', 'Quest']

    if category not in allowed_types:
        raise ValidationError("Invalid category or must be upper case")
    return category