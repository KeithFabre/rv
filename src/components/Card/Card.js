import React from 'react';
import './Card.css';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupsIcon from '@mui/icons-material/Groups';
import CreateIcon from '@mui/icons-material/Create';
import BiotechIcon from '@mui/icons-material/Biotech';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

const iconStyles = {
    humanas: { fontSize: 45, color: '#FF9800' },   
    natureza: { fontSize: 45, color: '#4CAF50' },  
    linguagens: { fontSize: 45, color: '#8E44AD' }, 
    matematica: { fontSize: 45, color: '#E53935' },
    redacao: { fontSize: 45, color: '#336699' }    
};

function Card({ title, info, icon, unavailable }) {
    const renderIcon = () => {
        switch (icon) {
            case 'groups':
                return <GroupsIcon className='icon humanas' style={iconStyles.humanas} />;
            case 'bio':
                return <BiotechIcon className='icon natureza' style={iconStyles.natureza} />;
            case 'chat':
                return <QuestionAnswerIcon className='icon linguagens' style={iconStyles.linguagens} />;
            case 'functions':
                return <CalculateOutlinedIcon className='icon matematica' style={iconStyles.matematica} />;
            case 'create':
                return <CreateIcon className='icon redacao' style={iconStyles.redacao} />;
            default:
                return null;
        }
    };

    const renderTitle = () => {
        if (title === "Redação") {
            return (
                <>
                    Redação
                    <br /><br />
                </>
            );
        }
        return title;
    };

    // Determine the card class based on the icon type and unavailable status
    const cardClass = () => {
        let baseClass = 'card';
        switch (icon) {
            case 'groups':
                baseClass += ' card-humanas';
                break;
            case 'bio':
                baseClass += ' card-natureza';
                break;
            case 'chat':
                baseClass += ' card-linguagens';
                break;
            case 'functions':
                baseClass += ' card-matematica';
                break;
            case 'create':
                baseClass += ' card-redacao';
                break;
            default:
                break;
        }
        // Add unavailable class if the unavailable prop is true
        if (unavailable) {
            baseClass += ' unavailable';
        }
        return baseClass;
    };

    return (
        <div className={cardClass()}>
            <div className='icon-container'>
                {renderIcon()}
            </div>
            <p className='card-title'>
                {renderTitle()}
            </p>
            <p className='card-info'>{info}</p>
        </div>
    );
}

export default Card;
