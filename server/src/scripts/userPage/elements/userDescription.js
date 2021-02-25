const conteiner = document.createElement('div')
conteiner.classList = 'container text-center ms-5'
conteiner.style = 'max-width: 50%;'

const fullNamePharagraph = document.createElement('p')
fullNamePharagraph.classList = 'h2 mt-3'
const descriptionPharagraph = document.createElement('p')
descriptionPharagraph.classList = 'mt-3'

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