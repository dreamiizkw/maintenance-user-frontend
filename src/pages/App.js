import React, { Component } from 'react';
import '../App.css';

class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
        users: [],
        search: "",
        matchedUser: []
      }
  }

  componentDidMount() {
    // Fetch user data
    fetch('http://localhost:5000/users')
    .then(response => response.json())
    .then(data => this.setState({users: data}))
  }

  deleteUser = e => {
    // call delete user api
    fetch(`http://localhost:5000/users/${e.target.dataset.id}`, {method: 'DELETE'})
    .then(response => response.json())
    .then(data => {window.location.reload()})
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  searchUser() {
    let searchText = this.state.search
    let users = this.state.users
    let matchedUser = []
    users.forEach(user => {
      if (user.first_name === searchText || user.last_name === searchText) {
        matchedUser.push(user)
      }
    })
    this.setState({ matchedUser: matchedUser })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div>
          <input type="text" placeholder="Search by first name or last name" name="search" value={this.state.search} onChange={this.handleInputChange.bind(this)} />
          <button onClick={this.searchUser.bind(this)}>Search</button>
          <a href="/add">
            <button>Add</button>
          </a>
        </div>

        <table>
          <tbody>
            <tr>
              <th>No</th> 
              <th>UserID</th>
              <th>Username</th>
              <th>first_name</th>
              <th>last_name</th>
              <th>create_by</th>
              <th>create_date</th>
              <th>last_update_by</th> 
              <th>last_update_date</th> 
              <th>edit</th> 
              <th>delete</th> 
            </tr>
          { this.state.matchedUser.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.create_by}</td>
                  <td>{user.create_date}</td>
                  <td>{user.last_update_by}</td>
                  <td>{user.last_update_date}</td>
                  <td><a href={`/edit/${user.id}`}>Click</a></td>
                  <td onClick={this.deleteUser.bind(this)} value={user.id} data-id={user.id}>Click</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
