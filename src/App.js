import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Bookshelf from './Bookshelf/index'
import Search from './Search/index'

class App extends Component {

    state = {
        currentlyReading: [],
        read: [],
        wantToRead: [],
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((data) => {
            this.setState({
                currentlyReading: data.filter((item) => item.shelf === 'currentlyReading').map(item => item.id),
                read: data.filter((item) => item.shelf === 'read').map(item => item.id),
                wantToRead: data.filter((item) => item.shelf === 'wantToRead').map(item => item.id),
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
                    if (book.length===0){
                        prevState.books.push(updatedBook);
                    }
                    return ({
                        currentlyReading: data.currentlyReading,
                        read: data.read,
                        wantToRead: data.wantToRead,
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
        let currentlyReading = this.state.books.filter(book => this.state.currentlyReading.filter(item => book.id === item).length > 0);
        let wantToRead = this.state.books.filter(book => this.state.wantToRead.filter(item => book.id === item).length > 0);
        let read = this.state.books.filter(book => this.state.read.filter(item => book.id === item).length > 0);

        return (
            <div>
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Bookshelf books={currentlyReading} onChange={this.changeState} title="Currently Reading"></Bookshelf>
                                <Bookshelf books={wantToRead} onChange={this.changeState} title="Want to Read"></Bookshelf>
                                <Bookshelf books={read} onChange={this.changeState} title="Read"></Bookshelf>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/create">Add a book</Link>
                        </div>
                    </div>
                )} />
                <Route exact path="/create" render={({ history }) => (
                    <Search
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
