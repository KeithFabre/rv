import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Teacher() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:5000/teacher', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage(response.data.message);
            } catch (error) {
                setMessage('Error fetching data');
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Teacher Page</h2>
            <p>{message}</p>
        </div>
    );
}

export default Teacher;
