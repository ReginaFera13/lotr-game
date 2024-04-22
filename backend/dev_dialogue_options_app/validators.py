from django.core.exceptions import ValidationError
import re

def validate_text(text):
    error_message = 'Text should be in paragraph/sentence structure format.'
    regex = r'^([A-Z].*?[.!?](?:\s|$))+$'
    good_text = re.match(regex, text)
    if good_text:
        return text
    raise ValidationError(error_message, params={'Current Value':text})