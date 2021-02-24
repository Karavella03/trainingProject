//Обработка ошибок, при ошибке отправляет ответ с кодом ошибки.

module.exports = (err, res, code) => {
    console.error(err.message)
    const status = code ? code : 500
    res.status(`${status}`).send(`<h1>Error! ${status}</h1>`)
}