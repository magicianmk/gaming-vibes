import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import AuthContext from '../stores/authContext'

// to use the context, use useContext and AuthContext
// and access the values passed from the provider
// as the values update, it will also be updated in the children
export default function Navbar() {
  const { user, login, logout, authReady } = useContext(AuthContext)
  console.log(user)

  return (
    <div className="container">
      <nav>
        <Image src="/rupee.png" width={50} height={48} alt='rupee' />
        <h1>Gaming Vibes</h1>
        {authReady && (
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/guides">Guides</Link></li>
            {!user && <li onClick={login} className='btn'>Login/Signup</li>}
            {user && <li>Hello, {user.email}</li>}
            {user && <li onClick={logout} className='btn'>Logout</li>}
          </ul>
        )}
      </nav>
      <div className="banner">
        <Image src="/banner.png" width={966} height={276} alt='banner' />
      </div>
    </div>
  )
}
