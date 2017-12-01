import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Bookshelf from './Bookshelf/index'
import Search from './Search/index'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        BooksAPI.getAll().then((data) => {
            this.setState({
                books: data
            })
        })
    }

    changeState = (event, updatedBook) => {
        BooksAPI
            .update(updatedBook, event)
            .then((data) => {
                this.setState((prevState) => {
                    var book = prevState.books.filter(item => item.id === updatedBook.id);
                    if (book.length === 0) {
                        prevState.books.push(updatedBook);
                    }
                    return ({
                        books: prevState.books.map(book => {
                            book.shelf = 'none';
                            book.shelf = data.currentlyReading.filter(item => book.id === item).length > 0 ? 'currentlyReading' : book.shelf;
                            book.shelf = data.read.filter(item => book.id === item).length > 0 ? 'read' : book.shelf;
                            book.shelf = data.wantToRead.filter(item => book.id === item).length > 0 ? 'wantToRead' : book.shelf;
                            return book;
                        })
                    });
                })
            });
    }

    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Bookshelf books={this.state.books} shelf='currentlyReading' onChange={this.changeState} title="Currently Reading"></Bookshelf>
                                <Bookshelf books={this.state.books} shelf='wantToRead' onChange={this.changeState} title="Want to Read"></Bookshelf>
                                <Bookshelf books={this.state.books} shelf='read' onChange={this.changeState} title="Read"></Bookshelf>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )} />
                <Route exact path="/search" render={({ history }) => (
                    <Search
                        books={this.state.books}
                        onChange={(event, book) => {
                            this.changeState(event, book);
                            history.push('/');
                        }}>
                    </Search>
                )} />
            </div>
        );
    }
}

export default App;
