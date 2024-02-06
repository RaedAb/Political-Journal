let slideIndex = 1

export const loadSlides = async () => {
    const slidesContainer = document.getElementById('slideshow-container')
    const dotsContainer = document.getElementById('dots-container')

    try {
        const response = await fetch('/api/v1/articles')
        if (!response.ok) {
            throw new Error('Failed to fetch slides')
        }

        const responseData = await response.json()
        const articles = responseData.articles

        articles.forEach((article, i) => {
            // Add a new slide
            const articleElement = document.createElement('div')
            articleElement.classList.add('mySlides', 'fade')
            articleElement.innerHTML = `
                <div class="numbertext">${i + 1} / ${
                articles.length
            }</div> <!-- Fixed index variable -->
                    <img src="${article.imageUrl}" alt="${article.title}" />
                    <div class="text">
                        <h3>${article.title}</h3>
                        <p>${article.author} &#183; ${new Date(
                article.date
            ).toLocaleDateString()}</p>
                    </div>
            `

            // Insert the new slide at the top of slidesContainer
            slidesContainer.appendChild(articleElement)

            // Add a new dot
            const dotElement = document.createElement('span')
            dotElement.classList.add('dot')
            dotElement.setAttribute('id', `dot${i + 1}`)

            dotElement.innerHTML = ''

            // Insert the new dot at the top of dotsContainer
            dotsContainer.appendChild(dotElement)
        })

        // Create left button
        const leftButton = document.createElement('a')
        leftButton.classList.add('prev-toggle')
        leftButton.innerHTML = `&#10094;`

        // create right button
        const rightButton = document.createElement('a')
        rightButton.classList.add('next-toggle')
        rightButton.innerHTML = `&#10095;`

        // add the buttons after
        slidesContainer.appendChild(leftButton)
        slidesContainer.appendChild(rightButton)
    } catch (error) {
        console.error('Error fetching articles:', error.message)
        // Display a user-friendly error message to the user
        if (slidesContainer) {
            slidesContainer.innerHTML =
                '<p>Failed to fetch articles. Please try again later.</p>'
        }
    }
    // slides have been loaded, start show slides
    slideShow()
}

/**
 * Slideshow switch to next slide
 * Handles the event where the switch button is pressed
 */
const slideShow = () => {
    showSlides(slideIndex)

    const prev = document.querySelector('.prev-toggle')
    const next = document.querySelector('.next-toggle')
    const dot = document.querySelectorAll('.dot')

    prev.addEventListener('click', () => {
        slideIndex -= 1
        setTimeout(() => {
            showSlides(slideIndex)
        }, 100)
        console.log(slideIndex)
    })

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

// const toggleSlides = () => {
//     const prevToggle = document.querySelector('.prev-toggle')
//     const nextToggle = document.querySelector('.next-toggle')

//     prevToggle.addEventListener('click', () => {
//         slideIndex += 1
//         setTimeout(() => {
//             slideShow()
//         }, 100)
//         console.log(slideIndex)
//     })

//     nextToggle.addEventListener('click', () => {
//         slideIndex -= 1
//         setTimeout(() => {
//             slideShow()
//         }, 100)
//         console.log(slideIndex)
//     })
// }

export default loadSlides
