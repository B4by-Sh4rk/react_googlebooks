import axios from "axios";
import '../css/style.min.css';
import {useState } from "react";
import BookList from "../components/BookList";
import NewSelect from "../components/UI/NewSelect";


function Books() {

  const [searchQuery, setSearchQuery] = useState('');
  const [loadState, setLoadState] = useState(false);
  const [loadMore, setLoadMore] = useState(0);
  const [Books, setBooks] = useState([]);
  const [SortedBooks, setSortedBooks] = useState([]);
  const [SortedBooksNew, setSortedBooksNew] = useState([]);
  const [SortedBooksRel, setSortedBooksRel] = useState([]);
  const [BooksCount, setBooksCount] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');
  const [isLoading, setIsLoading] = useState(false);  

  const ApiKey = 'AIzaSyAt_T_lVNigxmWSUd5DbsKWjBB44d7etnU';
  let counter = 0;
  let name = '';
  
  async function fetchBooks(name, counter){
    setIsLoading(true);
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=intitle:' + name + '&maxResults=30&key=' + ApiKey+ '&startIndex='+ counter);
        setBooksCount(response.data.totalItems);
        console.log(response.data.items)
        if(response.data.items == undefined){
          setIsLoading(false);
          setLoadState(false);
        }else{
            console.log('loadmore: ' + counter);          
            setBooks([...Books, ...response.data.items]);
            setIsLoading(false);
            setLoadState(true);
        }
  }

  function loadMoreBooks(){
    if (loadState != false){
          console.log(loadMore);
          counter = loadMore + 31;
          console.log(counter);
          setLoadMore(counter);
          console.log(loadMore + ' update!');
          fetchBooks(searchQuery, counter);
    }else{
      console.log('error')
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    name = searchQuery;
    fetchBooks(name, counter);
    return;
  }


  const sortBooks = (sort) => {
    setSelectedSort(sort)
    console.log(sort);
    if (sort == 'All'){
      sort = '';
      setSortedBooks(Books);
    }else{
      sort = sort;
      for (let index = 0; index < Books.length; index++) {
        console.log(Books[index].volumeInfo.categories);
        if(Books[index].volumeInfo.categories == sort){
          SortedBooks.push(Books[index]);
          setSortedBooksNew(SortedBooks);
        }
      }
    }
}



const isSortedBooks = (SortedBooks, SortedBooksNew) => {
  if (  SortedBooks == SortedBooksNew){
    SortedBooks = [''];
    const a = <BookList props={SortedBooksNew}/>
    SortedBooksNew=[''];
    return a;
  }else{
  }
}

const sortBooksRelevance = (sort) => {
  setSelectedSort(sort)
  console.log(sort);
  if (sort == 'Relevance'){
    setSortedBooks(Books);
  }else{
    if(SortedBooksNew != ''){
      const a = SortedBooksNew.sort((a, b) => (a.publishedDate > b.publishedDate) ? 1 : -1);
      setSortedBooksRel(a);
    }else{
      const a = Books.sort((a, b) => (a.publishedDate > b.publishedDate) ? 1 : -1);
      setSortedBooksRel(a);
      console.log(SortedBooksRel);
    }
    }
}




  
  return (
    <div className="Books">
      <div className="input__container">
        <form className="search__form" type="submit" onSubmit={handleSubmit}>
        <input 
          className="search__input"
          placeholder="Search book..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button>Search</button>
        </form>
      </div>
      <div className="selectes">
        <div className="select__container">
          <NewSelect
            value={selectedSort}
            onChange = {sortBooks}
            defaulutValue="Categories"
            options={[
              {value: 'All', name: 'All'},
              {value: 'Art', name: 'Art'},
              {value: 'Biography', name: 'Biography'},
              {value: 'Computers', name: 'Computers'},
              {value: 'History', name: 'History'},
              {value: 'Medical', name: 'Medical'},
              {value: 'Poetry', name: 'Poetry'},
            ]}
          />
        </div>
          {isLoading
          ? <h1>Loading...</h1>
          : <h1>{[BooksCount]}</h1>
          }
        <div className="select__container">
        <NewSelect
            value={selectedSort}
            onChange = {sortBooksRelevance}
            defaulutValue="Sort by"
            options={[
              {value: 'relevance', name: 'relevance'},
              {value: 'newest', name: 'newest'},
            ]}
          />
        </div>
      </div>
      {
      isLoading
        ? <div className="loader__container"><div className="loader"></div></div>
        : SortedBooks != 0
          ? isSortedBooks(SortedBooks, SortedBooksNew)
          : <BookList props={Books}/>
      }
      <center>
      <button className="loadMore" onClick={loadMoreBooks}>Load more</button>
      </center>
    </div>
  );
}

export default Books;
