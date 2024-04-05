from django.core.exceptions import ValidationError
import re

def validate_name(name):
    error_message = 'Name should only include letters diacritic letters and be in Title format.'
    regex = r'^\p{Lu}\p{Ll}*(?:\s\p{Lu}\p{Ll}*)*$'
    good_name = re.match(regex, name)
    if good_name:
        return name
    raise ValidationError(error_message, params={'Current Value':name})