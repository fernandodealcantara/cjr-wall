import { useEffect } from 'react'
import jwtDecode from 'jwt-decode'

function handleCallbackResponse(response) {
    console.log(`Encoded JWT ID token:  ${response.credential}`)
    const userObject = jwtDecode(response.credential)
    console.log(userObject)
}

export default function GoogleButton() {

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_CLIENT_ID,
            callback: handleCallbackResponse
        })
    
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        )
    }, [])
    return (
        <div id="signInDiv"/>
    )
}
