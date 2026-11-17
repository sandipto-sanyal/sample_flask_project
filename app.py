from flask import Flask, render_template, request, jsonify
from flask_sock import Sock
import simple_websocket
from typing import *
from flask_cors import CORS
from simple_websocket.ws import Server
import os
import json
from chatbot_logic import business_logic
from dotenv import load_dotenv

load_dotenv(override=True)

app = Flask(__name__)
sock = Sock(app)
CORS_ORIGIN_LIST = os.environ['CORS_ORIGIN_LIST'].split(',')
CORS(
    app,
    resources={r"/api/*": {"origins": CORS_ORIGIN_LIST}},
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    # allow_headers=["Content-Type", "Authorization"],
    # expose_headers=["Content-Disposition"],  # headers JS is allowed to read
    supports_credentials=True,
    max_age=600,  # cache preflight for 10 minutes
)



# Store state: which clients are in which rooms
rooms = {}  # {room_name: set of websocket connections}
user_rooms:Dict[simple_websocket.ws.Server, str] = {}  # {ws: room_name}

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/test", methods=["POST", ])
def test():
    username = request.json['username']
    database = request.json['database']
    response = {"message": f"User {username} made an entry to DB: {database}"}
    return jsonify(response), 200

@sock.route("/ws")
def websocket(ws:Server):
    try:
        while True:
            msg = str(ws.receive())
            msg = json.loads(msg)
            if msg is None:
                break  # client disconnected
            business_logic(msg, ws)
    finally:
       ws.send({"message":"bye"})

if __name__ == "__main__":
    # Run with Hypercorn for WebSocket support:
    # hypercorn app:app --bind 0.0.0.0:8000
    app.run(debug=False)