import React, { Component } from "react";
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default class StudentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      students: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/')
      .then(res => {
        this.setState({
          students: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    const { students } = this.state;
    return students.map((student, index) => {
      return (
        <tr key={index}>
          <td>{student.name}</td>
          <td>{student.email}</td>
          <td>{student.rollno}</td>
          <td>
            <Link className="btn btn-primary btn-sm edit-link" to={"/edit-student/" + student._id}>
              Edit
            </Link>
            <Button size="sm" variant="danger">Delete</Button>
          </td>
        </tr>
      )
    }
    )
  }

  render() {
    return (
      <div className="student-list-wrapper">
        <h1> Student list</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roll No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.DataTable()}
          </tbody>
        </Table>
      </div>
    );
  }
}