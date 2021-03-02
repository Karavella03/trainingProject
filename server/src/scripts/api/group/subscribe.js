//Подписаться или отписаться от группы
export const subscribe = async (id) => {
    const responce = await fetch(`/api/group/subscribe/${id}`, {
        method: 'POST',
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