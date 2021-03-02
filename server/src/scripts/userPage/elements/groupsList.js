import { getGroup } from '../../api/group/getGroup.js'

const groupsUl = document.createElement('ul')
groupsUl.classList = 'list-unstyled ms-3 h5'

function drawGroups(user) {
    const p = document.createElement('p')
    if (user.groups.length === 0) {
        p.textContent = user.isOwner ? 'Вы не состоите ни в одной группе' : 'Пользователь не состоит ни в одной группе'
    } else {
        p.textContent = `Количество: ${user.groups.length}`
    }
    groupsUl.insertAdjacentElement('beforeend', p)
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