import toggleNavigation from './modules/navbar.js'
import loadArticles from './modules/articles.js'
import slideShow from './modules/carousel.js'

toggleNavigation()
loadArticles()

// Check if the current page is index.html, load slideshow
if (window.location.pathname === '/') {
    slideShow()
}

document.addEventListener('DOMContentLoaded', () => {
    // Load articles when the DOM is fully loaded
    loadArticles();
});