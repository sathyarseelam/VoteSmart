from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'secretkey'

# Make sure this is exactly one continuous string, with no extra spaces or hidden characters.
app.config["MONGO_URI"] = (
    "mongodb://mbhagtw:MD0gjMSQDvrPGpib@ac-12345.mongodb.net:27017,"
    "ac-67890.mongodb.net:27017/loginapp?"
    "ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
)
mongo = PyMongo(app)

@app.route('/')
def index():
    if 'email' in session:
        return f"Logged in as: {session['email']}<br><a href='/logout'>Logout</a>"
    return (
        "Welcome to the LoginApp!<br>"
        "<a href='/login'>Login</a> | <a href='/register'>Register</a>"
    )

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        existing_user = mongo.db.users.find_one({"email": email})
        if existing_user:
            flash("Email already exists. Try logging in.")
            return redirect(url_for('register'))

        hashed_password = generate_password_hash(password)
        mongo.db.users.insert_one({"email": email, "password": hashed_password})
        flash("Registration successful! Please log in.")
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = mongo.db.users.find_one({"email": email})
        if user and check_password_hash(user['password'], password):
            session['email'] = email
            flash("Logged in successfully!")
            return redirect(url_for('index'))
        else:
            flash("Invalid email or password. Please try again.")
            return redirect(url_for('login'))
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('email', None)
    flash("You have been logged out.")
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
