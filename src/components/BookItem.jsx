import React from 'react';
import { useNavigate } from "react-router-dom";

const BookItem = (props) => {
    function isImg(props) {
        if (props.props.volumeInfo.imageLinks) {
          return <img src={props.props.volumeInfo.imageLinks.thumbnail} alt="img" className='book__img'/>
        }
        return <img src="https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg" alt="img" className='book__img'/>
      }

      function isAuthors(props) {
        if (props.props.volumeInfo.authors) {
          return <h3>{props.props.volumeInfo.authors[0]}</h3>
        }
        return <h3></h3>
      }
      const router = useNavigate();
    return (
        <div className='b'>
            <div id={props.props.id} className='book__card' onClick={() => router(`/book/${props.props.id}`)}>
                <div className="book__container">
                    {isImg(props)}
                    <div className='book__info'>
                        <h1>{props.props.volumeInfo.title}</h1>
                        {isAuthors(props)}
                        <p>{props.props.volumeInfo.categories}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookItem;