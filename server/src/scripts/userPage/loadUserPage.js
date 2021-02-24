import { getUser } from '../api/getUser.js'
import { getGroup } from '../api/getGroup.js'

const fullNamePharagraph = document.querySelector('#full-name')
const descriptionPharagraph = document.querySelector('#description')
const groupsUl = document.querySelector('#groups-ul');

(async () => {
    const id = new URL(location).searchParams.get('id')
    const user = await getUser(id)
    drawTextInformation(user)
    drawGroups(user)
})()

function drawGroups(user) {
    if (user.groups.length === 0) {
        const p = document.createElement('p')
        p.textContent = user.isOwner ? 'Вы не состоите ни в одной группе' : 'Пользователь не состоит ни в одной группе'
        groupsUl.insertAdjacentElement('afterend', p)
    }
    user.groups.forEach(groupId => {
        drawGroup(groupId)    
    });
}

async function drawGroup(groupId) {
    const li = document.createElement('li')
    li.classList = 'mb-1'
    const a = document.createElement('a')
    const group = await getGroup(groupId)
    a.textContent = group.name
    a.href = `/group?id=${group._id}`
    a.style = 'text-decoration: none; color: black;'
    li.appendChild(a)
    groupsUl.appendChild(li)
}

function drawTextInformation(user) {
    const fullName = `${user.name} ${user.surname}`
    document.title = fullName
    fullNamePharagraph.textContent = fullName
    descriptionPharagraph.textContent = user.description
}