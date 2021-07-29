const {
    errorMonitor
} = require('events');
const express = require('express');
const path = require('path');
const data = require('./data.json')

const app = express()
app.set('view engine', 'pug')
app.use('/static', express.static(path.join(__dirname, 'public')))



app.get('/', (req, res) => {
    const {
        projects
    } = data
    res.render('index', {
        projects
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/project/:id', (req, res) => {
    const {
        id
    } = req.params
    const project = data.projects[id]
    res.render('project', {
        project
    })

})

app.use((req, res, next) => {
    res.status(404)
    const err = new Error('404 Page was not found')
    res.render('page-not-found')
    console.error(err)
    next(err)
})

app.use((err, req, res, next) => {
    if (err) {
        if (!err.status) err.status = 500
        if (!err.message) err.message = 'Opps something went wrong'
        console.error(err)
        res.render('error', {
            error
        })
    }
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('the app is running on port', port)
})