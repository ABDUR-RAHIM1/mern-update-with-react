import React from 'react'

function updateForm() {

    const handleUpdateChange =(e) =>{
        console.log(e.target.vlaue)
   }
   
   const handleUpdateSubmit= (e)=>{
     e.preventDefault()
   }
  return (
    <div>
        <div className="updateForm">
<form onSubmit={handleUpdateSubmit}>
    <input onChange={handleUpdateChange}  type="text" className='form-control my-2' name='name' placeholder='name' />
        <input onChange={handleUpdateChange} type="text" className='form-control my-2' name='email' placeholder='email' />
        <input onChange={handleUpdateChange} type="password" className='form-control my-2' name='password' placeholder='password' />
        <input type="submit" className='form-control' value="update now" />
    </form>
</div>

    </div>
  )
}

export default updateForm