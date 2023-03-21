import React from 'react';
import BookItem from './BookItem';
const BookList = ({props}) => {
    return (
        <div className="books__container">
            {props.map((props) => 
            <BookItem props={props} key={props.id}/>
            )}
      </div>
    );
};

export default BookList;