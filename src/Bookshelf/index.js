import React from 'react'
import Book from '../Book/index'

const Bookshelf = function (props) {
    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {props.books.filter((book) => book.shelf === props.shelf).map((book) => {
                            return <li key={book.id}>
                                <Book book={book} onChange={props.onChange}></Book>
                            </li>
                        })}
                    </ol>
                </div>
            </div>
        </div>
    );
}
export default Bookshelf;