import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react'


export interface IProps {
    error: string | null;
    isLoading: boolean;
    handleconfirmuseremail: (email: string, code: string) => void;
    handleresendconfirmationcode: (email: string) => void
}

interface MyFormValues {
    email: string;
    code: string;
}

// yup user schema 
const userSchema = Yup.object({
    code: Yup.string().required('Please enter a valid code we sent you.'),
    email: Yup.string().email('Invalid email').required('Please enter your valid email address.'),
})


const ConfirmPage = ({ error, isLoading, handleresendconfirmationcode, handleconfirmuseremail }: IProps) => {
    const [userEmail, setUserEmail] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)
    const initialValues: MyFormValues = { email: userEmail, code: '' };

    // side effects
    useEffect(() => {
        const value = localStorage.getItem("@user__email")
        if (value) {
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
                    const email = values.email // email
                    const code = values.code // code
                    handleconfirmuseremail(email, code)
                    actions.setSubmitting(false)
                }}
            >
                {({ errors, touched, handleSubmit, isValid }) => (
                    <Form onSubmit={handleSubmit} className="grid grid-cols-1 max-w-md w-full space-y-4 bg-white  shadow-lg rounded-lg py-12 px-8 sm:px-12">
                        <div className="space-y-3 text-md">
                            <div id="confirm__page__title" className="text-2xl font-medium">Verify email address</div>
                            <p>To help keep our company <span className="font-bold">the most trusted place</span> we need you to verify your email</p>
                            <p><span className="font-bold">Verifications only takes a few minutes</span> help secure your account & payments</p>
                            <p>Please check on the <span className="font-bold">email you signed up with</span> and retrive the code we have sent to you. This will be used to verify your email.</p>
                        </div>

                        {/*error display of ConfirmPage attempt*/}
                        <div>
                            {error && <div id="confirm__attempt__error" className="bg-red-100 rounded-lg border border-red-500">
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
                            {/*email textfield*/}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-500">Email</label>
                                <Field id="email" name="email" type="email" autoComplete="email" className="appearance-none block relative border w-full border-gray-300 py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                {errors.email && touched.email ? <div data-testid="email__error" id="email__error" className="text-red-500 font-medium text-sm">{errors.email}</div> : null}
                            </div>

                            {/*code textfield*/}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between relative">
                                    <label htmlFor="code" className="text-sm font-medium text-gray-500">Code</label>

                                    <div className="flex w-44 justify-end space-x-1 relative">
                                        {show && !error && <div>
                                            <div className="bg-gray-700 opacity-0 hover:opacity-100 rounded-md px-2 py-2 w-full right-0 bottom-6 absolute">
                                               <div className="text-xs text-gray-300 font-medium">Please check your email we have sent reset code</div>
                                            </div>                                      
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 text-green-600 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>}
                                        <button id="resend__code" type="button" onClick={() => { handleresendconfirmationcode(userEmail); setTimeout(() => {setShow(true)}, 1000);}} className="text-blue-600 focus:outline-none font-medium text-sm">Resend code?</button>
                                    </div>
                                </div>
                                <Field id="code" name="code" type="text" autoComplete="one-time-code" className="appearance-none block relative border w-full border-gray-300 py-2 px-4 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                {errors.code && touched.code ? <div data-testid="code__error" id="code__error" className="text-red-500 font-medium text-sm">{errors.code}</div> : null}
                            </div>

                            {/*submit button*/}
                            <div className="space-y-2">
                                <button id="confirm__button" disabled={isLoading && isValid} type="submit" className={isLoading && isValid ? 'group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-300 focus:outline-none' : 'group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'}>
                                    {isLoading && isValid ? <span>Confirming....</span> : <span>Confirm account</span>}
                                </button>
                            </div>

                            {/*end*/}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ConfirmPage