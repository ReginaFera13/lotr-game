from django.core.exceptions import ValidationError
import re

def validate_text(dialogue_text):
    error_message = 'Text should be in paragraph/sentence structure format.'
    regex = r'^(\p{Lu}.*?[.!?](?:\s|$))+$'
    good_text = re.match(regex, dialogue_text)
    if good_text:
        return dialogue_text
    raise ValidationError(error_message, params={'Current Value':dialogue_text})