from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'secretkey'

app.config["MONGO_URI"] = ("mongodb+srv://mbhagatw:878298347235@cluster0.rjnq2ff.mongodb.net/loginapp?retryWrites=true&w=majority&appName=Cluster0"

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
    print(mongo)
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        # Check if a user with this email already exists
        existing_user = mongo.db.users.find_one({"email": email})
        if existing_user:
            flash("Email already exists. Try logging in.")
            return redirect(url_for('register'))
        
        # Hash the password for secure storage
        hashed_password = generate_password_hash(password)
        
        # Insert the new user into the database
        mongo.db.users.insert_one({
            "email": email,
            "password": hashed_password
        })
        
        # Render the confirmation page
        return render_template('register_confirmation.html')
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

    
if __name__ == '__main__':
    app.run(debug=True)

