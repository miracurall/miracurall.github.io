// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease',
    once: true
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Works Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');
let currentFilter = 'all';
const itemsToShow = 3; // Number of items to show initially

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize work items
function initializeWorkItems() {
    const allItems = Array.from(workItems);
    const shuffledItems = shuffleArray(allItems);
    
    // Reset display and classes
    workItems.forEach(item => {
        item.style.display = 'none';
        item.classList.add('hidden');
    });

    // Show first three items from different categories if possible
    const shownCategories = new Set();
    let displayedCount = 0;
    
    // First pass: Try to show items from different categories
    for (const item of shuffledItems) {
        const itemCategory = Array.from(item.classList)
            .find(cls => cls !== 'work-item' && cls !== 'hidden');
        
        if (!shownCategories.has(itemCategory) && displayedCount < itemsToShow) {
            item.style.display = 'block';
            item.classList.remove('hidden');
            shownCategories.add(itemCategory);
            displayedCount++;
        }
    }

    // Second pass: Fill remaining slots if needed
    if (displayedCount < itemsToShow) {
        for (const item of shuffledItems) {
            if (displayedCount >= itemsToShow) break;
            if (item.style.display !== 'block') {
                item.style.display = 'block';
                item.classList.remove('hidden');
                displayedCount++;
            }
        }
    }

    // Show "Show All" button if there are more items to display
    const showAllBtn = document.querySelector('.show-all-btn');
    showAllBtn.style.display = shuffledItems.length > itemsToShow ? 'block' : 'none';
}

// Filter works
function filterWorks(category) {
    currentFilter = category;
    const allItems = Array.from(workItems);
    const filteredItems = category === 'all' 
        ? allItems 
        : allItems.filter(item => item.classList.contains(category));
    
    const shuffledItems = shuffleArray(filteredItems);
    
    // Reset all items
    workItems.forEach(item => {
        item.style.display = 'none';
        item.classList.add('hidden');
    });

    // Show first three items (or all if less than three)
    const itemsToDisplay = Math.min(itemsToShow, shuffledItems.length);
    for (let i = 0; i < itemsToDisplay; i++) {
        shuffledItems[i].style.display = 'block';
        shuffledItems[i].classList.remove('hidden');
    }

    // Show/Hide "Show All" button
    const showAllBtn = document.querySelector('.show-all-btn');
    showAllBtn.style.display = shuffledItems.length > itemsToShow ? 'block' : 'none';
}

// Show All items
function showAllItems() {
    const relevantItems = Array.from(workItems).filter(item => 
        currentFilter === 'all' || item.classList.contains(currentFilter)
    );
    
    const shuffledItems = shuffleArray(relevantItems);
    shuffledItems.forEach(item => {
        item.style.display = 'block';
        item.classList.remove('hidden');
    });
    
    document.querySelector('.show-all-btn').style.display = 'none';
}

// Event Listeners
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterWorks(btn.getAttribute('data-filter'));
    });
});

document.querySelector('.show-all-btn').addEventListener('click', showAllItems);

// Initialize works section
initializeWorkItems();

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Dynamic copyright year
const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = `&copy; 2023-${currentYear} MiraCurall Consultancy Services. All rights reserved.`;
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
}); 