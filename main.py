from flask import Flask

app = Flask(__name__)

from routes.main import main_bp
app.register_blueprint(main_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)