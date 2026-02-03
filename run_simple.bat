@echo off
title StudentHub - Student Management System
color 0B

echo ===================================================
echo         STUDENTHUB - STUDENT MANAGEMENT
echo ===================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed!
    echo Please install Python from https://www.python.org/downloads/
    pause
    exit /b
)

REM Check if Flask is installed
python -c "import flask" >nul 2>&1
if errorlevel 1 (
    echo Installing Flask...
    pip install flask
)

echo Starting StudentHub...
echo.
echo Login Credentials:
echo   Username: admin
echo   Password: admin123
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul

REM Start Flask in background and open browser
start /B python app.py
timeout /t 2 /nobreak >nul
start http://localhost:5000

echo.
echo StudentHub is running at http://localhost:5000
echo Press any key to stop the server...
pause >nul

REM Stop the server
taskkill /f /im python.exe >nul 2>&1
echo Server stopped.
