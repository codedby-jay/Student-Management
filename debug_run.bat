@echo off
title DEBUG - Student Management System
color 0E

echo ===================================================
echo         DEBUG MODE - STUDENT MANAGEMENT
echo ===================================================
echo.

echo [1] Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python not found!
    pause
    exit /b
)
echo SUCCESS: Python found
echo.

echo [2] Checking Flask installation...
python -c "import flask; print('Flask version:', flask.__version__)"
if errorlevel 1 (
    echo ERROR: Flask not found! Installing...
    pip install flask
)
echo SUCCESS: Flask found
echo.

echo [3] Checking project files...
if exist "app.py" (
    echo SUCCESS: app.py found
) else (
    echo ERROR: app.py missing!
    pause
    exit /b
)

if exist "templates" (
    echo SUCCESS: templates folder found
) else (
    echo ERROR: templates folder missing!
    pause
    exit /b
)

if exist "static" (
    echo SUCCESS: static folder found
) else (
    echo ERROR: static folder missing!
    pause
    exit /b
)
echo.

echo [4] Testing Flask app import...
python -c "import app; print('SUCCESS: Flask app imports correctly')"
if errorlevel 1 (
    echo ERROR: Flask app has import errors!
    pause
    exit /b
)
echo.

echo [5] Starting Flask application...
echo.
echo ===================================================
echo IMPORTANT: The app will start below.
echo After it starts, open your web browser and go to:
echo http://localhost:5000
echo.
echo Login: admin / admin123
echo ===================================================
echo.

python app.py

echo.
echo ===================================================
echo Flask application stopped.
echo ===================================================
pause
