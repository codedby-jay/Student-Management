/**
 * Student Management System - JavaScript Functions
 * Author: [Your Name]
 * Description: Form validation and interactive features for diploma project
 */

// Login Form Validation
function validateLoginForm() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Remove previous error messages
    removeErrorMessages();
    
    let isValid = true;
    
    // Validate username
    if (!username) {
        showError('username', 'Please enter username');
        isValid = false;
    } else if (username.length < 3) {
        showError('username', 'Username must be at least 3 characters');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showError('password', 'Please enter password');
        isValid = false;
    } else if (password.length < 3) {
        showError('password', 'Password must be at least 3 characters');
        isValid = false;
    }
    
    return isValid;
}

// Student Form Validation (Add/Edit)
function validateStudentForm() {
    const rollNo = document.getElementById('roll_no').value.trim();
    const name = document.getElementById('name').value.trim();
    const course = document.getElementById('course').value;
    const semester = document.getElementById('semester').value;
    const marks = document.getElementById('marks').value.trim();
    
    // Remove previous error messages
    removeErrorMessages();
    
    let isValid = true;
    
    // Validate Roll Number
    if (!rollNo) {
        showError('roll_no', 'Roll number is required');
        isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(rollNo)) {
        showError('roll_no', 'Roll number should contain only letters and numbers');
        isValid = false;
    } else if (rollNo.length < 3) {
        showError('roll_no', 'Roll number must be at least 3 characters');
        isValid = false;
    }
    
    // Validate Name
    if (!name) {
        showError('name', 'Student name is required');
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError('name', 'Name should contain only letters and spaces');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate Course
    if (!course) {
        showError('course', 'Please select a course');
        isValid = false;
    }
    
    // Validate Semester
    if (!semester) {
        showError('semester', 'Please select a semester');
        isValid = false;
    } else if (semester < 1 || semester > 8) {
        showError('semester', 'Semester must be between 1 and 8');
        isValid = false;
    }
    
    // Validate Marks
    if (!marks) {
        showError('marks', 'Marks are required');
        isValid = false;
    } else if (isNaN(marks)) {
        showError('marks', 'Marks must be a number');
        isValid = false;
    } else if (marks < 0 || marks > 100) {
        showError('marks', 'Marks must be between 0 and 100');
        isValid = false;
    }
    
    return isValid;
}

// Show Error Message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '5px';
    
    field.style.borderColor = '#dc3545';
    field.parentNode.appendChild(errorDiv);
    
    // Add shake animation
    field.style.animation = 'shake 0.5s';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

// Remove All Error Messages
function removeErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const fields = document.querySelectorAll('input, select');
    fields.forEach(field => {
        field.style.borderColor = '#e1e5e9';
    });
}

// Shake Animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Search Functionality Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Auto-focus on first input field
    const firstInput = document.querySelector('input[type="text"], input[type="password"]');
    if (firstInput) {
        firstInput.focus();
    }
    
    // Search input real-time feedback
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchValue = this.value.trim();
            const clearBtn = document.querySelector('.btn-secondary');
            
            if (searchValue && clearBtn) {
                clearBtn.style.display = 'inline-block';
            } else if (clearBtn) {
                clearBtn.style.display = 'none';
            }
        });
    }
    
    // Form submission loading state
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';
                submitBtn.style.opacity = '0.7';
            }
        });
    });
    
    // Table row hover effects
    const tableRows = document.querySelectorAll('.students-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Delete confirmation enhancement
    const deleteBtns = document.querySelectorAll('.btn-danger');
    deleteBtns.forEach(btn => {
        if (btn.onclick && btn.onclick.toString().includes('confirm')) {
            btn.addEventListener('click', function(e) {
                const studentName = this.closest('tr').querySelector('td:nth-child(2)').textContent;
                const confirmed = confirm(`Are you sure you want to delete "${studentName}"?`);
                if (!confirmed) {
                    e.preventDefault();
                }
            });
        }
    });
    
    // Number input validation
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);
            const value = parseFloat(this.value);
            
            if (value < min) {
                this.value = min;
            } else if (value > max) {
                this.value = max;
            }
        });
    });
    
    // Flash message auto-hide
    const flashMessages = document.querySelectorAll('.alert');
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.transition = 'opacity 0.5s ease';
            message.style.opacity = '0';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 5000); // Auto-hide after 5 seconds
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('.search-input');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                searchInput.form.submit();
            }
        }
    });
    
    // Print functionality
    const printBtn = document.createElement('button');
    printBtn.textContent = 'Print';
    printBtn.className = 'btn btn-secondary';
    printBtn.style.marginLeft = '10px';
    printBtn.onclick = function() {
        window.print();
    };
    
    const actionsSection = document.querySelector('.action-buttons');
    if (actionsSection) {
        actionsSection.appendChild(printBtn);
    }
});

// Utility Functions
function formatRollNumber(input) {
    // Convert to uppercase and remove special characters
    return input.toUpperCase().replace(/[^a-zA-Z0-9]/g, '');
}

function formatName(input) {
    // Capitalize each word
    return input.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

// Add input formatting listeners
document.addEventListener('DOMContentLoaded', function() {
    const rollNoInput = document.getElementById('roll_no');
    if (rollNoInput) {
        rollNoInput.addEventListener('input', function() {
            this.value = formatRollNumber(this.value);
        });
    }
    
    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            this.value = formatName(this.value);
        });
    }
});

// Export functions for global access
window.validateLoginForm = validateLoginForm;
window.validateStudentForm = validateStudentForm;
