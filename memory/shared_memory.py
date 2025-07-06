import sqlite3
from typing import Dict, Any, List

DB_PATH = 'shared_memory.db'

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source TEXT,
            type TEXT,
            timestamp TEXT,
            intent TEXT,
            routed_agent TEXT,
            status TEXT DEFAULT 'Pending',
            extracted_fields TEXT
        )
    ''')
    conn.commit()
    conn.close()

def store_document(metadata: Dict[str, Any], extracted_fields: Dict[str, Any]):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        INSERT INTO documents (source, type, timestamp, intent, routed_agent, extracted_fields)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (
        metadata.get("source"),
        metadata.get("type"),
        metadata.get("timestamp"),
        metadata.get("intent"),
        metadata.get("routed_agent"),
        str(extracted_fields)
    ))
    conn.commit()
    conn.close()

def fetch_documents(doc_type=None, status=None):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    query = "SELECT * FROM documents WHERE 1=1"
    params = []
    if doc_type:
        query += " AND type=?"
        params.append(doc_type)
    if status:
        query += " AND status=?"
        params.append(status)
    c.execute(query, params)
    rows = c.fetchall()
    conn.close()
    return rows

def fetch_document_by_id(doc_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT * FROM documents WHERE id=?", (doc_id,))
    row = c.fetchone()
    conn.close()
    return row

def update_document_status(doc_id, status):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("UPDATE documents SET status=? WHERE id=?", (status, doc_id))
    conn.commit()
    conn.close()