import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const shelfTypes = [
  {
    id: 'wantToRead',
    titleName: 'Want To Read',
  },
  {
    id: 'currentlyReading',
    titleName: 'Currently Reading',
  },
  {
    id: 'read',
    titleName: 'Read',
  },
];

const ListBooks = ({ books, handleUpdate }) => {
  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        {shelfTypes.map((type) => (
          <div key={type.id}>
            <BookShelf
              books={books.filter((book) => book.shelf === type.id)}
              shelfTitle={type.titleName}
              updateShelf={handleUpdate}
            />
          </div>
        ))}
      </div>
      <div className='open-search'>
        <Link to='/search'> Add a book </Link>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
};

export default ListBooks;
