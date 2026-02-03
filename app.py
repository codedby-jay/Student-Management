"""
Student Management System - Diploma Final Project
Author: [Your Name]
Description: A simple Flask-based student management system with login authentication
"""

from flask import Flask, render_template, request, redirect, url_for, session, flash
import sqlite3
from functools import wraps

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Change this in production

# Database initialization
def init_db():
    """Initialize the SQLite database with required tables"""
    conn = sqlite3.connect('student_management.db')
    cursor = conn.cursor()
    
    # Create admin table for login
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS admin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')
    
    # Create students table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            roll_no TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            course TEXT NOT NULL,
            semester INTEGER NOT NULL,
            marks INTEGER NOT NULL
        )
    ''')
    
    # Insert default admin user if not exists
    cursor.execute('SELECT * FROM admin WHERE username = ?', ('admin',))
    if not cursor.fetchone():
        cursor.execute('INSERT INTO admin (username, password) VALUES (?, ?)', 
                      ('admin', 'admin123'))
    
    conn.commit()
    conn.close()

# Database connection helper
def get_db_connection():
    """Create a database connection"""
    conn = sqlite3.connect('student_management.db')
    conn.row_factory = sqlite3.Row
    return conn

# Login required decorator
def login_required(f):
    """Decorator to require login for certain routes"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

# Routes
@app.route('/')
def index():
    """Redirect to login page"""
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Handle user login"""
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Validate input
        if not username or not password:
            flash('Please enter both username and password', 'error')
            return render_template('login.html')
        
        # Check credentials
        conn = get_db_connection()
        admin = conn.execute('SELECT * FROM admin WHERE username = ? AND password = ?', 
                           (username, password)).fetchone()
        conn.close()
        
        if admin:
            session['logged_in'] = True
            session['username'] = username
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password', 'error')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    """Handle user logout"""
    session.clear()
    flash('You have been logged out', 'info')
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    """Display student dashboard with all students"""
    search = request.args.get('search', '')
    conn = get_db_connection()
    
    if search:
        # Search by roll number or name
        students = conn.execute('''
            SELECT * FROM students 
            WHERE roll_no LIKE ? OR name LIKE ? 
            ORDER BY roll_no
        ''', (f'%{search}%', f'%{search}%')).fetchall()
    else:
        # Get all students
        students = conn.execute('SELECT * FROM students ORDER BY roll_no').fetchall()
    
    conn.close()
    return render_template('dashboard.html', students=students, search=search)

@app.route('/add_student', methods=['GET', 'POST'])
@login_required
def add_student():
    """Add a new student"""
    if request.method == 'POST':
        roll_no = request.form['roll_no']
        name = request.form['name']
        course = request.form['course']
        semester = request.form['semester']
        marks = request.form['marks']
        
        # Validate input
        if not all([roll_no, name, course, semester, marks]):
            flash('All fields are required', 'error')
            return render_template('add_student.html')
        
        try:
            semester = int(semester)
            marks = int(marks)
            
            if semester < 1 or semester > 8:
                flash('Semester must be between 1 and 8', 'error')
                return render_template('add_student.html')
            
            if marks < 0 or marks > 100:
                flash('Marks must be between 0 and 100', 'error')
                return render_template('add_student.html')
            
        except ValueError:
            flash('Semester and marks must be numbers', 'error')
            return render_template('add_student.html')
        
        # Check if roll number already exists
        conn = get_db_connection()
        existing = conn.execute('SELECT id FROM students WHERE roll_no = ?', 
                             (roll_no,)).fetchone()
        
        if existing:
            flash('Roll number already exists', 'error')
            conn.close()
            return render_template('add_student.html')
        
        # Insert new student
        conn.execute('''
            INSERT INTO students (roll_no, name, course, semester, marks)
            VALUES (?, ?, ?, ?, ?)
        ''', (roll_no, name, course, semester, marks))
        
        conn.commit()
        conn.close()
        
        flash('Student added successfully!', 'success')
        return redirect(url_for('dashboard'))
    
    return render_template('add_student.html')

@app.route('/edit_student/<int:student_id>', methods=['GET', 'POST'])
@login_required
def edit_student(student_id):
    """Edit student details"""
    conn = get_db_connection()
    
    if request.method == 'POST':
        roll_no = request.form['roll_no']
        name = request.form['name']
        course = request.form['course']
        semester = request.form['semester']
        marks = request.form['marks']
        
        # Validate input
        if not all([roll_no, name, course, semester, marks]):
            flash('All fields are required', 'error')
            student = conn.execute('SELECT * FROM students WHERE id = ?', 
                                 (student_id,)).fetchone()
            conn.close()
            return render_template('edit_student.html', student=student)
        
        try:
            semester = int(semester)
            marks = int(marks)
            
            if semester < 1 or semester > 8:
                flash('Semester must be between 1 and 8', 'error')
                student = conn.execute('SELECT * FROM students WHERE id = ?', 
                                     (student_id,)).fetchone()
                conn.close()
                return render_template('edit_student.html', student=student)
            
            if marks < 0 or marks > 100:
                flash('Marks must be between 0 and 100', 'error')
                student = conn.execute('SELECT * FROM students WHERE id = ?', 
                                     (student_id,)).fetchone()
                conn.close()
                return render_template('edit_student.html', student=student)
            
        except ValueError:
            flash('Semester and marks must be numbers', 'error')
            student = conn.execute('SELECT * FROM students WHERE id = ?', 
                                 (student_id,)).fetchone()
            conn.close()
            return render_template('edit_student.html', student=student)
        
        # Check if roll number already exists (excluding current student)
        existing = conn.execute('''
            SELECT id FROM students 
            WHERE roll_no = ? AND id != ?
        ''', (roll_no, student_id)).fetchone()
        
        if existing:
            flash('Roll number already exists', 'error')
            student = conn.execute('SELECT * FROM students WHERE id = ?', 
                                 (student_id,)).fetchone()
            conn.close()
            return render_template('edit_student.html', student=student)
        
        # Update student
        conn.execute('''
            UPDATE students 
            SET roll_no = ?, name = ?, course = ?, semester = ?, marks = ?
            WHERE id = ?
        ''', (roll_no, name, course, semester, marks, student_id))
        
        conn.commit()
        conn.close()
        
        flash('Student updated successfully!', 'success')
        return redirect(url_for('dashboard'))
    
    # GET request - show edit form
    student = conn.execute('SELECT * FROM students WHERE id = ?', 
                         (student_id,)).fetchone()
    conn.close()
    
    if not student:
        flash('Student not found', 'error')
        return redirect(url_for('dashboard'))
    
    return render_template('edit_student.html', student=student)

@app.route('/delete_student/<int:student_id>')
@login_required
def delete_student(student_id):
    """Delete a student"""
    conn = get_db_connection()
    conn.execute('DELETE FROM students WHERE id = ?', (student_id,))
    conn.commit()
    conn.close()
    
    flash('Student deleted successfully!', 'success')
    return redirect(url_for('dashboard'))

# Initialize database on first run
if __name__ == '__main__':
    init_db()
    print("Database initialized successfully!")
    print("Starting Flask application...")
    print("Default login: username='admin', password='admin123'")
    app.run(debug=True, host='0.0.0.0', port=5000)
