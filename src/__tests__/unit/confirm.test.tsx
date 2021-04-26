//__tests__/unit/confirm.test.tsx
import { render, act, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Confirm, { IProps } from '../../components/auth/ConfirmPage'
var faker = require('faker');

afterEach(() => cleanup())

function renderConfirmComponent(props: Partial<IProps> = {}) {
    const defaultProps: IProps = {
        error: null,
        isLoading: false,
        handleconfirmuseremail(){
            return
        },
        handleresendconfirmationcode(){
            return
        }
    };
    return render(<Confirm {...defaultProps} {...props} />);
}

test('calls handleresendconfirmationcode when resend code is clicked', async () => {
    const promise = Promise.resolve()
    const handleresendconfirmationcode = jest.fn(() => promise)
    const { getByRole } = renderConfirmComponent({ handleresendconfirmationcode })
    userEvent.click(getByRole('button', { name: /Resend code/i }))
    await waitFor(() => {
        expect(handleresendconfirmationcode).toHaveBeenCalledTimes(1)
    }) 
    await act(() => promise) 
})


test('calls handleuserloging with the email and password when sign in is clicked', async () => {
    const promise = Promise.resolve()
    const handleconfirmuseremail = jest.fn(() => promise)
    const { getByLabelText, getByRole } = renderConfirmComponent({ handleconfirmuseremail })
    // update email field and code field and submit button
    // generating a faker password to simulate a code  
    var randomEmail = faker.internet.email();
    var randomCode = faker.internet.password();    
    userEvent.type(getByLabelText(/email/i), randomEmail)
    userEvent.type(getByLabelText(/code/i), randomCode)
    userEvent.click(getByRole('button', { name: /Confirm account/i }))
    // assertions
    await waitFor(() => {
        expect(handleconfirmuseremail).toHaveBeenCalledTimes(1)
        expect(handleconfirmuseremail).toHaveBeenCalledWith(randomEmail, randomCode)
        expect(getByRole('button', { name: /Confirm account/i })).not.toBeDisabled()
    }) 
    await act(() => promise)    
})


test('shows an error messages when send code is clicked and no email or code are provided', async () => {
    const promise = Promise.resolve()
    const handleconfirmuseremail = jest.fn(() => promise)
    const { getByTestId, getByRole } = renderConfirmComponent({ handleconfirmuseremail })
    // submit confirm button 
    userEvent.click(getByRole('button', { name: /Confirm account/i }))
    // assertions
    await waitFor(() => {
        expect(handleconfirmuseremail).not.toHaveBeenCalled()
        expect(getByTestId('email__error')).toHaveTextContent(/Please enter your valid email address/i)
        expect(getByTestId('code__error')).toHaveTextContent(/Please enter a valid code we sent you./i)
    }) 
    await act(() => promise)    
})

 
test('shows an error messages when confirm account is clicked and no code is provided', async () => {
    const promise = Promise.resolve()
    const handleconfirmuseremail = jest.fn(() => promise)
    const { getByRole, getByLabelText, getByTestId } = renderConfirmComponent({ handleconfirmuseremail })
    // update email field and submit button    
    var randomEmail = faker.internet.email();   
    userEvent.type(getByLabelText(/email/i), randomEmail)  
    userEvent.click(getByRole('button', { name: /Confirm account/i }))
    // assertions
    await waitFor(() => {
        expect(handleconfirmuseremail).not.toHaveBeenCalled()
        expect(getByTestId('code__error')).toHaveTextContent(/Please enter a valid code we sent you/i)
    }) 
    await act(() => promise)    
})

test('shows an error messages when confirm account is clicked and no email is provided', async () => {
    const promise = Promise.resolve()
    const handleconfirmuseremail = jest.fn(() => promise)
    const { getByRole, getByLabelText, getByTestId } = renderConfirmComponent({ handleconfirmuseremail })
    // update code field and submit confirm button
    // generating a faker password to simulate a code   
    var randomCode = faker.internet.password(); 
    userEvent.type(getByLabelText(/code/i), randomCode)  
    userEvent.click(getByRole('button', { name: /Confirm account/i }))
    // assertions
    await waitFor(() => {
        expect(handleconfirmuseremail).not.toHaveBeenCalled()
        expect(getByTestId('email__error')).toHaveTextContent(/Please enter your valid email address/i)
    }) 
    await act(() => promise)    
})

