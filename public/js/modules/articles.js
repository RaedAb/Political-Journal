export const search = () => {
    const searchInput = document.getElementById('searchInput')

    searchInput.addEventListener('input', () => {
        setTimeout(()=> {
            searchArticles()
        }, 500)
        // Delay looks better
    })
}

export const searchArticles = () => {
    const searchInput = document
        .getElementById('searchInput')
        .value.toLowerCase()
    const articles = document.querySelectorAll('.article-container')

    articles.forEach((article) => {
        const articleTitle = article.querySelector('h5').innerText.toLowerCase()
        const articleAuthor = article.querySelector('p').innerText.toLowerCase()

        if (
            articleTitle.includes(searchInput) ||
            articleAuthor.includes(searchInput)
        ) {
            article.style.display = ''
        } else {
            article.style.display = 'none'
        }
    })
}

export default search
