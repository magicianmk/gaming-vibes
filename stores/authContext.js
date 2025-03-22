import { createContext, useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

// create a context called AuthContext with some default values
// gives a blueprint on how the context looks 
const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false
})

// the context provider AuthContextProvider wraps around the children component in _app.js
// so that the children have access to the values passing through
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authReady, setAuthReady] = useState(false)

    useEffect(() => {
        // set up listener on login event
        netlifyIdentity.on('login', (user) => {
            setUser(user)
            // close the modal
            netlifyIdentity.close()
            console.log('login event')
        })

        // set up listener on logout event
        netlifyIdentity.on('logout', () => {
            setUser(null)
            console.log('logout event')
        })

        // set up listener on initialization event
        netlifyIdentity.on('init', (user) => {
            setUser(user)
            setAuthReady(true)
            console.log('init event')
        })

        // initalize netlify identity connection
        netlifyIdentity.init() 

        // unmounts the login and logout listeners
        // the return functions fire when the AuthContextProvider component unmounts
        // optional, but good practice 
        return () => {
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }
    }, [])

    // the login function is passed to the Navbar
    // the netlifyIdentity.open() opens up a pre-made modal
    // which has a sign up or log in form
    // the useEffect hook sets up a listener event for login
    // when login is completed, user object returned from Netlify
    // will be passed into setUser 
    // and user will be passed to children
    const login = () => {
        netlifyIdentity.open()
    }

    const logout = () => {
        netlifyIdentity.logout()
    }

    const context = { user, login, logout, authReady }

    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext