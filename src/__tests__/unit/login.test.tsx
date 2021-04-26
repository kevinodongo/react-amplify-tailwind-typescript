//__tests__/unit/login.test.tsx
import { render, act, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login, { IProps } from '../../pages/auth/Login'
var faker = require('faker');

afterEach(() => cleanup())

function renderLoginComponent(props: Partial<IProps> = {}) {
    const defaultProps: IProps = {
        error: null,
        isLoading: false,
        handleuserlogin() {
            return
        },
    };
    return render(<Login {...defaultProps} {...props} />);
}


test('calls handleuserloging with the email and password when sign in is clicked', async () => {
    const promise = Promise.resolve()
    const handleuserlogin = jest.fn(() => promise)
    const { getByLabelText, getByRole } = renderLoginComponent({ handleuserlogin })
    // update email field and password field and handle button
    var randomEmail = faker.internet.email();
    var randomPassword = faker.internet.password();    
    userEvent.type(getByLabelText(/email/i), randomEmail)
    userEvent.type(getByLabelText(/password/i), randomPassword)
    userEvent.click(getByRole('button', { name: /Sign in/i }))
    // assertions
    await waitFor(() => {
        expect(handleuserlogin).toHaveBeenCalledTimes(1)
        expect(handleuserlogin).toHaveBeenCalledWith(randomEmail, randomPassword)
        expect(getByRole('button', { name: /Sign in/i })).not.toBeDisabled()
    }) 
    await act(() => promise)    
})


test('shows an error messages when sign in is clicked and no email and password are provided', async () => {
    const promise = Promise.resolve()
    const handleuserlogin = jest.fn(() => promise)
    const { getByRole, getByTestId } = renderLoginComponent({ handleuserlogin })
    // no email and password provided   
    userEvent.click(getByRole('button', { name: /Sign in/i }))
    // assertions
    await waitFor(() => {
        expect(handleuserlogin).not.toHaveBeenCalled()
        expect(getByTestId('email__error')).toHaveTextContent(/Please enter your valid email address/i)
        expect(getByTestId('password__error')).toHaveTextContent(/Please enter your password/i)
    }) 
    await act(() => promise)    
})

test('shows an error messages when sign in is clicked and no password is provided', async () => {
    const promise = Promise.resolve()
    const handleuserlogin = jest.fn(() => promise)
    const { getByRole, getByLabelText, getByTestId } = renderLoginComponent({ handleuserlogin })
    // update email field and submit button    
    var randomEmail = faker.internet.email();   
    userEvent.type(getByLabelText(/email/i), randomEmail)  
    userEvent.click(getByRole('button', { name: /Sign in/i }))
    // assertions
    await waitFor(() => {
        expect(handleuserlogin).not.toHaveBeenCalled()
        expect(getByTestId('password__error')).toHaveTextContent(/Please enter your password/i)
    }) 
    await act(() => promise)    
})

test('shows an error messages when sign in is clicked and no email is provided', async () => {
    const promise = Promise.resolve()
    const handleuserlogin = jest.fn(() => promise)
    const { getByRole, getByLabelText, getByTestId } = renderLoginComponent({ handleuserlogin })
    // update password field and submit button   
    var randomPassword = faker.internet.password(); 
    userEvent.type(getByLabelText(/password/i), randomPassword)  
    userEvent.click(getByRole('button', { name: /Sign in/i }))
    // assertions
    await waitFor(() => {
        expect(handleuserlogin).not.toHaveBeenCalled()
        expect(getByTestId('email__error')).toHaveTextContent(/Please enter your valid email address/i)
    }) 
    await act(() => promise)    
})