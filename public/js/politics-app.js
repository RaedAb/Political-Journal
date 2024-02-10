import toggleNavigation from './modules/navbar.js'
import slideShow from './modules/carousel.js'
import search from './modules/articles.js'

document.addEventListener('DOMContentLoaded', () => {
    // Load articles when the DOM is fully loaded
    toggleNavigation()


    // Load slides if on the homepage
    if (window.location.pathname === '/') {
        slideShow()
    }

    if (window.location.pathname === '/articles') {
        search()
    }
})
