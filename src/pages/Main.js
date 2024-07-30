import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Main() {
    const [message, setMessage] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/main', { withCredentials: true })
                setMessage(response.data.message)
            } catch (error) {
                setMessage('Error fetching data')
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <h2>Main Page</h2>
            <p>{message}</p>
        </div>
    )
}

export default Main
