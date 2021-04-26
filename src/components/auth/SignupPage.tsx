import { useState, useEffect } from 'react'
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom'


export interface IProps {
  error: string | null;
  isLoading: boolean;
  handleuserregistration: (values: {
    username: string, email: string, country: string, password: string, email__preference: boolean
    }) => void
}

interface MyFormValues {
  username: string;
  email: string;
  password: string;
  country: string;
  email__preference: boolean
}

// yup user schema 
const userSchema = Yup.object({
  username: Yup.string().required('Please provide a username or your full names.'),
  password: Yup.string()
    .min(8, 'Must be more than 8 characters')
    .required('Please enter your password.')
    .matches(/(?=.*?[0-9])(?=.*?[a-z])/, 'Password at least 8 characters including a number and a lowercase letter'),
  email: Yup.string().email('Invalid email').required('Please enter your valid email address.'),
})


const SignupPage = ({ handleuserregistration, error, isLoading }: IProps) => {
  const history = useHistory()
  const initialValues: MyFormValues = { username: '', email: '', password: '', country: 'United States of America', email__preference: true  };
  const [countries, setCountries] = useState<any[]>([])

  // side effect
  useEffect(() => {
    let mounted = true
    if(mounted){
      getcountries()
    }
    return () => {
      mounted = false
    }
  }, [])

  // get countries
  async function getcountries() {
    await fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data)
      });
  }
  return (
    <div className="bg-gray-100 min-h-screen flex px-4 items-center justify-center">
      <div className="py-12">
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          onSubmit={(values, actions) => {
            handleuserregistration(values)
            actions.setSubmitting(false)
          }}
        >
          {({ errors, touched, handleSubmit, isValid }) => (
            <div className="max-w-lg space-y-4">
              <Form onSubmit={handleSubmit} className="grid grid-cols-1 w-full space-y-4 bg-white  shadow-lg rounded-lg py-12 px-8 sm:px-12">
                <div id="signup__page__title" className="text-2xl md:text-3xl text-gray-700 font-semibold text-center pb-3">Create an account</div>

                {/*error display of signup attempt*/}
                <div>
                  {error && <div id="signup__attempt__error" className="bg-red-100 rounded-lg border border-red-500">
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
                        {error}
                      </div>
                    </div>
                  </div>}
                </div>

                <div className="space-y-6">
                  {/*username textfield*/}
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium text-gray-500">Username <span className="text-red-500">*</span></label>
                    <Field id="username" name="username" type="text" autoComplete="username" className="appearance-none block relative border w-full border-gray-300 py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    {errors.username && touched.username ? <div data-testid="username__error" id="username__error" className="text-red-500 font-medium text-sm">{errors.username}</div> : null}
                  </div>

                  {/*email textfield*/}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-500">Email <span className="text-red-500">*</span></label>
                    <Field id="email" name="email" type="email" autoComplete="email" className="appearance-none block relative border w-full border-gray-300 py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    {errors.email && touched.email ? <div data-testid="email__error" id="email__error" className="text-red-500 font-medium text-sm">{errors.email}</div> : null}
                  </div>

                  {/*country textfield*/}
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-500">
                      Country / Region
                    </label>
                    <Field
                      as="select"
                      id="country"
                      name="country"
                      data-testid="select__country"
                      autoComplete="country"
                      className="mt-1 block font-semibold text-gray-600 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {
                        countries.map((item, index) => (
                          <option key={index} value={item.name}>
                            {item.name}</option>
                        ))
                      }
                    </Field>
                  </div>


                  {/*password textfield*/}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-500">Password <span className="text-red-500">*</span></label>
                    <Field id="password" name="password" type="password" autoComplete="new-password" className="appearance-none block relative border w-full border-gray-300 py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    {errors.password && touched.password ? <div data-testid="password__error" id="password__error" className="text-red-500 font-medium text-sm">{errors.password}</div> : null}
                    <p className="text-sm text-gray-500">Make sure it's at least 8 characters including a number and a lowercase letter.</p>
                  </div>

                  {/*send promotion textfield*/}
                  <div>
                    <div className="flex items-center h-5">
                      <label className="text-sm font-medium text-gray-500" htmlFor="email__preference">Email preferences</label>
                    </div>
                    <div className="text-sm flex items-center">
                      <Field id="preference" name="email__preference" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
                      </Field>
                      <p className="text-gray-500 ml-2">Send me occasional product updates, announcements, and offers.</p>
                    </div>
                  </div>

                  {/*submit button*/}
                  <div className="space-y-2">
                    <button id="signup__button" disabled={isLoading && isValid} type="submit" className={isLoading && isValid ? 'group relative w-full flex justify-center py-3 px-4 border border-transparent font-medium rounded-md text-white bg-blue-300 focus:outline-none' : 'group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'}>
                      {isLoading && isValid ? <span>Creating....</span> : <span>Create an account</span>}
                    </button>
                  </div>

                  {/*send to login*/}
                  <div className="flex items-center justify-center">
                     <button id="have__account" onClick={() => history.push('/login')} className="focus:outline-none">Have an account? <span className="text-blue-600 font-semibold">Sign in</span></button>
                  </div>
                  {/*end*/}
                </div>
              </Form>
              <p className="text-xs text-gray-600">By creating an account, you agree to the <a href="http://" className="text-blue-500 font-medium">Terms of Service</a>. For more information about our privacy practices, see our <a href="http://" className="font-medium text-blue-500">Privacy Statement</a>. We'll occasionally send you account-related emails.</p>
            </div>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SignupPage