import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

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
    console.log(`Name: ${this.state.name}`, `Email: ${this.state.email}`, `Roll no: ${this.state.rollno}`);
    console.log(`Student successfully created!`);
    this.resetFormValue();
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
      <div className="form-wrapper">
        <h1> Create student list</h1>
        <Form>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={this.handleStudentNameChange} />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={this.handleStudentEmailChange} />
          </Form.Group>

          <Form.Group controlId="Name">
            <Form.Label>Roll No</Form.Label>
            <Form.Control type="number" value={rollno} onChange={this.handleStudentRollnoChange} />
          </Form.Group>

          <Button variant="danger" size="lg" block="block" onClick={this.handleSubmitDetails}>
            Create Student
          </Button>
        </Form>
      </div>
    );
  }
}
