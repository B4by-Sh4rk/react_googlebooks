import React from 'react';

const BookCurent = (props) => {
    console.log(props.props.volumeInfo);
    function isImg(props) {
        if (props.props.volumeInfo) {
            if(props.props.volumeInfo.imageLinks){
                return <img src={props.props.volumeInfo.imageLinks.thumbnail} alt="img" className='book__img'/>

            }else{
                return <img src="https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg" alt="img" className='book__img'/>
            }
      }
      return <img src="https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg" alt="img" className='book__img'/>
    }
    function isAuthors(props) {
      if (props.props.volumeInfo) {
        return <h3>{props.props.authors}</h3>
      }
      return <h3></h3>
    }
    function isTitle(props) {
        if (props.props.volumeInfo) {
          return <h3>{props.props.volumeInfo.title}</h3>
        }
        return <h3></h3>
      }
      function isCategories(props) {
        if (props.props.volumeInfo) {
          return <h3>{props.props.volumeInfo.categories}</h3>
        }
        return <h3></h3>
      }
      function isDescription(props) {
        if (props.props.volumeInfo) {
            if (props.props.volumeInfo.description) {
            let a = props.props.volumeInfo.description;
            a = a.replace(/<\/?[a-zA-Zа-яА-Я]+>/gi,'');
          return <h3>{a}</h3>
            }else{
                return <h3></h3>
            }
        }
        return <h3></h3>
      }
    return (
        <div>
            {isImg(props)}
                {isTitle(props)}
                {isAuthors(props)}
                {isCategories(props)}
                <h1>- * -</h1>
                {isDescription(props)}
        </div>
    );
};

export default BookCurent;