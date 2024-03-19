import toggleNavigation from './modules/navbar.js'
import slideShow from './modules/carousel.js'
import search from './modules/articles.js'
import login from './modules/auth.js'
import {
    addArticle,
    deleteArticle,
    editAbout,
    editArticle,
    editContact,
} from './modules/admin.js'

document.addEventListener('DOMContentLoaded', () => {
    // ease in effect
    document.querySelector('section').classList.add('loaded')

    const pageActions = {
        '/': () => {
            toggleNavigation()
            slideShow()
        },
        '/articles': () => {
            toggleNavigation()
            search()
        },
        '/about': () => {
            toggleNavigation()
        },
        '/contact': () => {
            toggleNavigation()
        },
        '/admin/login': () => {
            login()
        },
        '/admin': () => {
            toggleNavigation()
            slideShow()
            deleteArticle()
        },
        '/admin/create-article': () => {
            toggleNavigation()
            addArticle()
        },
        '/admin/articles': () => {
            toggleNavigation()
            search()
            deleteArticle()
        },
        '/admin/about': () => {
            toggleNavigation()
            editAbout()
        },
        '/admin/contact': () => {
            toggleNavigation()
            editContact()
        },
    }

    if (window.location.pathname.startsWith('/articles/')) {
        const articleId = window.location.pathname.split('/').pop()
        toggleNavigation()
        // Handle route for "/articles/:id"
        if (window.location.pathname.startsWith('/admin/articles/')) {
            // Additional logic for "/admin/articles/:id"
            editArticle(articleId)
        }
    } else {
        const currentPageAction = pageActions[window.location.pathname]
        if (currentPageAction) {
            currentPageAction()
        }
    }
})
