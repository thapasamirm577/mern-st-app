import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';

export default class CreateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      rollno: ''
    }
  }

  handleStudentNameChange = (evt) => {
    this.setState({
      name: evt.target.value,
    })
  }

  handleStudentEmailChange = (evt) => {
    this.setState({
      email: evt.target.value,
    })
  }

  handleStudentRollnoChange = (evt) => {
    this.setState({
      rollno: evt.target.value,
    })
  }

  handleSubmitDetails = () => {
    const { name, email, rollno } = this.state;
    const data = {
      name,
      email,
      rollno
    };

    if (name === '' || email === '' || rollno === '') {
      console.log("All field are required");
    } else {
      axios.post('http://localhost:4000/students/create-student', data)
        .then((res) => {
          console.log(res.data)
          console.log('Student successfully created')
        }).catch((error) => {
          console.log(error)
        })
      this.resetFormValue();
    }

  }

  resetFormValue = () => {
    this.setState({
      name: '',
      email: '',
      rollno: ''
    })
  }

  render() {
    const { name, email, rollno } = this.state;
    return (
      <div className="student-create-wapper">
        <h1> Create student list</h1>
        <Form>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(evt) => this.handleStudentNameChange(evt)} />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(evt) => this.handleStudentEmailChange(evt)} />
          </Form.Group>

          <Form.Group controlId="Name">
            <Form.Label>Roll No</Form.Label>
            <Form.Control type="number" value={rollno} min='0' onChange={(evt) => this.handleStudentRollnoChange(evt)} />
          </Form.Group>

          <Button variant="danger" size="lg" block="block" onClick={(evt) => this.handleSubmitDetails(evt)}>
            Create Student
          </Button>
        </Form>
      </div>
    );
  }
}
