import {useState, useEffect} from 'react'
import {getUser, IUser} from '../services/user'

interface Props extends IUser {}

function Profile({_id, userName, email, password}:Props) {

    

// daten von user aus services/ user -> von getUser

  return (
    <div>
        <h2>mein profil</h2>
        <div>
            {userName}
            {email}
        </div>
    </div>
  )
}

export default Profile