//Получение объекта группы с полями name, description, subscribers, members, records
export const getGroup = async (id) => {
    const responce = await fetch(`/api/group/${id}`, {
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