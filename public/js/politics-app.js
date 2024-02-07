import toggleNavigation from './modules/navbar.js'
import slideShow from './modules/carousel.js'

document.addEventListener('DOMContentLoaded', () => {
    // Load articles when the DOM is fully loaded
    toggleNavigation()

    // Load slides if on the homepage
    if (window.location.pathname === '/') {
        slideShow()
    }
})
