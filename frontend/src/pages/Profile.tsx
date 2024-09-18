import { useState, useEffect, useContext } from 'react'
import { getUser, IUser } from '../services/user'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { UserContext } from '../context/userContext'

interface RouteParams {
  id: string | undefined
}

function Profile() {

  // const params = useParams<RouteParams>()
  const usercontext = useContext(UserContext)

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


  if (!usercontext) {
    return <div>loading...</div>
  }

  const { isAuthenticated, logout } = usercontext

  return (
    <div className='m-10'>
      <Header />
      {isAuthenticated ? (
        <>
          <h2 className='text-2xl'>mein profil</h2>
          <div>
            <p>Name: {userName}</p>
            <p>Email: {email}</p>
          </div>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <p>Du bist nicht eingeloggt</p>

      )}
  
    </div>
  )
}

export default Profile