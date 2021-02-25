import { getGroup } from '../../api/getGroup.js'

const groupsUl = document.createElement('ul')
groupsUl.classList = 'list-unstyled ms-3 h5'

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

export const groupsList = (user) => {
    drawGroups(user)
    return (groupsUl)
}