from scratch import lotr_chars

def get_characters(chars):
    count = 0
    for char in chars['docs']:
        count += 1
        print(count, char['_id'], char['name'])
    
get_characters(lotr_chars)