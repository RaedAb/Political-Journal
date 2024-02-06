import toggleNavigation from './modules/navbar.js'
import loadArticles from './modules/articles.js'
import loadSlides from './modules/carousel.js'

document.addEventListener('DOMContentLoaded', () => {
    // Load articles when the DOM is fully loaded
    toggleNavigation()
    loadSlides()
    loadArticles()
})
