import Date from './Date'
import { useNavigate } from 'react-router-dom'

function Header() {

    const navigate = useNavigate()

  return (
    <div className='flex justify-between mb-5'>
        <Date />
        <div>
        <button
                type="submit"
                onClick={()=>navigate('/login')}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
        </div>
    </div>
  )
}

export default Header