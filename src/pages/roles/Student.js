import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Student() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:5000/student', {
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
            <h2>Student Page</h2>
            <p>{message}</p>
        </div>
    );
}

export default Student;
