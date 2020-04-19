import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

// same as create entry except:
// In the componentDidMount method we use axios.get 
  // to get the current exercise from the database and load the data into the state variables. 
// The only difference in the onSubmit method is that the data is posted to the update route.


export default class EditEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      happy: false,
      content: ''
    }
    // bind this to each method
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // called right before anything loads to page, lifecycle method
  componentDidMount() {
    // getting id directly from url
    axios.get('http://localhost:5000/entries/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          content: response.data.content,
          date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const entry = {
      content: this.state.content,
      date: this.state.date
    }
    console.log(entry);

    // send data to backend, json object as second arg
    axios.post('http://localhost:5000/entries/update/'+this.props.match.params.id, entry)
      .then(res => console.log(res.data));
    // take back to homepage (list of entries)
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h2>Edit Entry</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                />
              </div>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
            <label class="form-check-label" for="exampleCheck1">It's a Happy Day</label>
          </div>
          <br></br>
          <div className="form-group">
              <label>Content: </label>
              <textarea type="text"
              required
              rows="10"
              className="form-control"
              value={this.state.content}
              onChange={this.onChangeContent}
              />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Entry" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}