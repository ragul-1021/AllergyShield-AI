reader = None

def get_reader():
    global reader
    if reader is None:
        import tempfile
        from pathlib import Path

        import easyocr

        model_dir = Path(tempfile.gettempdir()) / "easyocr_models"
        model_dir.mkdir(parents=True, exist_ok=True)
        reader = easyocr.Reader(
            ["en"],
            gpu=False,
            model_storage_directory=str(model_dir),
            user_network_directory=str(model_dir),
        )
    return reader

def extract_txt(image_path : str):
    result = get_reader().readtext(image_path)

    extracted_txt = ""
    for destination in result:
        extracted_txt+=destination[1] + " "
        
    return extracted_txt.strip()
        
