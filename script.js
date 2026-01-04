// ============================================
// Mobile Navigation Toggle
// ============================================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Animations (Fade-in on Scroll)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll('.service-card, .advantage-item, .gallery-item, .contact-item, .about-text, .section-title');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ============================================
// Navbar Background on Scroll
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(155, 126, 217, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(155, 126, 217, 0.15)';
    }
});

// ============================================
// Form Validation and Submission
// ============================================

const bookingForm = document.getElementById('booking-form');
const formInputs = bookingForm.querySelectorAll('input, select');

// Real-time validation
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });

    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

// Validate individual field
function validateField(field) {
    const errorMessage = field.parentElement.querySelector('.error-message');
    let isValid = true;
    let errorText = '';

    // Remove previous error styling
    field.classList.remove('error');

    // Check if field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorText = 'Это поле обязательно для заполнения';
    }

    // Validate phone number format
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            errorText = 'Пожалуйста, введите корректный номер телефона';
        }
    }

    // Validate name (letters and spaces only, including Cyrillic)
    if (field.id === 'name' && field.value.trim()) {
        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
        if (!nameRegex.test(field.value.trim())) {
            isValid = false;
            errorText = 'Имя должно содержать только буквы';
        }
    }

    // Display error or clear it
    if (!isValid) {
        field.classList.add('error');
        errorMessage.textContent = errorText;
    } else {
        field.classList.remove('error');
        errorMessage.textContent = '';
    }

    return isValid;
}

// Form submission handler
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;

    // Validate all fields
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    // If form is valid, process submission
    if (isFormValid) {
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value
        };

        // Log form data (in production, this would be sent to a server)
        console.log('Booking submitted:', formData);

        // Show success message in Russian
        alert(`Спасибо, ${formData.name}! Ваша заявка на "${getServiceName(formData.service)}" получена. Мы свяжемся с вами по номеру ${formData.phone} в ближайшее время.`);

        // Reset form
        bookingForm.reset();
        
        // Clear any error messages
        formInputs.forEach(input => {
            input.classList.remove('error');
            input.parentElement.querySelector('.error-message').textContent = '';
        });
    } else {
        // Scroll to first error field
        const firstError = bookingForm.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
});

// Helper function to get service name in Russian
function getServiceName(value) {
    const services = {
        'women-haircut': 'Женские стрижки',
        'men-haircut': 'Мужские стрижки',
        'children-haircut': 'Детские стрижки',
        'hair-coloring': 'Окрашивание волос',
        'styling': 'Укладка',
        'hair-care': 'Уход за волосами'
    };
    return services[value] || value;
}

// ============================================
// Smooth Page Load Animation
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Parallax Effect for Hero Section (Optional Enhancement)
// ============================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
