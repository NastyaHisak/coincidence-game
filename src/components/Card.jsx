import React from 'react';
import './Card.css'

const Card = ({item, index}) => {
    return (
        <div className='card' style={{backgroundColor: item.color}}></div>
    );
};

export default Card;
