let slideIndex = 1

/**
 * Slideshow switch to next slide
 * Handles the event where the switch button is pressed
 */
export const slideShow = () => {
    showSlides(slideIndex)

    const prev = document.querySelector('.prev-toggle')
    const next = document.querySelector('.next-toggle')
    const dot = document.querySelectorAll('.dot')

    // Auto change slide
    setInterval(()=> {
        slideIndex += 1;
        showSlides(slideIndex)
    }, 7500)

    // click right
    prev.addEventListener('click', () => {
        slideIndex -= 1
        setTimeout(() => {
            showSlides(slideIndex)
        }, 100)
        console.log(slideIndex)
    })

    // click left
    next.addEventListener('click', () => {
        slideIndex += 1
        setTimeout(() => {
            showSlides(slideIndex)
        }, 100)
        console.log(slideIndex)
    })

    dot.forEach((dot) => {
        dot.addEventListener('click', () => {
            slideIndex = dot.id.charAt(dot.id.length - 1)
            setTimeout(() => {
                showSlides(slideIndex)
            }, 100)
        })
    })
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

export default slideShow
