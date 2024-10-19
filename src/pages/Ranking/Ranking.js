import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'; 
import './Ranking.css'; 

function Ranking() {
    const [rankingImage, setRankingImage] = useState(null); // State to store the image URL
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage errors

    // Fetch the ranking image URL on component mount
    useEffect(() => {
        const fetchRankingImage = async () => {
            try {
                const response = await fetch('https://rvcurso.com.br/get.php?action=get_top_ranking');
                const data = await response.json();

                if (data.link_top_ranking) {
                    setRankingImage(data.link_top_ranking);
                } else {
                    throw new Error('Ranking image not found');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching ranking image:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRankingImage();
    }, []);

    return (
        <div className='page-container profile'>
            <div className='menu'>
                <Sidebar />
            </div>
            <div className='ranking-container'>
                {loading ? (
                    <div> </div>
                ) : error ? (
                    console.log(error)
                ) : (
                    <div className='ranking-image-container'>
                        <img 
                            src={rankingImage} 
                            alt="Top Ranking" 
                            className='ranking-image'
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Ranking;
