//__tests__/unit/sendcode.test.tsx
import { render, act, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SendCode, { IProps } from '../../components/auth/SendCode'
var faker = require('faker');

afterEach(() => cleanup())

function renderSendCodeComponent(props: Partial<IProps> = {}) {
    const defaultProps: IProps = {
        error: null,
        isLoading: false,
        handleresendcode() {
            return
        },
    };
    return render(<SendCode {...defaultProps} {...props} />);
}


test('calls handleresendcode with the email when send code is clicked', async () => {
    const promise = Promise.resolve()
    const handleresendcode = jest.fn(() => promise)
    const { getByLabelText, getByRole } = renderSendCodeComponent({ handleresendcode })
    // update email field and submit button
    var randomEmail = faker.internet.email();  
    userEvent.type(getByLabelText(/email/i), randomEmail)
    userEvent.click(getByRole('button', { name: /Send code/i }))
    // assertions
    await waitFor(() => {
        expect(handleresendcode).toHaveBeenCalledTimes(1)
        expect(handleresendcode).toHaveBeenCalledWith(randomEmail)
        expect(getByRole('button', { name: /Send code/i })).not.toBeDisabled()
    }) 
    await act(() => promise)    
})

test('shows an error messages when send code is clicked and no email provided', async () => {
    const promise = Promise.resolve()
    const handleresendcode = jest.fn(() => promise)
    const { getByTestId, getByRole } = renderSendCodeComponent({ handleresendcode })
    // submit button
    userEvent.click(getByRole('button', { name: /Send code/i }))
    // assertions
    await waitFor(() => {
        expect(handleresendcode).not.toHaveBeenCalled()
        expect(getByTestId('email__error')).toHaveTextContent(/Please enter your valid email address/i)
    }) 
    await act(() => promise)    
})

