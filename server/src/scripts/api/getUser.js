//Получение объекта пользователя с полями name, surname, groups, records
//isOwner, isOwner true при запросе клиентом своего пользователя
export const getUser = async (id) => {
    const responce = await fetch(`/api/user${id ? '/' + id : ''}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}` 
        }
    })
    const result = await responce.json()
    if(responce.status === 401){
        location.href = '/login'
    }
    return result
}