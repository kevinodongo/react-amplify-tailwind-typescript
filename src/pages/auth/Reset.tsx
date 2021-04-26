import { useState } from 'react'
import SendCode from '../../components/auth/SendCode'
import ResetPassword from "../../components/auth/ResetPassword";
import { Auth } from "aws-amplify"
import { Route, Switch, useHistory } from 'react-router-dom';

function Reset() {
  const history = useHistory()
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // handle saving to local storage
  const handle__localstorage = (value: any) => {
    localStorage.setItem('@user__email', value)
  }

  // handle resend code
  const handleresendcode = async (email: string) => {
    setisLoading(true)
    await Auth.forgotPassword(email).then(() => {
      handle__localstorage(email)
      history.push('/reset/password')
      setisLoading(false)
    }).catch(err => {
      setisLoading(false)
      setError(err.message)
    });
  }

  // handle reset password
  const handleresetpassword = async (username: string, code: string, new_password: string) => {
    setisLoading(true)
    await Auth.forgotPasswordSubmit(username, code, new_password)
      .then(() => {
        history.push("/login"); // send to login
        setisLoading(false)
      })
      .catch(err => {
        setisLoading(false)
        setError(err.message)
      });
  }

  return (
    <>
      <Switch>
        <Route path="/reset" exact>
          <SendCode error={error} isLoading={isLoading} handleresendcode={handleresendcode} />
        </Route>
        <Route path="/reset/password" exact>
          <ResetPassword error={error} isLoading={isLoading} handleresetpassword={handleresetpassword} />
        </Route>
      </Switch>
    </>
  )
}

export default Reset
