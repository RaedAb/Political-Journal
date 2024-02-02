/**
 * Code to load articles dynamically in the articles-container div in index.html and articles.html
 */
const loadArticles = () => {
    document.addEventListener('DOMContentLoaded', async () => {
        const articlesContainer = document.getElementById('articles-container')

        try {
            if (!articlesContainer) {
                throw new Error('Articles container element not found')
            }

            const response = await fetch('/api/v1/articles')
            if (!response.ok) {
                throw new Error('Failed to fetch articles')
            }

            const responseData = await response.json()
            const articles = responseData.articles

            articles.forEach((article) => {
                const articleElement = document.createElement('div')
                articleElement.innerHTML = `
                <a href="/articles/${article._id}" class="article-link">
                    <img src="${article.imageUrl}" alt="${article.title}" />
                    <h4>${article.title}</h4>
                    <h6>Read More &rarr;</h6>
                    <p>${article.author} &#183; ${new Date(
                    article.date
                ).toLocaleDateString()}</p>
                </a>
            `
                articlesContainer.appendChild(articleElement)
            })
        } catch (error) {
            console.error('Error fetching articles:', error.message)
            // Display a user-friendly error message to the user
            if (articlesContainer) {
                articlesContainer.innerHTML =
                    '<p>Failed to fetch articles. Please try again later.</p>'
            }
        }
    })
}

export default loadArticles