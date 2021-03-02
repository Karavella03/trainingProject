import { getUser } from '../../api/user/getUser.js'

const membersUl = document.createElement('ul')
membersUl.classList = 'list-unstyled ms-3 h5'

function drawMembers(group) {
    const p = document.createElement('p')
    p.textContent = `Количество: ${group.members.length}`
    membersUl.insertAdjacentElement('beforeend', p)

    group.members.forEach(userId => {
        drawMember(userId)
    });
}

async function drawMember(userId) {
    const li = document.createElement('li')
    li.classList = 'mb-1'
    const a = document.createElement('a')
    const user = await getUser(userId)
    a.textContent = `${user.name} ${user.surname}`
    a.href = `/user?id=${user._id}`
    a.style = 'text-decoration: none; color: black;'
    li.appendChild(a)
    membersUl.appendChild(li)
}

export const membersList = (group) => {
    drawMembers(group)
    return (membersUl)
}