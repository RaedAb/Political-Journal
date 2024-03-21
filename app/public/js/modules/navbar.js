/**
 * Animation for navigation toggle sandwich in all of the html files
 */

const toggleNavigation = () => {
    const navToggle = document.querySelector('.nav-toggle')
    const links = document.querySelector('.links')

    navToggle.addEventListener('click', function () {
        links.classList.toggle('show-links')
    })
}

export default toggleNavigation;