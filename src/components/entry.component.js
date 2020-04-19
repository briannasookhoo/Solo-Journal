import React from 'react';
import { Link } from 'react-router-dom';

// functional react component, just accepts props and returns jsx
const Entry = props => (
  <table className="table table-hover table-light">
      <thead className="thead-light">
        <tr>
        <th> 
          {props.entry.date.substring(0,10)} | 
          <Link to={"/edit/"+props.entry._id}>edit</Link> |
          <a href="#" onClick={() => { props.deleteEntry(props.entry._id) }}>delete</a>
        </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="td-light">{props.entry.content}</td>
        </tr>
      </tbody>
  </table>
)
// actions column w output two links. 
// One link goes to the edit route and the other calls the deleteExercise method.

export default Entry;