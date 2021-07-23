import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const lists = JSON.parse(localStorage.getItem('list'))
  const [name, setName] = useState('')
  const [list, setList] = useState(lists)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({
    show: false, 
    msg: "Hello", 
    type: "success"
  })

  function handleSubmite(e){
    e.preventDefault()
    if (!name) {
      //Alert
      showAlert(true, 'danger', "Iltimos Inputni to'ldiring")
    }else if(name && isEditing){
      setList(list.map((item) => {
        if (item.id === editId) {
          return {...item, title: name}
        }
        return item
      }))
      showAlert(true, "success", "List o'zgartirildi")
      setName('')
      setEditId(null)
      setIsEditing(false)
    }else{
      const newItem = {id: new Date().getTime().toString(), title: name}
      showAlert(true, 'success', "Malumot qo'shildi")
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show = false, type="", msg="") => {
    setAlert({show, type, msg})
  }

  const clearList = () =>{
    showAlert(true, 'danger', "Hamma ma'lumotlar o'chirildi")
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', "Ma'lumot o'chirildi")
    setList((list.filter((item) => item.id != id)))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    console.log(specificItem);
    setEditId(id)
    setIsEditing(true)
    setName(specificItem.title)

  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return(
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmite}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list = {list}/>}
        <h3>To Do List</h3>
        <div className='form-control'>
          <input 
            type='text' 
            placeholder='Input list...' 
            className='grocery' 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? "Изменить" : "Добавить"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
      <div className='grocery-container'>
        <List items = {list} removeItem = {removeItem} editItem = {editItem}/>
        <button onClick = {clearList} className='clear-btn'>Clear All</button>
      </div>
      )}  
    </section>
  )
}

export default App
