import './App.css';
import React, { Component, PropTypes} from 'react';
import {  Form, Alert, Button, ButtonToolbar, Container, Row, Col} from 'react-bootstrap';
import { Redirect, withRouter,  BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

/**
 * This is a page to show the details of a todo object.
 * Also, you can create a new todo from this page.
 */
class ChangeList extends Component {

    constructor(props) {

        super(props);
        var itemid = props.itemid;

        if (itemid == null) itemid = -1;
        this.state = {
            id:'',
            title:'',
            description:'',
            expireDate:'',
            completed: false,
            item_id:itemid,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);


  }

    componentDidMount()
    {
        if (this.state.item_id > -1) {
            const res = axios.get(`http://127.0.0.1:8000/api/` + this.state.item_id)
                .then((res) =>
                    this.setState({
                    id:res.data.id,
                    title:res.data.title,
                    description:res.data.description,
                    expireDate :res.data.expireDate,
                    completed:res.data.completed
                }
                ));
        }
    }


    // getInitialState() {
    //     return { title: '', description:'', expireDate:'', completed: false, priority:3 }
    // }

    onSubmit = (e) => {
        e.preventDefault();
        const { title, description, expireDate, priority,completed} = this.state;
        //console.log(title + "xxx" + description);

        if (this.state.id === '')
            axios.post(`http://localhost:8000/api/addTodo/`, { title , description, expireDate, priority, completed})
              .then((result) => {
                console.log(result);
            });

        else{
            axios.put(`http://localhost:8000/api/`+this.state.id+'/', { title , description, expireDate, priority, completed})
              .then((result) => {
                  console.log(result);
              });
        }

        this.props.history.push('../');

    }

    onDelete =(e) =>{
            axios.delete(`http://localhost:8000/api/`+this.state.id+'/')
              .then((result) => {
                console.log(result);
        });
            this.props.history.push('../');
    }

    onChange = (e) => {
        //console.log(1111);
        if (e.target.name === 'completed') {
            this.setState({completed:!this.state.completed});
        }
        else
            this.setState({ [e.target.name]: e.target.value });
    }


    render(){
        console.log(this.state.completed);
        return(
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                         <Form onSubmit={this.onSubmit}>
                          <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={this.onChange} value={this.state.title} type="text"name="title" required  />
                          </Form.Group>

                          <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" onChange={this.onChange} value={this.state.description}  name="description" required/>
                          </Form.Group>

                          <Form.Group controlId="expireDate">
                            <Form.Label>Expire Date</Form.Label>
                            <Form.Control onChange={this.onChange} value={this.state.expireDate} type="text"name="expireDate" required  />
                          </Form.Group>

                          <Form.Group controlId="priority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control as="select" value={this.state.priority} name = 'priority'>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Check
                            type='checkbox' id='completed' label='completed' onClick={this.onChange}  value = {this.state.completed}
                            checked={this.state.completed} name = "completed"
                          />

                          <Form.Group></Form.Group>

                         <Button  name="taskAdd" type="submit" variant="success">Save</Button> &nbsp;
                         <Button onClick={this.onDelete} name="taskDelete" formNoValidate  variant="danger">Delete</Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );}
}
export default  withRouter(ChangeList);