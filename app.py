import sqlite3
from flask import Flask, render_template
import os.path


def get_db_connection():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, "MNPDUseofForce.db")
    # with sqlite3.connect(db_path) as conn:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn


app = Flask(__name__)

@app.route('/')
def index():
    conn = get_db_connection()
    mnpddata = conn.execute('SELECT * FROM MNPDtbl').fetchall()
    
    conn.close()
    return render_template('index.html', mnpddata=mnpddata)
    # return render_template('index.html', posts=posts)
    # return render_template('script.js')

    # return render_template('index.html')


if __name__ == "__main__":
    app.run()
