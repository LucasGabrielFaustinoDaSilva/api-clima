from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    port=os.getenv("DB_PORT")
)

@app.route("/weather", methods=["GET"])
def get_weather():
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM weather_data
        ORDER BY created_at DESC
        LIMIT 50
    """)

    data = cursor.fetchall()
    return jsonify(data)

@app.route("/weather/latest", methods=["GET"])
def latest():
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM weather_data
        ORDER BY id DESC
        LIMIT 1
    """)

    return jsonify(cursor.fetchone())

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=3000)