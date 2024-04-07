from django.core.exceptions import ValidationError
import re

def validate_diff_level(diff_level):
    allowed_types = ['Easy', 'Medium', 'Hard']

    if diff_level not in allowed_types:
        raise ValidationError("Invalid type or must be upper case")
    return diff_level