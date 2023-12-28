/**
 * Animation for navigation toggle sandwich
 */
const navToggle = document.querySelector('.nav-toggle')
const links = document.querySelector('.links')

navToggle.addEventListener('click', function () {
    links.classList.toggle('show-links')
})

/**
 * Slideshow switch to next slide
 * Handles the event where the switch button is pressed
 */
let slideIndex = 1
showSlides(slideIndex)

// Next/previous controls
function plusSlides(n) {
    setTimeout(() => {
        showSlides((slideIndex += n))
    }, 100)
}

// Thumbnail image controls
function currentSlide(n) {
    setTimeout(() => {
        showSlides((slideIndex = n))
    }, 100)
}

function showSlides(n) {
    let i
    let slides = document.getElementsByClassName('mySlides')
    let dots = document.getElementsByClassName('dot')
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '')
    }
    slides[slideIndex - 1].style.display = 'block'
    dots[slideIndex - 1].className += ' active'
}
