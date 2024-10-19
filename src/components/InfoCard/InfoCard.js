import React from 'react';
import './InfoCard.css'

// pro card da nota
import EqualizerIcon from '@mui/icons-material/Equalizer';


function InfoCard({ title, info }) {

    const cardUnavailable = info === '-'; 

    return (
        <div className={`info-card ${cardUnavailable ? 'unavailable' : ''}`}>
            <div className='icon-container'>
                <EqualizerIcon className='icon' style={{ fontSize: 50 }} />
            </div>
            <div className='info'>
                <p className='info-card-note'>{info}</p>
                <p className='info-card-text'>{title}</p>
            </div>
        </div>
    );
}

export default InfoCard;