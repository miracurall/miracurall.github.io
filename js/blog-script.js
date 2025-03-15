// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease',
    once: true
});

// Blog Category Filter
const categoryButtons = document.querySelectorAll('.category-btn');
const blogPosts = document.querySelectorAll('.blog-card');
const postsPerPage = 6;
let currentCategory = 'all';
let currentPage = 1;

// Filter blog posts by category
function filterPosts(category) {
    currentCategory = category;
    currentPage = 1;
    
    blogPosts.forEach(post => {
        if (category === 'all' || post.dataset.category === category) {
            post.style.display = 'none';
            post.classList.add('hidden');
        } else {
            post.style.display = 'none';
            post.classList.add('hidden');
        }
    });

    showPosts();
    checkLoadMoreVisibility();
}

// Show posts for current page
function showPosts() {
    const relevantPosts = Array.from(blogPosts).filter(post => 
        currentCategory === 'all' || post.dataset.category === currentCategory
    );

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    relevantPosts.forEach((post, index) => {
        if (index >= startIndex && index < endIndex) {
            post.style.display = 'block';
            post.classList.remove('hidden');
            // Add fade-in animation
            setTimeout(() => {
                post.style.opacity = '1';
            }, 50 * (index - startIndex));
        }
    });
}

// Check if Load More button should be visible
function checkLoadMoreVisibility() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (!loadMoreBtn) return;

    const relevantPosts = Array.from(blogPosts).filter(post => 
        currentCategory === 'all' || post.dataset.category === currentCategory
    );

    const totalPages = Math.ceil(relevantPosts.length / postsPerPage);
    loadMoreBtn.style.display = currentPage < totalPages ? 'block' : 'none';
}

// Event Listeners
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterPosts(btn.dataset.category);
    });
});

const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        showPosts();
        checkLoadMoreVisibility();
    });
}

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Add your newsletter subscription logic here
        alert('Thank you for subscribing! You will receive our latest updates.');
        newsletterForm.reset();
    });
}

// Initialize blog posts display
filterPosts('all'); 