from typing import Dict, Any
from schemas.flowbit import FlowBitData

def process_json(json_data: Dict[str, Any]) -> Dict:
    """
    Processes JSON input, reformats to FlowBit schema, and identifies anomalies.
    """
    # Validate and map to FlowBit schema
    flowbit = FlowBitData(**{k: v for k, v in json_data.items() if k in FlowBitData.__fields__})
    # Detect missing fields
    missing = [field for field in FlowBitData.__fields__ if getattr(flowbit, field) is None]
    return {
        "flowbit_data": flowbit.dict(),
        "anomalies": [f"Missing field: {f}" for f in missing] if missing else []
    } 