import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from '../Book/index'

class Search extends Component {

    timeout = 0;

    state = {
        query : '',
        books : [],
        searching : false
    }

    updateQuery = (value) => {
        this.setState({
            query : value.trim()
        });

        if (this.timeout) clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.setState({
                searching : true
            })
            BooksAPI.search(value, 10).then((books)=>{
                this.setState({
                    books : books.length > 0 ? books : [],
                    searching : false
                })
            })
        }, 200);
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" 
                               placeholder="Search by title or author"
                               value={this.state.query}
                               onChange={event => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book) => {
                            return <li key={book.id}>
                                <Book book={book} onChange={this.props.onChange}></Book>
                            </li>
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;

