from fastapi import FastAPI, UploadFile, File, Form, Request,Body
from fastapi.middleware.cors import CORSMiddleware
from agents.classifier import classify_and_route
from memory.shared_memory import (
    init_db, fetch_documents, fetch_document_by_id, update_document_status
)
from pydantic import BaseModel
class StatusUpdate(BaseModel):
    status: str
from typing import Optional

app = FastAPI()
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/intake")
async def intake(request: Request, file: UploadFile = File(None), text: str = Form(None)):
    if file:
        filename = file.filename
        content = await file.read()
        result = classify_and_route(content, filename)
    elif text:
        result = classify_and_route(text)
    else:
        return {"error": "No input provided"}
    return result

@app.get("/documents")
def get_documents(doc_type: Optional[str] = None, status: Optional[str] = None):
    rows = fetch_documents(doc_type, status)
    # Convert to dicts for frontend
    keys = ["id", "source", "type", "timestamp", "intent", "routed_agent", "status", "extracted_fields"]
    return [dict(zip(keys, row)) for row in rows]
@app.get("/memory")
def get_memory():
    rows = fetch_documents()
    keys = ["id", "source", "type", "timestamp", "intent", "routed_agent", "status", "extracted_fields"]
    return [dict(zip(keys, row)) for row in rows]

@app.get("/documents/{doc_id}")
def get_document(doc_id: int):
    row = fetch_document_by_id(doc_id)
    keys = ["id", "source", "type", "timestamp", "intent", "routed_agent", "status", "extracted_fields"]
    return dict(zip(keys, row)) if row else {}

@app.post("/documents/{doc_id}/status")
def set_document_status(doc_id: int, update: StatusUpdate):
    update_document_status(doc_id, update.status)
    return {"success": True, "status": update.status}