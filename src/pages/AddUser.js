import React, { Component } from 'react';
import '../App.css';

class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        province: "",
        khet: "",
        khwang: "",
        zipcode: "",
        provinces: [],
        khets: [],
        khwangs: []
      }
  }

  componentDidMount() {
    // edit user
    if (this.props.match.path === "/edit/:id") {
      // fetch user by user id
      fetch(`http://localhost:5000/users/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          username: data[0].username,
          first_name: data[0].first_name,
          last_name: data[0].last_name,
          email: data[0].email,
          province: data[0].ProvinceID,
          khet: data[0].KhetID,
          khwang: data[0].KhwangID,
          zipcode: data[0].Zipcode
        })
      })
    }
    // fetch address
    fetch(`http://localhost:5000/province`)
      .then(response => response.json())
      .then(data => {
        this.setState({
         provinces: data
        })
    })
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleKhet = e => {
    let selectedProvince = e.target.value
    if (selectedProvince === "0") {
      this.setState({
        khets: [],
        khwangs: [],
        province: "",
        khet: "",
        khwang: "",
        zipcode: ""
      })
    } else {
      fetch(`http://localhost:5000/khet/${e.target.value}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
         khets: data,
         province: selectedProvince
        })
      })
    }
  }

  handleKhwang = e => {
    let selectedKhet = e.target.value
    if (selectedKhet === "0") {
      this.setState({
        khwangs: [],
        khet: "",
        khwang: "",
        zipcode: ""
      })
    } else {
      fetch(`http://localhost:5000/khwang/${e.target.value}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
         khwangs: data,
         khet: selectedKhet
        })
      })
    }
  }

  handleZipcode = e => {
    let selectedKhwang = e.target.value
    if (selectedKhwang === "0") {
      this.setState({
        khwang: "",
        zipcode: ""
      })
    } else {
      let khwangs = this.state.khwangs
      let zipcode = ""
      khwangs.forEach(khwang => {
        if (khwang.KhwangID === parseInt(selectedKhwang)) {
          zipcode = khwang.Zipcode
        }
      })
      this.setState({
        khwang: selectedKhwang,
        zipcode: zipcode
      })
    }
  }

  handleSave = () => {
      // edit user
      if (this.props.match.path === "/edit/:id") {
        fetch(`http://localhost:5000/users/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
          })
          .then(response => response.json())
          .then(data => {window.location.replace("http://localhost:3000");}
        )
      
      } else { // add user
        fetch(`http://localhost:5000/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data => {window.location.replace("http://localhost:3000");}
        )
      }
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <div>
        <div>Username: <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange.bind(this)}/></div>

        <div>first_name: <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleInputChange.bind(this)}/></div>

        <div>last_name: <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleInputChange.bind(this)}/></div>

        <div>email: <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange.bind(this)}/></div>

        <div>Address:</div>
        
        <div>
          province:
          <select onChange={this.handleKhet.bind(this)}>
            <option value={0}>Select Province</option>
            { this.state.provinces.map((province,index) => {
                return <option key={index} value={province.ProvinceID}>{province.ProvinceName}</option>
              })
            }
          </select>
        </div>

        <div>
          khet:
          <select onChange={this.handleKhwang.bind(this)}>
            <option value={0}>Select Khet</option>
            { this.state.khets.map((khet,index) => {
                return <option key={index} value={khet.KhetID}>{khet.KhetName}</option>
              })
            }
          </select>
        </div>

        <div>
          khwang:
          <select onChange={this.handleZipcode.bind(this)}>
            <option value={0}>Select Khwang</option>
            { this.state.khwangs.map((khwang,index) => {
                return <option key={index} value={khwang.KhwangID}>{khwang.KhwangName}</option>
              })
            }
          </select>
        </div>

        <div>
          zipcode:
          <input type="text" name="zipcode" value={this.state.zipcode}/>
        </div>

        <button onClick={this.handleSave.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default App;
