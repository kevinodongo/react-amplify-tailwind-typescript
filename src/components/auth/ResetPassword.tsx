import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react'

export interface IProps {
    error: string | null;
    isLoading: boolean;
    handleresetpassword: (username: string, code: string, new_password: string) => void
}

interface MyFormValues {
    email: string;
    password: string;
    code: string
}

// yup user schema 
const userSchema = Yup.object({
    password: Yup.string()
        .min(8, 'Must be more than 8 characters')
        .required('Please enter your password.')
        .matches(/(?=.*?[0-9])(?=.*?[a-z])/, 'Password at least 8 characters including a number and a lowercase letter'),
    code: Yup.string()
        .required('Please enter the password reset code.'),
    email: Yup.string().email('Invalid email').required('Please enter your valid email address.'),
})



const Resetpassword = ({ handleresetpassword, error, isLoading }: IProps) => {
    const [userEmail, setUserEmail] = useState<string>('') 
    const initialValues: MyFormValues = {
        email: userEmail,
        code: '',
        password: ''
    };

    // side effects
    useEffect(() => {
        const value = localStorage.getItem("@user__email")
        if(value){
           setUserEmail(value)
        }
    }, [])

    return (
        <div className="bg-gray-100 min-h-screen flex px-4 items-center justify-center">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={userSchema}
                onSubmit={(values, actions) => {
                    const username = values.email // email
                    const new_password = values.password // password
                    const code = values.code
                    handleresetpassword(username, new_password, code)
                    actions.setSubmitting(false)
                }}
            >
                {({ errors, touched, handleSubmit, isValid}) => (
                    <Form onSubmit={handleSubmit} className="grid grid-cols-1 max-w-md w-full space-y-4 bg-white  shadow-lg rounded-lg py-12 px-8 sm:px-12">
                        <div id="reset__title" className="text-2xl text-gray-700 font-semibold">Reset your password</div>

                        <div>
                            {!error && <div id="reset__alert" data-testid="reset__alert" className="bg-green-100 rounded-lg border border-green-500">
                                <div className="max-w-sm mx-auto flex space-x-2 py-2 px-3 sm:px-4">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-500 h-5 w-5 mt-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="text-sm text-gray-600 flex flex-wrap space-y-1">
                                       <div>A password reset code was sent to your email address. Please use the code to reset your password.</div>
                                       <div>If you do not receive the password reset email, please check your spam folder or other filtering tools.</div>
                                    </div>
                                </div>
                            </div>}
                        </div>


                        {/*error display of login attempt*/}
                        <div>
                            {error && <div id="reset__alert__attempt" className="bg-red-100 rounded-lg border border-red-500">
                                <div className="max-w-sm mx-auto flex space-x-2 py-2 px-3 sm:px-4">
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
                            {/*email textfield*/}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-500">Email</label>
                                <Field id="email" name="email" type="email" autoComplete="email" className="appearance-none block relative border w-full border-gray-300 py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                {errors.email && touched.email ? <div data-testid="email__error" id="email__error" className="text-red-500 font-medium text-sm">{errors.email}</div> : null}
                            </div>

                            {/*code textfield*/}
                            <div className="space-y-2">
                                <label htmlFor="code" className="text-sm font-medium text-gray-500">Code</label>
                                <Field id="code" name="code" type="text" autoComplete="one-time-code" className="appearance-none block relative border w-full border-gray-300 py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                {errors.code && touched.code ? <div data-testid="code__error" id="code__error" className="text-red-500 font-medium text-sm">{errors.code}</div> : null}
                            </div>

                            {/*new password textfield*/}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-gray-500">Password</label>
                                <Field id="password" name="password" type="password" className="appearance-none block relative border w-full border-gray-300 py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                {errors.password && touched.password ? <div data-testid="password__error" id="password__error" className="text-red-500 font-medium text-sm">{errors.password}</div> : null}
                            </div>

                            {/*submit button*/}
                            <div className="space-y-2">
                                <button id="reset__button" disabled={isLoading && isValid} type="submit" className={isLoading ? 'group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-300 focus:outline-none' : 'group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'}>
                                    {isLoading && isValid ? <span>Reseting....</span> : <span>Reset password</span>}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Resetpassword