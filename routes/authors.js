const express =require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')

//All Authors Route
router.get('/', async (req,res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors, 
            searchOption: req.query 
        })
    } catch  {
        res.redirect('/')
    }
})

//New Author Route
router.get('/new', async (req,res) => {
    res.render('authors/new', { author: new Author() })
})

//Create Authors Route
router.post('/', async (req,res) => {
    const author = new Author({
        name: req.body.name
    })
        author.save((err,newAuthor) => {
        if(err) {
            res.render('authors/new', {
                author: author, 
                errorMessage:'Error creating Auhtor'
            })
        } else {
            // res.redirect(`authors/${newAuthor.id}`)
            res.redirect(`authors`)
        }
    })
})

module.exports = router