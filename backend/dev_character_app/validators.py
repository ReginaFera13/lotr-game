from django.core.exceptions import ValidationError
import re

def validate_char_type(char_type):
    allowed_types = ['playable', "npc"]

    if char_type.lower() not in allowed_types:
        raise ValidationError("Invalid type")
    return char_type