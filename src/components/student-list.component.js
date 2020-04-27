import React, { Component } from "react";
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Loading from '../utils/loading';
import Error from '../utils/error';
import Alert from '../utils/alert';

export default class StudentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [],
      canDisplayView: false,
      isError: false,
      alertVariant: 'none',
      alertMsg: '',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/')
      .then(res => {
        this.setState({
          students: res.data,
          canDisplayView: true,
          isError: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isError: true,
          canDisplayView: true,
        });
      })
  }

  deleteStudent(id) {
    const { students } = this.state;
    axios.delete('http://localhost:4000/students/delete-student/' + id)
      .then((res) => {
        this.setState({
          alertVariant: 'success',
          alertMsg: 'Student successfully deleted!'
        })
      }).catch((error) => {
        this.setState({
          alertVariant: 'error',
          alertMsg: error.response,
        })
        console.log(error);
      })
    this.setState({
      students: students.filter(student => student._id !== id),
    })
  }

  getTableData() {
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
            <Button size="sm" variant="danger" onClick={() => this.deleteStudent(student._id)}>Delete</Button>
          </td>
        </tr>
      )
    }
    )
  }

  handleAlertClose = () => {
    this.setState({
      alertVariant: 'none',
      alertMsg: '',
    })
  }

  render() {
    const { students, canDisplayView, isError, alertVariant, alertMsg } = this.state;

    if (!canDisplayView) {
      return <Loading />;
    }

    if (isError) {
      return <Error />;
    }

    return (
      <>
        {
          canDisplayView ?
            <div className="student-list-wrapper">
              <h1> Student list</h1>
              {
                alertVariant === 'none' ? null : <Alert alertVariant={alertVariant} alertMsg={alertMsg} handleClose={this.handleAlertClose} />
              }
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
                  {
                    students.length ? this.getTableData() : <tr><td colSpan="4"> No data found.</td></tr>
                  }
                </tbody>
              </Table>
            </div>
            : <Loading />
        }
      </>
    );
  }
}
