from django.core.exceptions import ValidationError
import re

def validate_char_type(char_type):
    allowed_types = ['playable', 'npc']

    if char_type not in allowed_types:
        raise ValidationError("Invalid type or must be lower case")
    return char_type