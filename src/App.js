import { BrowserRouter, Route, Routes, Navigate,} from 'react-router-dom';
import '../src/css/style.min.css';
import Book from './pages/Book';
import Books from './pages/Books';

function App() {
  return(
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Books/>} />
              <Route exact path='/book/:id' element={<Book/>} />
              <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
  )  
}

export default App;
