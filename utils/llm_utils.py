from typing import Any, Dict
from transformers import pipeline

zero_shot_classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

def classify_intent(text: str) -> Dict[str, Any]:
    candidate_labels = ["Invoice", "RFQ", "Complaint", "Regulation", "Email", "PDF", "JSON"]
    result = zero_shot_classifier(text, candidate_labels)
    intent = result["labels"][0] if result.get("labels") else "unknown"
    # Improved format detection
    if "invoice number" in text.lower():
        fmt = "Invoice"
    elif "email" in text.lower():
        fmt = "Email"
    elif "pdf" in text.lower():
        fmt = "PDF"
    elif "{" in text:
        fmt = "JSON"
    else:
        fmt = "unknown"
    return {"intent": intent, "format": fmt}