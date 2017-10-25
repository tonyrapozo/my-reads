import React, { Component } from 'react'
import Book from '../Book/index'

class Bookshelf extends Component {
    render() {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.props.books.map((book) => {
                                return <li key={book.id}>
                                    <Book book={book} onChange={this.props.onChange}></Book>
                                </li>
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bookshelf;