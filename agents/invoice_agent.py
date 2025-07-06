from typing import Dict
import re

def process_invoice(text: str) -> Dict:
    """
    Extracts invoice fields from plain text.
    """
    fields = {}
    fields['invoice_number'] = _extract(r'Invoice Number:\s*([^\n]+)', text)
    fields['date'] = _extract(r'Date:\s*([^\n]+)', text)
    fields['sender'] = _extract(r'Sender:\s*([^\n]+)', text)
    fields['receiver'] = _extract(r'Receiver:\s*([^\n]+)', text)
    fields['amount'] = _extract(r'Amount:\s*([^\n]+)', text)
    fields['currency'] = _extract(r'Currency:\s*([^\n]+)', text)
    fields['description'] = _extract(r'Description:\s*([^\n]+)', text)
    return fields

def _extract(pattern, text):
    match = re.search(pattern, text, re.IGNORECASE)
    return match.group(1).strip() if match else None