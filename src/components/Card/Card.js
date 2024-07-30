import React from 'react';
import './Card.css';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FunctionsIcon from '@mui/icons-material/Functions';
import GroupsIcon from '@mui/icons-material/Groups';
import CreateIcon from '@mui/icons-material/Create';
import BiotechIcon from '@mui/icons-material/Biotech';

const iconStyles = {
    humanas: { fontSize: 45, color: '#FF9800'},   
    natureza: { fontSize: 45, color: '#4CAF50'},  
    linguagens: { fontSize: 45, color: '#8E44AD'}, 
    matematica: { fontSize: 45, color: '#E53935'},
    redacao: { fontSize: 45, color: '#336699'}    
};

function Card({ title, info, icon }) {
    const renderIcon = () => {
        switch (icon) {
            case 'groups':
                return <GroupsIcon className='icon humanas' style={iconStyles.humanas} />;
            case 'bio':
                return <BiotechIcon className='icon natureza' style={iconStyles.natureza} />;
            case 'chat':
                return <QuestionAnswerIcon className='icon linguagens' style={iconStyles.linguagens} />;
            case 'functions':
                return <FunctionsIcon className='icon matematica' style={iconStyles.matematica} />;
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

    return (
        <div className='card'>
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