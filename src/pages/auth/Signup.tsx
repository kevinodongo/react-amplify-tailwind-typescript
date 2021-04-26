import { useState } from 'react'
import SignupPage from '../../components/auth/SignupPage'
import ConfirmPage from "../../components/auth/ConfirmPage";
import { Auth } from 'aws-amplify'
import { Route, Switch, useHistory } from 'react-router-dom';


const Login = () => {
  const history = useHistory()
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // handle saving to local storage
  const handle__localstorage = (value: any) => {
    localStorage.setItem('@user__email', value)
  }

  // submit user registration
  const handleuserregistration = async (values: {
    username: string, email: string, country: string, password: string, email__preference: boolean
  }) => {
    setisLoading(true)

    /**
     * NOTE
     * =======================
     * - Amplify when you select email as default for authentication
     *   then your username will be an email address provided by the 
     *   user.
    */
    const username = values.email // !username
    const email = values.email // email
    const password = values.password // password

    await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    })
      .then(() => {
        handlecreateuserrecord(values)
      })
      .catch(err => {
        setisLoading(false)
        setError(err.message)
      });
  }

  // confirm user email
  const handleconfirmuseremail = async (email: string, code: string) => {
    setisLoading(true)
    await Auth.confirmSignUp(email, code).then(() => {
      setisLoading(false)
      history.push("/login"); // send to login
    })
      .catch(err => {
        setisLoading(false)
        setError(err.message)
      });
  }

  // resend code
  const handleresendconfirmationcode = async (email: string) => {
    setisLoading(true)
    await Auth.resendSignUp(email).then(() => {
      setisLoading(false)
    }).catch(err => {
      setisLoading(false)
      setError(err.message)
    })
  }

  // create user record in database
  const handlecreateuserrecord = (values: {
    username: string, email: string, country: string, password: string, email__preference: boolean
  }) => {
    // update user record in db
    // on success update registed and isloading
    handle__localstorage(values.email)
    history.push('/confirm')
    setisLoading(false)
  }
  // end

  return (
    <>
      <Switch>
        <Route path="/signup" exact>
          <SignupPage error={error} isLoading={isLoading} handleuserregistration={handleuserregistration} />
        </Route>
        <Route path="/confirm" exact>
          <ConfirmPage error={error} isLoading={isLoading} handleresendconfirmationcode={handleresendconfirmationcode} handleconfirmuseremail={handleconfirmuseremail} />
        </Route>
      </Switch>
    </>
  )
}

export default Login