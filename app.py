from flask import Flask, render_template
from flask_cors import CORS
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.exceptions import NotFound

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def home():
  return render_template('home.html')

hostedApp = Flask('frontend')
hostedApp.wsgi_app = DispatcherMiddleware(app=NotFound(), mounts={"": app})

if __name__ == '__main__':
    hostedApp.run(host='127.0.0.1', port=8000, debug=False)
