import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class CreateEntries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      happy: false,
      content: '',
    }
    // bind this to each method
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      date: this.state.date,
      content: this.state.content,
    }
    console.log(entry);

    // send data to backend, json object as second arg
    axios.post('http://localhost:5000/entries/add', entry)
    .then(res => console.log(res.data));
    // take back to homepage (list of entries)
    window.location = '/';
  }

  // there is an onChange event for all the form elements that calls the corresponding methods.

  render() {
    return (
      <div>
        <h2>Add New Entry</h2>
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
              <label>Content:</label>
              <textarea type="text"
              required
              rows="10"
              className="form-control"
              value={this.state.content}
              onChange={this.onChangeContent}
              />
          </div>

          <div className="form-group">
            <input type="submit" value="Save Entry" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}