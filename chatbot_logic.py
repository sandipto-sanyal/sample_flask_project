from simple_websocket.ws import Server
from typing import *
import json
def business_logic(msg:Dict[str,Any], ws:Server):
    response = {"server_message": "This is a skeleton only"}
    ws.send(json.dumps(response))
    
    