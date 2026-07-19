reader = None

def get_reader():
    global reader
    if reader is None:
        import easyocr
        reader = easyocr.Reader(["en"])
    return reader

def extract_txt(image_path : str):
    
    result = get_reader().readtext(image_path)
    
    extracted_txt = ""
    for destination in result:
        extracted_txt+=destination[1] + " "
        
    return extracted_txt.strip()
        
