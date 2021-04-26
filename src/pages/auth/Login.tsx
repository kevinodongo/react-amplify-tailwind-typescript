import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom'


interface MyFormValues {
  email: string;
  password: string;
}

// yup user schema 
const userSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Must be more than 8 characters')
    .required('Please enter your password.'),
  email: Yup.string().email('Invalid email').required('Please enter your valid email address.'),
})

export interface IProps {
  error: string | null;
  isLoading: boolean;
  handleuserlogin: (username: string, password: string) => void;
}


// login component
const Login = ({ error, isLoading, handleuserlogin }: IProps) => {
  let history = useHistory()
  const initialValues: MyFormValues = { email: '', password: '' };

  return (
    <div className="bg-gray-100 min-h-screen flex px-4 items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={(values, actions) => {
          const username = values.email // email
          const password = values.password // password
          handleuserlogin(username, password)
          actions.setSubmitting(false)
        }}
      >
        {({ errors, touched, handleSubmit, isValid }) => (
          <Form onSubmit={handleSubmit} className="grid grid-cols-1 max-w-md w-full space-y-4 bg-white shadow-lg rounded-lg py-12 px-8 sm:px-12">
            <div id="login__page__title" className="text-2xl text-gray-700 font-bold">Sign in to your account</div>

            {/*error display of login attempt*/}
            <div>
              {error && <div id="login__attempt__error" className="bg-red-100 rounded-lg border border-red-500">
                <div className="max-w-sm mx-auto flex items-center space-x-2 py-2 px-3 sm:px-4">
                  <div>
                    <svg
                      className="h-6 w-6 mt-2 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-600 flex flex-wrap">
                     {error} {error === 'User is not confirmed.' && <div><button onClick={() => history.push('/confirm')} className="focus:outline-none text-sm font-semibold underline text-gray-600 ml-1">Confirm here</button></div>} 
                  </div>
                </div>
              </div>}
            </div>

            <div className="space-y-6">
              {/*email textfield*/}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-500">Email</label>
                <Field id="email" name="email" type="email" autoComplete="email" className="appearance-none block relative border w-full border-gray-300 py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                {errors.email && touched.email ? <div data-testid="email__error" id="email__error" className="text-red-500 font-medium text-sm">{errors.email}</div> : null}
              </div>

              {/*password textfield*/}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-500">Password</label>
                  <button id="forgot__password" onClick={() => history.push('/reset')} className="text-blue-600 focus:outline-none font-medium text-sm">Forgot password?</button>
                </div>
                <Field id="password" name="password" type="password" autoComplete="current-password" className="appearance-none block relative border w-full border-gray-300 py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                {errors.password && touched.password ? <div data-testid="password__error" id="password__error" className="text-red-500 font-medium text-sm">{errors.password}</div> : null}
              </div>

              {/*submit button*/}
              <div className="space-y-2">
                <button id="login__button" disabled={isLoading && isValid} type="submit" className={isLoading && isValid ? 'group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-300 focus:outline-none' : 'group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'}>
                  {isLoading && isValid ? <span>Signing in....</span> : <span>Sign in</span>}
                </button>
              </div>

              {/*send to signup*/}
              <div className="flex items-center justify-center">
                <button id="no__account" onClick={() => history.push('/signup')} className="focus:outline-none">Don't have an account? <span className="text-blue-600 font-semibold">Sign up</span></button>
              </div>
              {/*end*/}

            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login