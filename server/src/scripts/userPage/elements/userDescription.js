const conteiner = document.createElement('div')
conteiner.classList = 'container= ms-5'
conteiner.style = 'max-width: 50%;'
conteiner.id = 'user-description'

const fullNamePharagraph = document.createElement('p')
fullNamePharagraph.classList = 'h2 mt-3 text-center'
const descriptionPharagraph = document.createElement('p')
descriptionPharagraph.classList = 'mt-30 m-auto'
descriptionPharagraph.style = 'max-width: 50%;'

function drawTextInformation(user) {
    const fullName = `${user.name} ${user.surname}`
    document.title = fullName
    fullNamePharagraph.textContent = fullName
    descriptionPharagraph.textContent = user.description
    conteiner.insertAdjacentElement('beforeend', fullNamePharagraph)
    conteiner.insertAdjacentElement('beforeend', descriptionPharagraph)
}

export const userDescription = (user) => {
    drawTextInformation(user)
    return conteiner
}