export const addArticle = async () => {
    const submitArticleForm = document.getElementById('create-article')

    submitArticleForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const title = document.querySelector('.title').value
        const author = document.querySelector('.author').value
        const imageUrl = document.querySelector('.imageURL').value
        const content = document.querySelector('.content').value

        const articleData = {
            title: title,
            author: author,
            imageUrl: imageUrl,
            content: content,
        }

        const token = getAccessToken()
        fetch(`/api/v1/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(articleData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        'Something went wrong. Article was not added.'
                    )
                }

                window.location.href = '/admin'
            })
            .catch((error) => {
                alert(error)
            })
    })
}

export const deleteArticle = () => {
    document.querySelectorAll('.delete-article').forEach((button) => {
        button.addEventListener('click', function () {
            const articleId = this.getAttribute('data-article-id')

            // Confirm if the admin wants to delete the article
            if (confirm('Are you sure you want to delete this article?')) {
                const token = getAccessToken()

                fetch(`/api/v1/articles/${articleId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                'Something went wrong. Article could not be deleted.'
                            )
                        }

                        window.location.href = '/admin'
                    })
                    .catch((error) => {
                        alert(error)
                    })
            }
        })
    })
}

export const editArticle = (articleId) => {
    const editArticleForm = document.getElementById('edit-article')

    editArticleForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const title = document.querySelector('.title').value
        const author = document.querySelector('.author').value
        const imageUrl = document.querySelector('.imageURL').value
        const content = document.querySelector('.content').value

        const articleData = {
            title: title,
            author: author,
            imageUrl: imageUrl,
            content: content,
        }
        const token = getAccessToken()
        fetch(`/api/v1/articles/${articleId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(articleData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        'Something went wrong. Article could not be edited.'
                    )
                }

                window.location.href = '/admin'
            })
            .catch((error) => {
                alert(error)
            })
    })
}

export const editAbout = () => {
    const editaboutForm = document.getElementById('edit-about')

    editaboutForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const contentID = event.currentTarget.getAttribute('data-content-id')
        const about = document.getElementById('about').value
        console.log(about)
        const data = {
            about: about,
        }
        const token = getAccessToken()

        fetch(`/api/v1/content/${contentID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        'About could not be updated.'
                    )
                }

                window.location.href = '/admin'
            })
            .catch((error) => {
                alert(error)
            })
    })
}

export const editContact = () => {
    const editContactForm = document.getElementById('edit-contact')

    editContactForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const contentID = event.currentTarget.getAttribute('data-content-id')
        const contact = document.getElementById('contact').value
        const data = {
            contact: contact,
        }
        const token = getAccessToken()

        fetch(`/api/v1/content/${contentID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Contact could not be updated.')
                }

                window.location.href = '/admin'
            })
            .catch((error) => {
                alert(error)
            })
    })
}

// Function to parse the access token from the cookie string
function getAccessToken() {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        if (cookie.startsWith('accessToken=')) {
            return cookie.substring('accessToken='.length, cookie.length)
        }
    }
    return null // AccessToken cookie not found
}
