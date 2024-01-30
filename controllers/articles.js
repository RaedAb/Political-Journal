const getAllArticles = (req, res) => {
    res.send('get all articles')
}

const createArticle = (req, res) => {
    res.send('create article')
}

const getArticle = (req, res) => {
    res.send('get single article')
}

const updateArticle = (req, res) => {
    res.send('get a single article')
}

const deleteArticle = (req, res) => {
    res.send('delete article')
}

module.exports = {
    getAllArticles,
    createArticle,
    getArticle,
    updateArticle,
    deleteArticle,
}
