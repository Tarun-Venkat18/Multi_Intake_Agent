from typing import Dict
import re
from utils.llm_utils import classify_intent

def process_email(email_text: str) -> Dict:
    """
    Processes email text, extracts sender, intent, urgency, and conversation ID.
    """
    # Extract sender from 'From:' line
    sender_match = re.search(r'^From: (.+)$', email_text, re.MULTILINE)
    sender = sender_match.group(1) if sender_match else "unknown@example.com"
    # Use LLM to classify intent
    intent_info = classify_intent(email_text)
    intent = intent_info.get("intent", "unknown")
    # Heuristic for urgency
    urgency = "high" if re.search(r'urgent|asap|immediately', email_text, re.IGNORECASE) else "normal"
    # Extract conversation ID if present
    conv_match = re.search(r'Conversation-ID: (.+)$', email_text, re.MULTILINE)
    conversation_id = conv_match.group(1) if conv_match else "conv_stub_123"
    return {
        "sender": sender,
        "intent": intent,
        "urgency": urgency,
        "conversation_id": conversation_id
    } 