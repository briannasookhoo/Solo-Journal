import React, { Component } from 'react';
import axios from 'axios';

import Entry from "./entry.component";


export default class HappyList extends Component {
  constructor(props) {
    super(props);
    this.state = {entries: []};
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  // get list of entries from database
  componentDidMount() {
    axios.get('http://localhost:5000/entries/happy')
      .then(response => {
        console.log(response.data)
        this.setState({ entries: response.data }) 
      })
      .catch(error => {
        console.log(error);
      })
  }

  deleteEntry(id) {
    axios.delete('http://localhost:5000/entries/'+id)
      .then(res => console.log(res.data));
    this.setState({
      // set state of entries only whose id is not the id that was deleted
      entries: this.state.entries.filter(el => el._id !== id)
    })
  }

  // iterates through the list of entries by using the map function. 
  // Each entry is output with the Entry component.
  // The current entry is assigned to the entry property of this component.
  entryList() {
    return this.state.entries.map(currententry => {
      return <Entry entry={currententry} deleteEntry={this.deleteEntry} key={currententry._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h2>Journal</h2>
          { this.entryList() }
      </div>
    )
  }
}