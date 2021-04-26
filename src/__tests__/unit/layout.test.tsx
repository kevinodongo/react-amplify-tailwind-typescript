//__tests__/unit/layout.test.tsx
import { render, act, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Layout, { IProps } from '../../pages/private/Layout'

afterEach(() => cleanup())

function renderLayoutComponent(props: Partial<IProps> = {}) {
    const defaultProps: IProps = {
        user: {
            attributes: {
                email: 'example.example.com'
            }
        },
        handlelogout() {
            return
        },
    };
    return render(<Layout {...defaultProps} {...props} />);
}


test("calls handlelogout when signout is called", async () => {
    const promise = Promise.resolve()
    const handlelogout = jest.fn(() => promise)
    const { getByTestId,getByRole } = renderLayoutComponent({ handlelogout })
    // submit signout button 
    userEvent.click(getByTestId('profile__menu__button')) 
    expect(getByRole('button', { name: /Sign out/i })).toBeInTheDocument()
    userEvent.click(getByRole('button', { name: /Sign out/i }))
    // assertions
    await waitFor(() => {
        expect(handlelogout).toHaveBeenCalledTimes(1)
    })
    await act(() => promise)
})