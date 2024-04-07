from django.core.exceptions import ValidationError
import re

def validate_name(name):
    error_message = 'Name should only include letters diacritic letters and be in Title format.'
    regex = r"^[\w']+(\s[\w']+)*$"
    good_name = re.match(regex, name)
    if good_name:
        return name
    raise ValidationError(error_message, params={'Current Value':name})