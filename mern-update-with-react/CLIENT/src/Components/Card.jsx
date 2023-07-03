 
import { useState } from 'react';
import "./Style.css"

function Card(props) {
  const [message , setMessage] = useState("")
  const { name, email, password, _id } = props.post;
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({
    name,
    email,
    password
  })
 
  const handleUpdateChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleUpdateSubmit = (e, id) => {
    e.preventDefault()
    fetch(`http://localhost:9000/user/${id}`, {
      method :"PUT",
      headers : {
        "Content-type" :"application/json"
      },
      body : JSON.stringify(user)
    }).then(res => res.json())
    .then(data => {
      setMessage(data.message)
      setTimeout(() => {
        
        setShow(false)
      }, 1500);
    })
  }
  return (
    <>
      <div className='card'>
        <h5>Name : {name}</h5>
        <p>Email : {email}</p>
        <p>password : {password}</p>
        <button onClick={() => setShow(!show)} className='btn btn-sm  btn-primary mb-4'>Edit</button>
   
      </div>
      { show &&
             <div className="updateForm p-3">
             <form onSubmit={(e) => handleUpdateSubmit(e, _id)}>
               <input onChange={handleUpdateChange} className='form-control' type="text" placeholder='name' name='name' value={user.name} /> <br />
               <input onChange={handleUpdateChange} className='form-control' type="text" placeholder='email' name='email' value={user.email} /> <br />
               <input onChange={handleUpdateChange} className='form-control' type="text" placeholder='password' name='password' value={user.password} /> <br />
              <div className="btnWrapper">
              <input className='btn btn-success' type="submit" value="Update" />
              <button onClick={()=> setShow(false)} className='btn btn-warning btn-sm'>Cancel</button>
              </div>
             {
               message && <h6 className='text-center text-light my-4'>{message}</h6>
             }
             </form>
           </div>
     }
    </>
  )
}

export default Card