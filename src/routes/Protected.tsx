import { Route, Redirect } from 'react-router-dom';

const Protected = (props: any) => {
    const { component: Component, isAuthenticated, isLoading, handlelogout, user, ...rest } = props
    
    /** 
     * Before mounting await to check if user is authenticated
    */
    if (isLoading) return <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)', transform: '-ms-filter' }}><path d="M2 11H7V13H2zM17 11H22V13H17zM11 17H13V22H11zM11 2H13V7H11z"></path><path transform="rotate(-45.001 6.697 6.697)" d="M5.697 4.197H7.697V9.197H5.697z"></path><path transform="rotate(134.999 17.303 17.303)" d="M16.303 14.803H18.303V19.803H16.303z"></path><path transform="rotate(45.001 6.697 17.303)" d="M5.697 14.803H7.697V19.803H5.697z"></path><path transform="rotate(-44.992 17.303 6.697)" d="M14.803 5.697H19.803V7.697H14.803z"></path></svg>
        </div>
    </div>
    else
        return (
            <Route
                {...rest}
                render={(props) => {
                    return isAuthenticated ? (
                        <Component {...props} handlelogout={handlelogout} user={user} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location }
                            }}
                        />
                    );
                }}
            />
        )
}

export default Protected
