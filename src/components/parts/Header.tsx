import React from 'react'
import { useHistory } from 'react-router-dom'

const Header = () => {
    const history = useHistory()
    return (
        <div>
            <nav className="bg-white border-b border-gray-200 shadow py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                    <div className="font-bold">React Tailwind Amplify and Tailwind</div>
                    <div className="space-x-3">
                        <button className="px-6 py-2 focus:outline-none border border-blue-600 rounded-full text-blue-600 font-semibold" onClick={() => history.push('/login')}>Login</button>
                        <button className="rounded-full px-6 py-2 bg-blue-600 hover:bg-blue-700  focus:outline-none text-white font-semibold" onClick={() => history.push('/signup')}>Sign up</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
