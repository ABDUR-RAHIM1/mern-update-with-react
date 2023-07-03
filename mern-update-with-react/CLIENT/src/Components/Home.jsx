import React, { useEffect, useState } from 'react'
import Card from './Card'
import "./Style.css"  
function Home() {
    const [message , setMessage] = useState("")
    const [user , setUser] = useState({
        name :"",
        email :"",
        password : ""
     })
     const [post , setPost] = useState([])
     const handleChange =(e)=>{
          setUser({...user , [e.target.name]: e.target.value})
     }
 const handleSubmit =(e)=>{
      e.preventDefault()
      fetch("http://localhost:9000/user", {
          method :"POST",
          headers : {
              "Content-Type" :"application/json"
          },
          body : JSON.stringify(user)
      }).then(res => res.json())
      .then(data => {
        setMessage(data.message)
      })
 }
 // fetch user 
 useEffect(()=>{
      fetch("http://localhost:9000/user")
      .then(res => res.json())
      .then(data => setPost(data.post))
 } ,[]) 
 
  return (
    <>
    <div className='home'>
    <form onSubmit={handleSubmit}>
    <input onChange={handleChange}  type="text" className='form-control my-2' name='name' placeholder='name' />
        <input onChange={handleChange} required type="text" className='form-control my-2' name='email' placeholder='email' />
        <input onChange={handleChange} required type="password" className='form-control my-2' name='password' placeholder='password' />
        <input onChange={handleChange} required type="submit" className='form-control' />
    </form>
       {
           message && <h6 className='text-center my-4 text-light'>{message}</h6>
       }
    </div>
    
    {
        post.map(post => <Card
             post={post} 
             />)
    } 
   </>
  )
}

export default Home