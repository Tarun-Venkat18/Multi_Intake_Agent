from typing import Any, Dict, Optional
import datetime
import json
from agents.json_agent import process_json
from agents.email_agent import process_email
from agents.pdf_agent import process_pdf
from utils.llm_utils import classify_intent
from memory.shared_memory import store_document
from agents.invoice_agent import process_invoice

def classify_and_route(input_data: Any, filename: Optional[str] = None) -> Dict:
    """
    Classifies the input format and intent, then routes to the appropriate agent.
    """
    # Try to decode bytes to string if needed
    if isinstance(input_data, (bytes, bytearray)):
        try:
            input_str = input_data.decode(errors='ignore')
        except Exception:
            input_str = str(input_data)
    else:
        input_str = input_data

    # Use LLM to classify intent and format
    intent_info = classify_intent(input_str)
    fmt = intent_info.get("format", "unknown")
    intent = intent_info.get("intent", "unknown")
    routed_agent = None
    result = None
    intent_info = classify_intent(input_str)
    fmt = intent_info.get("format", "unknown")
    intent = intent_info.get("intent", "unknown")
    routed_agent = None
    result = None

    # Use LLM-detected format for routing
    if intent.lower() == "invoice" or (fmt.lower() == "invoice"):
        routed_agent = "invoice_agent"
        result = process_invoice(input_str)
    elif fmt == "JSON":
        try:
            json_obj = json.loads(input_str)
            routed_agent = "json_agent"
            result = process_json(json_obj)
        except Exception as e:
            routed_agent = "email_agent"
            result = {"error": f"Failed to parse JSON: {e}"}
    elif fmt == "PDF":
        routed_agent = "pdf_agent"
        result = process_pdf(input_data if isinstance(input_data, (bytes, bytearray)) else input_str.encode())
    else:  # Default to email/text
        routed_agent = "email_agent"
        result = process_email(input_str)


    # Store in memory (now DB)
    timestamp = datetime.datetime.utcnow().isoformat()
    source = filename or "direct_input"
    metadata = {
        "source": source,
        "type": fmt,
        "timestamp": timestamp,
        "intent": intent,
        "routed_agent": routed_agent
    }
    store_document(metadata, result)

    return {
        "format": fmt,
        "intent": intent,
        "routed_agent": routed_agent,
        "result": result,
        "metadata": metadata
    }