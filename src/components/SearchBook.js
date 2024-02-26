import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const SearchBook = ({ books, updateShelf, searchBook}) => {
  const [query, setQuery] = useState('');

  const updateQuery = (value) => {
    setQuery(value);
    searchBook(value.trim());
  };
  useEffect(() => {
    searchBook(query);
  }, [])

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-search'>
          Close
        </Link>
        <div className='search-books-input-wrapper'>
          <input
            className="search-contacts"
            type="text"
            placeholder='Search by title, author, or ISBN'
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            />
        </div>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
        {books?.map((book) => (
          <li key={book.id}>
          <div className='book'>
            <div className='book-top'>
              <div
                className='book-cover'
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${book.imageLinks?.thumbnail})`,
                }}
              ></div>
              <div className='book-shelf-changer'>
                <select value={book.shelf ? book.shelf : 'none'}
                  onChange={(e) => updateShelf(book, e.target.value)}
                  >
                  <option value='none' disabled>
                    Move to...
                  </option>
                  <option value='currentlyReading'>
                    Currently Reading
                  </option>
                  <option value='wantToRead'>Want to Read</option>
                  <option value='read'>Read</option>
                  <option value='none'>None</option>
                </select>
              </div>
            </div>
            <div className='book-title'>{book.title}</div>
            <div className='book-authors'>{book.authors?.join(', ')}</div>
          </div>
        </li>
        ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchBook;
