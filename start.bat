@echo off
title Student Management System - Auto Start
color 0B

echo ===================================================
echo    STUDENT MANAGEMENT SYSTEM - AUTO START
echo ===================================================
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

REM Check if Flask is installed
python -c "import flask" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing Flask...
    pip install flask
)

REM Check if we're in the correct directory
if not exist "app.py" (
    echo [ERROR] app.py not found!
    pause
    exit /b 1
)

echo Starting server and opening browser...
echo.

REM Start Flask application in background
start /B python app.py

REM Wait for server to start
timeout /t 3 /nobreak >nul

REM Open browser
start http://localhost:5000

echo Application started! Opening browser...
echo.
echo If browser doesn't open automatically, visit: http://localhost:5000
echo.
echo Default Login: admin / admin123
echo.
echo Press any key to stop the server...
pause >nul

REM Stop the server
taskkill /f /im python.exe >nul 2>&1

echo Server stopped.
