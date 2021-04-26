import { useState } from 'react'
import { Auth } from "aws-amplify"
import { CognitoUser } from "amazon-cognito-identity-js";
import { useHistory } from "react-router-dom"

const Settings = () => {
    const history = useHistory()
    const [error, setError] = useState<string | null>(null)

    const deleteuser = () => {
        Auth
            .currentAuthenticatedUser()
            .then((user: CognitoUser) => new Promise((resolve: any, reject: any) => {
                user.deleteUser(error => {
                    if (error) {
                        return reject(error);
                    }
                    handle__success()
                    resolve();
                });
            }))
            .catch((err) => { setError(err.message)});
    }
    
    const handle__success = () => {
       history.push("/login")
    }

    return (
        <div className="space-y-3">
            <p>Settings page</p>
            <div>
              {error && <div id="login__attempt__error" className="bg-red-100 rounded-lg border border-red-500">
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
            <button onClick={deleteuser} className="bg-red-500 rounded-md shadow-sm py-2 px-6 text-white focus:outline-none">Disable user</button>
        </div>
    )
}

export default Settings
