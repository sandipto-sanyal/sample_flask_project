import os
import sys

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage, ToolMessage
from langchain_core.tools import tool, InjectedToolArg
from langchain_openai import AzureChatOpenAI, ChatOpenAI
from langchain_core.messages import message_to_dict
import json
from typing import *
from dotenv import load_dotenv
from mysql_connectivity import MySQLConnector
from datetime import datetime
import traceback
import pandas as pd
from simple_websocket.ws import Server
from logger import get_logger

load_dotenv(override=True)
logger = get_logger(__name__)

ORCHESTRATOR_MODEL = os.environ["ORCHESTRATOR_MODEL"]
SUBAGENT_MODEL = os.environ["SUBAGENT_MODEL"]
ORCHESTRATOR_FLOW_MMD = os.environ['ORCHESTRATOR_FLOW_MMD']

def open_prompt_file(path:str, **kwargs)-> str:
    with open(path, "r", encoding="utf-8") as f:
        prompt_template = f.read()
    return prompt_template.format(**kwargs)

def orchestrator(user_quer:str, 
                 max_steps: int = 8,
                 ws:Server|None = None):
    with open(ORCHESTRATOR_FLOW_MMD, "r") as f:
        flow = f.read()
    