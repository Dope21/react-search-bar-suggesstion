import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './customer.css'

function App() {

  const [users, setUsers] = useState([])
  const [text, setText] = useState('')
  const [search, setSearch] = useState([])

  useEffect(() => {
    const loadUsers = async() => {
      const response = await axios.get('https://reqres.in/api/users')
      setUsers(response.data.data)
    }
    loadUsers();
  },[])

  const onChangeHandler = (e) => {
    const input = e.target.value
    let matches = []
    
    if (input.length > 0) {
      matches = users.filter(user => {
        const regex = new RegExp(`${input}`, 'gi')
        return user.email.match(regex)
      })
    }
    console.log('matches', matches)
    setSearch(search => search = matches)
    setText(text => text = input)
  }

  const onSearchHandler = (input) => {
    setText(text => text = input)
    setSearch([])
  }

  return (

    <div className="container">
      <input 
        className='col-md-12 input'
        style={{ marginTop: 10 }}
        type="text" 
        onChange={onChangeHandler}
        value={text}
        onBlur={ () => setTimeout(() => {
          setSearch([])
        }, 100)}
      />
      {search && search.map((user, i) => 
        <div 
          key={i} 
          className="suggestion col-md-12 justify-content-md-center"
          onClick={() => onSearchHandler(user.email)}
        >
          {user.email}
        </div>
      )}
    </div>
  );
}

export default App;
