module.exports = (err, res, code) => {
    console.error(err)
    const status = code ? code : 500
    res.status(`${status}`).send(`Error! ${status}`)
}