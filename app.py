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

def init_profile_session():
    if 'profile' not in session:
        session['profile'] = {}

# Step 1: First Name
@app.route('/profile/step1', methods=['GET', 'POST'])
def profile_step1():
    if 'email' not in session:
        flash("You need to log in to update your profile.")
        return redirect(url_for('login'))
    init_profile_session()
    if request.method == 'POST':
        session['profile']['first_name'] = request.form.get('first_name')
        return redirect(url_for('profile_step2'))
    return render_template('profile_step1.html')

# Step 2: Last Name
@app.route('/profile/step2', methods=['GET', 'POST'])
def profile_step2():
    if 'email' not in session:
        flash("You need to log in to update your profile.")
        return redirect(url_for('login'))
    if request.method == 'POST':
        session['profile']['last_name'] = request.form.get('last_name')
        return redirect(url_for('profile_step3'))
    return render_template('profile_step2.html')

# Step 3: Birth Date
@app.route('/profile/step3', methods=['GET', 'POST'])
def profile_step3():
    if 'email' not in session:
        flash("You need to log in to update your profile.")
        return redirect(url_for('login'))
    if request.method == 'POST':
        # Assume input in format YYYY-MM-DD.
        session['profile']['birth_date'] = request.form.get('birth_date')
        return redirect(url_for('profile_step4'))
    return render_template('profile_step3.html')

# Step 4: Gender
@app.route('/profile/step4', methods=['GET', 'POST'])
def profile_step4():
    if 'email' not in session:
        flash("You need to log in to update your profile.")
        return redirect(url_for('login'))
    if request.method == 'POST':
        session['profile']['gender'] = request.form.get('gender')
        return redirect(url_for('profile_step5'))
    return render_template('profile_step4.html')

# Step 5: County
@app.route('/profile/step5', methods=['GET', 'POST'])
def profile_step5():
    if 'email' not in session:
        flash("You need to log in to update your profile.")
        return redirect(url_for('login'))
    if request.method == 'POST':
        session['profile']['county'] = request.form.get('county')
        return redirect(url_for('profile_step6'))
    return render_template('profile_step5.html')

# Step 6: Income Bracket
@app.route('/profile/step6', methods=['GET', 'POST'])
def profile_step6():
    if 'email' not in session:
        flash("You need to log in to update your profile.")
        return redirect(url_for('login'))
    if request.method == 'POST':
        session['profile']['income_bracket'] = request.form.get('income_bracket')
        return redirect(url_for('profile_step7'))
    return render_template('profile_step6.html')

# Step 7: Family Size
@app.route('/profile/step7', methods=['GET', 'POST'])
def profile_step7():
    if 'email' not in session:
        flash("You need to log in to update your profile.")
        return redirect(url_for('login'))
    if request.method == 'POST':
        session['profile']['family_size'] = request.form.get('family_size')
        return redirect(url_for('profile_step8'))
    return render_template('profile_step7.html')

# Step 8: Race/Ethnicity and Final Submission
@app.route('/profile/step8', methods=['GET', 'POST'])
def profile_step8():
    if 'email' not in session:
        flash("You need to log in to update your profile.")
        return redirect(url_for('login'))
    if request.method == 'POST':
        session['profile']['race_ethnicity'] = request.form.get('race_ethnicity')
        
        # Update the user document in MongoDB.
        profile_data = session.get('profile', {})
        mongo.db.users.update_one(
            {"email": session['email']},
            {"$set": profile_data}
        )
        # Clear temporary profile data.
        session.pop('profile', None)
        
        flash("Profile updated successfully!")
        return redirect(url_for('index'))
    return render_template('profile_step8.html')

if __name__ == '__main__':
    app.run(debug=True)

    