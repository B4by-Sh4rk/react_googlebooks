import React from 'react';

const BookItem = (props) => {
    function isImg(props) {
        if (props.props.volumeInfo.imageLinks) {
          return <img src={props.props.volumeInfo.imageLinks.thumbnail} alt="img" className='book__img'/>
        }
        return <img src="https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg" alt="img" className='book__img'/>
      }
      
    return (
        <div className='book__card'>
            <div className="book__container">
                {isImg(props)}
                <div className='book__info'>
                    <h1>{props.props.volumeInfo.title}</h1>
                    <h3>{props.props.volumeInfo.authors}</h3>
                    <p>{props.props.volumeInfo.categories}</p>
                </div>
            </div>
        </div>
    );
};

export default BookItem;