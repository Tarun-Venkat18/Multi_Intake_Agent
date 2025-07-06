from pydantic import BaseModel
from typing import Optional

class FlowBitData(BaseModel):
    id: Optional[str] = None
    type: Optional[str] = None
    amount: Optional[float] = None
    currency: Optional[str] = None
    sender: Optional[str] = None
    receiver: Optional[str] = None
    # Add more fields as needed