//__tests__/unit/resetpassword.test.tsx
import { render, act, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResetPassword, { IProps } from '../../components/auth/ResetPassword'
var faker = require('faker');

afterEach(() => cleanup())

function renderResetPasswordComponent(props: Partial<IProps> = {}) {
    const defaultProps: IProps = {
        error: null,
        isLoading: false,
        handleresetpassword() {
            return
        },
    };
    return render(<ResetPassword {...defaultProps} {...props} />);
}


test("reset alert available on component mount", () => {
    const { getByTestId } = renderResetPasswordComponent()
    expect(getByTestId("reset__alert")).toBeInTheDocument()
})

test('calls handleresetpassword with the email when reset password is clicked', async () => {
    const promise = Promise.resolve()
    const handleresetpassword = jest.fn(() => promise)
    const { getByLabelText, getByRole } = renderResetPasswordComponent({ handleresetpassword })
    // update email code and password fields and submit button
    var randomEmail = faker.internet.email();  
    var randomPassword = faker.internet.password();  
    var randomCode = '9847637'
    userEvent.type(getByLabelText(/email/i), randomEmail)
    userEvent.type(getByLabelText(/code/i), randomCode) // random code
    userEvent.type(getByLabelText(/password/i), randomPassword)
    userEvent.click(getByRole('button', { name: /Reset password/i }))
    // assertions
    await waitFor(() => {
        expect(handleresetpassword).toHaveBeenCalledTimes(1)
        expect(handleresetpassword).toHaveBeenCalledWith(randomEmail, randomPassword, randomCode)
        expect(getByRole('button', { name: /Reset password/i })).not.toBeDisabled()
    }) 
    await act(() => promise)    
})


test('shows an error messages when reset password is clicked and no email provided', async () => {
    const promise = Promise.resolve()
    const handleresetpassword = jest.fn(() => promise)
    const { getByTestId, getByLabelText, getByRole } = renderResetPasswordComponent({ handleresetpassword })
    // update code and password fields and submit button  
    var randomPassword = faker.internet.password();  
    var randomCode = '9847637'
    userEvent.type(getByLabelText(/code/i), randomCode) // random code
    userEvent.type(getByLabelText(/password/i), randomPassword)
    userEvent.click(getByRole('button', { name: /Reset password/i }))
    // assertions
    await waitFor(() => {
        expect(handleresetpassword).not.toHaveBeenCalled()
        expect(getByTestId('email__error')).toHaveTextContent(/Please enter your valid email address/i)
    }) 
    await act(() => promise)    
})

test('shows an error messages when reset password is clicked and no password provided', async () => {
    const promise = Promise.resolve()
    const handleresetpassword = jest.fn(() => promise)
    const { getByTestId, getByLabelText, getByRole } = renderResetPasswordComponent({ handleresetpassword })
    // update email and password fields and submit button  
    var randomEmail = faker.internet.email();  
    var randomCode = '9847637'
    userEvent.type(getByLabelText(/code/i), randomCode) // random code
    userEvent.type(getByLabelText(/email/i), randomEmail)
    userEvent.click(getByRole('button', { name: /Reset password/i }))
    // assertions
    await waitFor(() => {
        expect(handleresetpassword).not.toHaveBeenCalled()
        expect(getByTestId('password__error')).toHaveTextContent(/Please enter your password/i)
    }) 
    await act(() => promise)    
})

test('shows an error messages when reset password is clicked and no code provided', async () => {
    const promise = Promise.resolve()
    const handleresetpassword = jest.fn(() => promise)
    const { getByTestId, getByLabelText, getByRole } = renderResetPasswordComponent({ handleresetpassword })
    // update email and password fields and submit button  
    var randomPassword = faker.internet.password();  
    var randomEmail = faker.internet.email();
    userEvent.type(getByLabelText(/email/i), randomEmail) // random code
    userEvent.type(getByLabelText(/password/i), randomPassword)
    userEvent.click(getByRole('button', { name: /Reset password/i }))
    // assertions
    await waitFor(() => {
        expect(handleresetpassword).not.toHaveBeenCalled()
        expect(getByTestId('code__error')).toHaveTextContent(/Please enter the password reset code/i)
    }) 
    await act(() => promise)    
})