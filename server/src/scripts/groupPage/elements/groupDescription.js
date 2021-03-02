const conteiner = document.createElement('div')
conteiner.classList = 'container= ms-5'
conteiner.style = 'width: 50%;'
conteiner.id = 'group-description'

const namePharagraph = document.createElement('p')
namePharagraph.classList = 'h2 mt-3 text-center'
const descriptionPharagraph = document.createElement('p')
descriptionPharagraph.classList = 'mt-30 m-auto'
descriptionPharagraph.style = 'max-width: 50%;'

function drawTextInformation(group) {
    document.title = group.name
    namePharagraph.textContent = group.name
    descriptionPharagraph.textContent = group.description
    conteiner.insertAdjacentElement('beforeend', namePharagraph)
    conteiner.insertAdjacentElement('beforeend', descriptionPharagraph)
}

export const groupDescription = (group, user) => {
    drawTextInformation(group)
    return conteiner
}