import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Switch,
    Route,
    BrowserRouter as Router
} from "react-router-dom";
import Sidebar from '../../components/dashboard/Sidebar';
import Settings from "./Settings"

const routes = [
    {
        path: "/dashboard",
        exact: true,
        sidebar: () => <div>Dashboard</div>,
        main: () => <h2>Dashboard</h2>
    },
    {
        path: "/settings",
        sidebar: () => <div>Settings</div>,
        main: () => <div><Settings /></div>
    },
    {
        path: "*",
        sidebar: () => <div></div>,
        main: () => <h2>No page found</h2>
    },
]


export interface IProps {
   handlelogout: () => void,
   user: any
}

const Dashboard = ({ handlelogout, user }: IProps) => {
    const history = useHistory()
    const [open, setOpen] = useState<boolean>(true)
    const [menu, setMenu] = useState<boolean>(false)

    return (
        <Router>
        <div className="relative min-h-screen">
            {/*navigation drawer*/}
            {open &&
                <div className="absolute inset-y-0 z-50 left-0 w-72 bg-blueGray-100 shadow border-2 border-blueGray-100">
                    <Sidebar />
                </div>
            }

            <div className={open ? 'absolute inset-0 left-0 lg:left-72' : 'absolute inset-0 left-0'}>
                <nav className="bg-white border-b border-gray-300 py-4 px-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="text-lg">Dashboard</div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="text-gray-700 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                        <button className="text-gray-700 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className="relative">
                            <button data-testid="profile__menu__button" id="profile__menu__button" onClick={() => setMenu(!menu)} className="text-gray-700 mt-1 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div>
                                {menu &&
                                    <div style={{ width: '21rem' }} className="origin-top-right absolute right-0 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <div className="bg-blue-50">
                                            <div className="flex items-center px-4 py-6 space-x-2">
                                                <div className="flex-shrink-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-gray-700 font-medium">John Adams</div>
                                                    <div className="flex items-center">
                                                        <span className="text-xs font-base truncate">{user && <div>{user.attributes.email}</div>}</span>
                                                        <button onClick={() => history.push(`/profile`)} className="cursor-pointer focus:outline-none">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-3 py-3 flex items-center space-x-1 font-medium">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <button onClick={() => history.push(`/accounts`)} className="flex flex-col items-start cursor-pointer focus:outline-none">
                                                    <div>Feedback</div>
                                                    <p className="text-xs font-medium text-gray-400">Send your feedback and we will get back to you?</p>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="px-6 py-3 border-t border-gray-200">
                                            <button id="signout__button" onClick={handlelogout} className="bg-red-500 focus:outline-none hover:bg-red-600 rounded-md text-white py-2 w-full flex justify-center font-medium">
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <button onClick={() => setOpen(!open)} className="bg-white lg:hidden focus:outline-none border border-gray-300 rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </nav>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/*content*/}
                        <Switch>
                            {routes.map((route, index) => (
                                // Render more <Route>s with the same paths as
                                // above, but different components this time.
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.main />}
                                />
                            ))}
                        </Switch>
                    </div>
                </main>
            </div>
        </div>
        </Router>
    )
}

export default Dashboard
