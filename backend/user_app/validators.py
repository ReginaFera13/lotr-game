from django.core.exceptions import ValidationError
import re

def validate_display_name(display_name):
    error_message = 'Display name should only include letters and numbers.'
    regex = r'^[A-Za-z\d]{5,}$'
    good_name = re.match(regex, display_name)
    if good_name:
        return display_name
    raise ValidationError(error_message, params={'Current Value':display_name})