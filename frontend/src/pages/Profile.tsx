import {useState, useEffect} from 'react'
import {getUser, IUser} from '../services/user'
import { useParams } from 'react-router-dom'


function Profile() {

  const params = useParams()

  const [user, setUser] = useState<IUser>()
  const [userName, setUserName] = useState(user?.userName ?? '')
  const [email, setEmail] = useState(user?.email ?? '')

useEffect(() => {
    getUser(params.id).then((result) => {
        console.log(result)
        setUser(result)
        setUserName(result.userName)
        setEmail(result.email)
    })
}, [])



  return (
    <div>
        <h2 className='text-2xl'>mein profil</h2>
        <div>
            <p>Name: {userName}</p>
            <p>Email: {email}</p>
        </div>
    </div>
  )
}

export default Profile