import toggleNavigation from './modules/navbar.js'
import slideShow from './modules/carousel.js'
import search from './modules/articles.js'
import login from './modules/auth.js'
import { addArticle, deleteArticle } from './modules/admin.js';

document.addEventListener('DOMContentLoaded', () => {
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
            addArticle()
        },
    }

    const currentPageAction = pageActions[window.location.pathname];
    if (currentPageAction) {
        currentPageAction();
    }
});

