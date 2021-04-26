import { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from "react-router-dom";
import { Auth } from 'aws-amplify'
// public route
import Home from "../pages/public/Home"
// authentication route
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"
import Reset from "../pages/auth/Reset"
// protected route
import Protected from '../routes/Protected'
import Layout from "../pages/private/Layout"
// 404 route
import NoMatch from "../pages/public/NoMatch"


const Routes = () => {
    let history = useHistory()
    const [isLoading, setisLoading] = useState<boolean>(true)
    const [isAuthenticated, setisAuthenticated] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<{} | null>(null)

    useEffect(() => {
        let mounted = true
        // check user authentication status
        const checkuserauthenticationstatus = async () => {
            setisLoading(true)
            await Auth.currentAuthenticatedUser().then((data) => {
                handle__success(data)
            }).catch(err => {
                handle__errors(err.message)
            })
        }
        if(mounted) checkuserauthenticationstatus()
        return () => {
            mounted = false
        }
    }, [])

    // handle login success
    const handle__success = (data: {}) => {
        setUser(data)
        setisAuthenticated(true)
        setisLoading(false)
    }

    // handle errors
    const handle__errors = (err: string | null) => {
        setError(err)
        setisLoading(false)
    }

    // submit user login attempt
    const handleuserlogin = async (username: string, password: string) => {
        setisLoading(true)
        await Auth.signIn(username, password).then((data) => {
            handle__success(data)
            history.push('/dashboard')
        }).catch(err => {
            handle__errors(err.message)
        })
    }

    // logout
    const handlelogout = async () => {
        setisLoading(true)
        setisAuthenticated(false)
        await Auth.signOut()
        history.push('/login')
        setisLoading(false)
    }
    // end

    return (
        <>
            <Switch>
                {/*home page*/}
                <Route exact path="/" component={Home}></Route>
                {/*authentication routes*/}
                <Route path="/login">
                    <Login error={error} isLoading={isLoading} handleuserlogin={handleuserlogin} />
                </Route>
                <Route exact path={["/reset", "/reset/password"]} component={Reset}></Route>
                <Route exact path={["/signup", "/confirm"]} component={Signup}></Route>
                {/*protected route*/}
                <Protected exact path="/:slug" user={user} handlelogout={handlelogout} isLoading={isLoading} isAuthenticated={isAuthenticated} component={Layout} />
                {/*404*/}
                <Route exact path="*" component={NoMatch}></Route>
            </Switch>
        </>
    )
}

export default Routes
