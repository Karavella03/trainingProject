//Обработка ошибок, при ошибке отправляет ответ с кодом ошибки.

module.exports = (err, res, code) => {
    console.error(err.message)
    const status = code ? code : 500
    if (status === 500 || status === 404) {
        res.status(`${status}`).send(`<h1>Error! ${status}</h1>`)
    } else if (err.status === 401) {
        res.redirect('/login')
    } else {
        res.status(status).json({ message: err.message })
    }
}