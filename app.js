const { errorMonitor } = require('events');
const express = require('express');
const path = require('path');
const data = require('./data.json')

const app = express()
app.set('view engine', 'pug')
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use((err, req, res, next) => {
    if (!err.status) err.status = 404
    if (!err.message) err.message = 'Opps something went wrong'
    next()
})

app.get('/', (req, res) => {
    const { projects } = data
    res.render('index', { projects })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/project/:id', (req, res) => {
    const { id } = req.params
    const project = data.projects[id]
    res.render('project', { project })

})

app.use((req, res, next) => {
    res.status(404)
    const err = new Error('404 Page was not found')
    next(err)
})




const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('the app is running on port', port)
})