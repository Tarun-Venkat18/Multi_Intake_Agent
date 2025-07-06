from typing import Dict
import pdfplumber
import io

def process_pdf(pdf_bytes: bytes) -> Dict:
    """
    Processes PDF bytes, extracts text using pdfplumber.
    """
    try:
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            text = "\n".join(page.extract_text() or '' for page in pdf.pages)
        return {"extracted_text": text}
    except Exception as e:
        return {"extracted_text": f"PDF extraction error: {e}"} 