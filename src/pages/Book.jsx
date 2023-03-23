import React, { useEffect, useState } from 'react';
import '../css/style.min.css';
import { useParams } from 'react-router-dom';
import axios from "axios";
import BookCurent from '../components/UI/BookCurent';

const Book = () => {
    const [isLoading, setIsLoading] = useState(false);  
    const [Book, setBook] = useState([]);
    const params = useParams();
    const a = params.id;
    async function fetchBook(b){
        setIsLoading(true);
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/`+ b); 
            if(response.data == []){
                setIsLoading(false);
              }else{     
                let a = {...response.data}
                  setBook(a);
                  setIsLoading(false);
              }
    }
    
    useEffect(() => {
        fetchBook(a);
    }, []);

    console.log(Book);
    return (
        <div className='book'>
            {
            isLoading
                ? <div className="loader__container"><div className="loader"></div></div>
                : <BookCurent props={Book}/>
            }
        </div>
    );
};

export default Book;