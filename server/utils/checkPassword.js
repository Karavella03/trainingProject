const bcrypt = require('bcryptjs')

module.exports = async (passwordHash, password) => {
    return await bcrypt.compare(password, passwordHash)
}