//Получение объекта пользователя с полями name, surname, groups, records
//isOwner, isOwner true при запросе клиентом своего пользователя
export const getUser = async (id) => {
    const responce = await fetch(`/api/user${id ? '/' + id : ''}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`
        }
    })
    if (responce.status === 404) {
        location.href = '/user'
    } else if (responce.status === 401) {
        location.href = '/login'
    }
    const result = await responce.json()
    return result
}