@echo off
title Student Management System - Diploma Project
color 0A

echo ===================================================
echo    STUDENT MANAGEMENT SYSTEM - DIPLONA PROJECT
echo ===================================================
echo.
echo Starting Student Management System...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed!
    echo Please install Python from https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

echo [SUCCESS] Python is installed
python --version

REM Check if Flask is installed
python -c "import flask" >nul 2>&1
if errorlevel 1 (
    echo.
    echo [INFO] Flask is not installed. Installing Flask...
    pip install flask
    if errorlevel 1 (
        echo [ERROR] Failed to install Flask!
        echo Please check your internet connection and try again.
        pause
        exit /b 1
    )
    echo [SUCCESS] Flask installed successfully
) else (
    echo [SUCCESS] Flask is already installed
)

REM Check if we're in the correct directory
if not exist "app.py" (
    echo [ERROR] app.py not found!
    echo Please make sure you are running this batch file from the project directory.
    pause
    exit /b 1
)

if not exist "templates" (
    echo [ERROR] templates folder not found!
    echo Please make sure all project files are present.
    pause
    exit /b 1
)

echo.
echo [SUCCESS] All files found
echo.
echo ===================================================
echo    PROJECT INFORMATION
echo ===================================================
echo.
echo Default Login Credentials:
echo   Username: admin
echo   Password: admin123
echo.
echo Application will start at: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ===================================================
echo.
echo Starting Flask Application...
echo.

REM Run the Flask application
python app.py

REM If the application stops, show exit message
echo.
echo ===================================================
echo    APPLICATION STOPPED
echo ===================================================
echo.
echo Thank you for using Student Management System!
echo.
pause
