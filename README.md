# Student Management System

A simple Flask-based Student Management System for diploma final project with login authentication and complete CRUD operations.

## 🎯 Project Overview

This Student Management System is designed as a diploma final project that demonstrates:
- Web development using Python Flask
- Database management with SQLite
- User authentication and session management
- Complete CRUD operations for student records
- Clean and responsive UI design
- Form validation and error handling

## 🛠️ Technology Stack

### Backend
- **Python 3.x** - Programming language
- **Flask** - Web framework
- **SQLite** - Database management
- **Flask-Session** - Session management

### Frontend
- **HTML5** - Markup language
- **CSS3** - Styling with modern design
- **JavaScript (Vanilla)** - Form validation and interactions

## 📁 Project Structure

```
Student Management/
├── app.py                 # Main Flask application
├── student_management.db  # SQLite database (auto-created)
├── templates/             # HTML templates
│   ├── login.html        # Login page
│   ├── dashboard.html    # Student dashboard
│   ├── add_student.html  # Add new student
│   └── edit_student.html # Edit student details
├── static/               # Static files
│   ├── css/
│   │   └── style.css     # Stylesheet
│   └── js/
│       └── script.js     # JavaScript functions
└── README.md            # This file
```

## 🚀 Setup and Installation

### Prerequisites
- Python 3.6 or higher installed on your system
- Basic understanding of web development concepts

### Step 1: Install Python
Download and install Python from [python.org](https://www.python.org/downloads/)
Make sure to check "Add Python to PATH" during installation.

### Step 2: Install Flask
Open Command Prompt/Terminal and run:
```bash
pip install flask
```

### Step 3: Download/Clone the Project
Extract the project files to your desired location or clone from repository.

### Step 4: Navigate to Project Directory
```bash
cd "Student Management"
```

## 🏃‍♂️ Running the Application

### Method 1: Direct Run
```bash
python app.py
```

### Method 2: Using Python Command
```bash
python -m flask run
```

### Method 3: Development Mode
```bash
set FLASK_ENV=development
flask run
```

The application will start running on:
```
http://localhost:5000
```

## 🔐 Default Login Credentials

- **Username:** `admin`
- **Password:** `admin123`

> **Note:** These credentials are automatically created when you first run the application.

## 📋 Features

### Authentication System
- ✅ Simple login system with single admin account
- ✅ Session management for maintaining login state
- ✅ Protected routes (only accessible after login)
- ✅ Logout functionality

### Student Management
- ✅ Add new student records
- ✅ View all students in a table format
- ✅ Update/edit student information
- ✅ Delete student records
- ✅ Search students by Roll Number or Name
- ✅ Real-time statistics (total students, average marks)

### Data Validation
- ✅ Input validation for all forms
- ✅ Unique roll number enforcement
- ✅ Semester range validation (1-8)
- ✅ Marks range validation (0-100)
- ✅ Required field validation

### User Interface
- ✅ Clean and modern design
- ✅ Responsive layout for mobile devices
- ✅ Interactive form validation
- ✅ Flash messages for user feedback
- ✅ Hover effects and animations

## 🗄️ Database Schema

### Admin Table
```sql
CREATE TABLE admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
```

### Students Table
```sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roll_no TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    course TEXT NOT NULL,
    semester INTEGER NOT NULL,
    marks INTEGER NOT NULL
);
```

## 📱 How to Use

### 1. Login
- Open the application in your browser
- Enter default credentials (admin/admin123)
- Click "Login" button

### 2. Dashboard
- View all student records
- Search for specific students
- See statistics (total students, average marks)
- Navigate to add/edit/delete functions

### 3. Add Student
- Click "Add New Student" button
- Fill in all required fields:
  - Roll Number (unique)
  - Student Name
  - Course selection
  - Semester (1-8)
  - Marks (0-100)
- Click "Add Student" to save

### 4. Edit Student
- Click "Edit" button next to student record
- Modify the required information
- Click "Update Student" to save changes

### 5. Delete Student
- Click "Delete" button next to student record
- Confirm deletion in the popup dialog

### 6. Search Students
- Enter Roll Number or Name in search box
- Click "Search" button
- Use "Clear" button to reset search

### 7. Logout
- Click "Logout" button in header
- You will be redirected to login page

## 🔧 Customization

### Change Admin Credentials
Edit the `init_db()` function in `app.py`:
```python
cursor.execute('INSERT INTO admin (username, password) VALUES (?, ?)', 
              ('your_username', 'your_password'))
```

### Modify Courses
Edit the course options in `add_student.html` and `edit_student.html`:
```html
<option value="Your Course">Your Course</option>
```

### Change Styling
Modify `static/css/style.css` to customize colors, fonts, and layout.

### Add New Fields
1. Update database schema in `init_db()`
2. Modify HTML forms
3. Update Flask routes
4. Add validation in JavaScript

## 🐛 Troubleshooting

### Common Issues

#### 1. "ModuleNotFoundError: No module named 'flask'"
```bash
pip install flask
```

#### 2. Database not created
- Delete `student_management.db` if it exists
- Run the application again
- Database will be auto-created

#### 3. Port already in use
```bash
# Kill existing process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or run on different port
python app.py  # Edit app.py to change port
```

#### 4. Permission denied (Linux/Mac)
```bash
chmod +x app.py
```

#### 5. CSS/JS not loading
- Check file paths in templates
- Ensure static folder structure is correct
- Verify Flask is running from correct directory

## 📚 Learning Outcomes

This project demonstrates understanding of:
- Web application development with Flask
- Database design and management
- User authentication and session handling
- Form validation and error handling
- Responsive web design
- CRUD operations
- Frontend-backend integration

## 🎓 Diploma Viva Preparation

### Key Concepts to Explain
1. **Flask Framework**: Lightweight Python web framework
2. **SQLite Database**: Serverless, file-based database
3. **Session Management**: Maintaining user login state
4. **CRUD Operations**: Create, Read, Update, Delete
5. **Form Validation**: Client-side and server-side validation
6. **Responsive Design**: Mobile-friendly interface

### Technical Questions
- How does Flask handle routing?
- What is the purpose of decorators in Flask?
- How is data stored and retrieved from SQLite?
- Why is form validation important?
- How does session management work?

### Project Highlights
- Clean, beginner-friendly code structure
- Comprehensive error handling
- Modern, responsive UI design
- Complete functionality with all requirements
- Well-documented code with comments

## 📄 License

This project is created for educational purposes as part of diploma curriculum.

## 👨‍💻 Author

**[Your Name]**  
Diploma Student  
Computer Engineering/Information Technology

---

## 📞 Support

For any queries or issues with the project:
1. Check the troubleshooting section above
2. Verify all files are in correct locations
3. Ensure Python and Flask are properly installed
4. Check browser console for JavaScript errors

**Happy Coding! 🎉**
