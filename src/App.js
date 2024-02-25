import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import ListBooks from './components/ListBooks';
import SearchBook from './components/SearchBook.js';
import * as BooksAPI from './utils/BooksAPI';

const App = () => {
  const [books, setBooks] = useState([]);
  const [bookSearched, setBookSearched] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  const handleUpdate = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      setBooks([...books.filter((b) => b.id !== book.id), book]);
    });
  };

  const handleSearch = (query) => {
    const getSearchData = async () => {
      await BooksAPI.search(query).then((res) => {
        if (res.error) {
          setBookSearched([]);
        } else {
          setBookSearched(res);
        }
      });
    };
    query ? getSearchData() : setBookSearched([]);
  };

  return (
    <Routes>
      <Route
        exact
        path='/'
        element={<ListBooks books={books} handleUpdate={handleUpdate} />}
      />
      <Route
        path='/search'
        element={
          <SearchBook
            books={bookSearched}
            updateShelf={handleUpdate}
            searchBook={handleSearch}
          />
        }
      />
    </Routes>
  );
};

export default App;
