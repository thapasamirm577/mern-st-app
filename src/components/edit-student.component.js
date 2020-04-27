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

  componentDidMount() {
    axios.get('http://localhost:4000/students/edit-student/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          rollno: response.data.rollno
        });
      })
      .catch((error) => {
        console.log(error);
      })
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
    axios.put('http://localhost:4000/students/update-student/' + this.props.match.params.id, data)
      .then((res) => {
        console.log(res.data)
        console.log('Student successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    this.props.history.push('/student-list');
  }

  render() {
    const { name, email, rollno } = this.state;
    return (
      <div className="student-create-wapper">
        <h1> Update student list</h1>
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
            Update Student
          </Button>
        </Form>
      </div>
    );
  }
}
