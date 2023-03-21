import axios from "axios";
import '../src/css/style.min.css';
import { useEffect, useState } from "react";
import BookList from "./components/BookList";
import NewSelect from "./components/UI/NewSelect";


function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [Books, setBooks] = useState([]);
  const [BooksCount, setBooksCount] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');
  const [isLoading, setIsLoading] = useState(false);  

  const ApiKey = 'AIzaSyAt_T_lVNigxmWSUd5DbsKWjBB44d7etnU';
  let counter = 0;

  async function fetchBooks(name){
    setIsLoading(true);
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=intitle:' + name + '&maxResults=30&key=' + ApiKey+ '&startIndex='+ counter);
    setBooksCount(response.data.totalItems);
    console.log(response.data.items)
    if(response.data.items == undefined){
      setIsLoading(false);
    }else{
      setBooks(response.data.items);
      setIsLoading(false);
    }
  }

  function loadMoreBooks(){
    console.log(counter);
    //counter = counter+30;
    console.log(counter);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = searchQuery;
    fetchBooks(name);
  }

  useEffect( () => {
    //fetchBooks();
  }, []);

  const sortBooks = (sort) => {
    setSelectedSort(sort)
    console.log(sort);
    if(Books.categories == sort){
      console.log('yes');
    }
  }
  
  return (
    <div className="App">
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
              {value: 'all', name: 'all'},
              {value: 'art', name: 'art'},
              {value: 'biography', name: 'biography'},
              {value: 'computers', name: 'computers'},
              {value: 'history', name: 'history'},
              {value: 'medical', name: 'medical'},
              {value: 'poetry', name: 'poetry'},
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
            onChange = {sortBooks}
            defaulutValue="Sort by"
            options={[
              {value: 'relevance', name: 'relevance'},
              {value: 'newest', name: 'newest'},
            ]}
          />
        </div>
      </div>
      {isLoading
        ? <div className="loader__container"><div className="loader"></div></div>
        : <BookList props={Books}/>
      }
      <center>
      <button className="loadMore disp__none" onClick={loadMoreBooks}>Load more</button>
      </center>
    </div>
  );
}

export default App;
