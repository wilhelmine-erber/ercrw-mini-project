import {FormEvent, useState} from 'react'
import Header from '../components/Header'
import {IUser, getUsers, createUser} from '../services/user'
import { useNavigate } from 'react-router-dom'



function Login() {

  const navigate = useNavigate()

  const [showRegister, setShowRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [users, setUsers] = useState<IUser[]>([])


  const handleLogin = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await getUsers()
      setUsers(result)

      // auslagern ins backend?
      // Passwort hashen
      // überprüfen ob user existiert

      // // Passwort hashen
      // const sha256 = createHash('sha256');
      // const hashedPassword = sha256.update(password).digest('hex');

      // // Überprüfen, ob der Benutzer existiert
      // const user = result.find(
      //   (user) => user.email === email && user.password === hashedPassword
      // );

      // if (!user) {
      //   console.log('Benutzer nicht gefunden oder Passwort falsch');
      //   return;
      // }


      console.log(users)
      navigate('/profile')
      
    } catch (error) {
      console.error('Fehler beim Einloggen', error)
    }
  }

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // hier user in db speichern

     createUser({userName: userName, email: email, password: password}).then((result) => {
          if(result){
            console.log('user registriert')
            navigate('/profile')
          }
      })
    }



  if(showRegister){
  return (
    <main className='m-10'>
    <Header />
    
    <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="text-center text-3xl  tracking-tight text-gray-900">
            Einloggen in Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email Adresse
              </label>
              <div className="mt-2">
                <input
                onChange={(e)=>setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Passwort
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Passwort vergessen?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                onChange={(e)=>setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                einloggen
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Noch kein Account?{' '}
            <a onClick={()=>setShowRegister(false)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
              hier registrieren
            </a>
          </p>
        </div>
      </div>
      </main>
  )
}
return(
  <main className='m-10'>
    <Header />
  <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="text-center text-3xl  tracking-tight text-gray-900">
            Erstelle einen neuen Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegister} className="space-y-6">
          <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e)=>setUserName(e.target.value)}
                  id="username"
                  name="username"
                  type="username"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email Adresse
              </label>
              <div className="mt-2">
                <input
                  onChange={(e)=>setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Passwort
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  onChange={(e)=>setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={()=>console.log(name, email, password)}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               registrieren
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
           Schon registriert?{' '}
            <a onClick={()=>setShowRegister(true)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
              zum Einloggen
            </a>
          </p>
        </div>
      </div>
      </main>
)
}

export default Login