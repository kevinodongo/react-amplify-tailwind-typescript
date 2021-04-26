//__tests__/unit/signup.test.tsx
import { render, act, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Signup, { IProps } from '../../components/auth/SignupPage'
var faker = require('faker');

afterEach(() => cleanup())

function renderSignupComponent(props: Partial<IProps> = {}) {
    const defaultProps: IProps = {
        error: null,
        isLoading: false,
        handleuserregistration(){
            return
        },
    };
    return render(<Signup {...defaultProps} {...props} />);
}


test('shows an error messages when create account is clicked and no username, email and password are provided', async () => {
    const promise = Promise.resolve()
    const handleuserregistration = jest.fn(() => promise)
    const { getByTestId,getByRole } = renderSignupComponent({ handleuserregistration })
    // update all required fields and submit button
    userEvent.click(getByRole('button', { name: /Create an account/i }))
    // assertions
    await waitFor(() => {
        expect(handleuserregistration).not.toHaveBeenCalled()
        expect(getByTestId('username__error')).toHaveTextContent(/Please provide a username or your full names/i)
        expect(getByTestId('email__error')).toHaveTextContent(/Please enter your valid email address/i)
        expect(getByTestId('password__error')).toHaveTextContent(/Please enter your password/i)
    }) 
    await act(() => promise)    
})

test('shows an error messages when create account is clicked and no username but email and password are provided', async () => {
    const promise = Promise.resolve()
    const handleuserregistration = jest.fn(() => promise)
    const { getByLabelText, getByTestId, getByRole } = renderSignupComponent({ handleuserregistration })
    // update all required fields except username and submit button
    var randomEmail = faker.internet.email();
    var randomPassword = faker.internet.password();   
    userEvent.type(getByLabelText(/email/i), randomEmail)
    userEvent.type(getByLabelText(/password/i), randomPassword)
    userEvent.click(getByRole('button', { name: /Create an account/i }))
    // assertions
    await waitFor(() => {
        expect(handleuserregistration).not.toHaveBeenCalled()
        expect(getByTestId('username__error')).toHaveTextContent(/Please provide a username or your full names/i)
    }) 
    await act(() => promise)    
})

test('shows an error messages when create account is clicked and no email but username and password are provided', async () => {
    const promise = Promise.resolve()
    const handleuserregistration = jest.fn(() => promise)
    const { getByLabelText, getByTestId, getByRole } = renderSignupComponent({ handleuserregistration })
    // update all required fields except username and submit button
    var randomUsername = faker.internet.userName();
    var randomPassword = faker.internet.password();   
    userEvent.type(getByLabelText(/username/i), randomUsername)
    userEvent.type(getByLabelText(/password/i), randomPassword)
    userEvent.click(getByRole('button', { name: /Create an account/i }))
    // assertions
    await waitFor(() => {
        expect(handleuserregistration).not.toHaveBeenCalled()
        expect(getByTestId('email__error')).toHaveTextContent(/Please enter your valid email address/i)
    }) 
    await act(() => promise)    
})


test('shows an error messages when create account is clicked and no password but email and password are provided', async () => {
    const promise = Promise.resolve()
    const handleuserregistration = jest.fn(() => promise)
    const { getByLabelText, getByTestId, getByRole } = renderSignupComponent({ handleuserregistration })
    // update all required fields except username and submit button
    var randomUsername = faker.internet.userName();
    var randomEmail = faker.internet.email();   
    userEvent.type(getByLabelText(/username/i), randomUsername)
    userEvent.type(getByLabelText(/email/i), randomEmail)
    userEvent.click(getByRole('button', { name: /Create an account/i }))
    // assertions
    await waitFor(() => {
        expect(handleuserregistration).not.toHaveBeenCalled()
        expect(getByTestId('password__error')).toHaveTextContent(/Please enter your password/i)
    }) 
    await act(() => promise)    
})

test('calls handleuserregistration with the email and password when sign in is clicked', async () => {
    const promise = Promise.resolve()
    const handleuserregistration = jest.fn(() => promise)
    const { getByLabelText, getByRole } = renderSignupComponent({ handleuserregistration })
    // update all required fields and submit button
    var randomUsername = faker.internet.userName();  
    var randomEmail = faker.internet.email();
    var randomPassword = faker.internet.password(); 
    userEvent.type(getByLabelText(/username/i), randomUsername)   
    userEvent.type(getByLabelText(/email/i), randomEmail)
    userEvent.type(getByLabelText(/password/i), randomPassword)
    userEvent.click(getByRole('button', { name: /Create an account/i }))
    // assertions
    await waitFor(() => {
        expect(handleuserregistration).toHaveBeenCalledTimes(1)
        expect(handleuserregistration).toHaveBeenCalledWith({
            username: randomUsername,
            email: randomEmail,
            country: 'United States of America',
            password: randomPassword,
            email__preference: true
        })
        expect(getByRole('button', { name: /Create an account/i })).not.toBeDisabled()
    }) 
    await act(() => promise)    
})