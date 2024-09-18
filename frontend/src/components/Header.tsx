import Date from './Date'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { UserContextType } from '../@types/user'

function Header() {

    const navigate = useNavigate()
    // useContext = null? wieso?
    // const { isAuthenticated } = useContext(UserContext) as UserContextType


  return (
    <div className='flex justify-between mb-10 items-center'>
        <Date />
        <div>

        {/* {isAuthenticated ? <button>login</button> : <button>logout</button>} */}

        <button
                type="submit"
                onClick={()=>navigate('/login')}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
                {/* wenn user eingeloggt dann btn weg oder logout */}
                
              </button>
        </div>
    </div>
  )
}

export default Header