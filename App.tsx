import React, { Component } from 'react';


class App extends Component {
  state = {
    books: [],
    loading: true
  }
  componentDidMount() {
    fetch('https://localhost:5001/api/books')
      .then(res => res.json())
      .then((data) => {
        this.setState({ books: data, loading: false })
        console.log(this.state.books)
      })
      .catch(console.log)
  }

  render() {
    return (
      <>      {
        this.state.loading ?
          <div className="d-flex justify-content-center">
            <div className="spinner-border m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div> :
          <div className="container">
            <div>
              <h1>My Books</h1>
              <h2>Details of Books</h2>
              {this.state.books.map((book: any) => (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{book.bookName}</h5>
                    <h5 className="card-subtitle">{book.price}</h5>
                    <h5 className="card-subtitle">{book.category}</h5>
                    <h5 className="card-subtitle">{book.author}</h5>
                  </div>
                  <div>
                    <button onClick={() => {
                      fetch(`https://localhost:5001/api/books/${book.id}`, { method: 'DELETE' }).then((resp) => {
                        console.log(resp);
                        fetch('https://localhost:5001/api/books')
                        .then(res => res.json())
                        .then((data) => {
                          this.setState({ books: data})
                          // console.log(this.state.books)
                        })
                        .catch(console.log)
                      }).catch((error) => {
                        console.log(error);

                      })
                    }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
      }
      </>
    );
  }
}
export default App;
