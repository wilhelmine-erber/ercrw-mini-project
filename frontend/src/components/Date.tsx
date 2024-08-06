import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


function DateTime() {

const [currentDateTime, setCurrentDateTime] = useState(new Date())
const navigate = useNavigate()

useEffect(()=>{
    
        setCurrentDateTime(new Date())
    
}, [])  

const options = {
    weekday: 'long',
    month: 'long',
    day:'numeric'
}
const formattedDate = currentDateTime.toLocaleDateString('de-DE', options)

const formattedYear = currentDateTime.getFullYear()

  return (      
    <div>
        <h1 
        className='text-3xl font-bold'
        onClick={()=>navigate('/')}>{formattedYear}</h1>
        <p className='font-thin'>{formattedDate}</p>
    </div>
  )
}

export default DateTime