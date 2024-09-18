import Date from './Date'
import { useNavigate } from 'react-router-dom'

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
                className="btn btn-primary"
              >
                Sign in
                {/* wenn user eingeloggt dann btn weg oder logout */}
                
              </button>
        </div>
    </div>
  )
}

export default Header