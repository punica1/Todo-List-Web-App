import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar, Container, Row, Col} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';


/**
 * This is a page for displaying all todos in db.
 * Supports three ways of ordering.
 */
class ShowAllList extends Component {


  constructor(props) {

    super(props);
    this.state = {
      todos: [],
      next:'',
      previous:'',
      ordering:props.ordering
    };
  }

  async componentDidMount() {
    var url;
    if (this.state.ordering != null)
      url = 'http://127.0.0.1:8000/api/?ordering=' + this.state.ordering;
    else url = 'http://127.0.0.1:8000/api/';

    console.log(url)
    try {
      const res = await axios.get(url)
          .then((res)=>
              this.setState({
                todos:res.data.results,
                next:res.data.next,
                previous:res.data.previous
              })
          );
    } catch (e) {
      console.log(e);
    }
  }

  handleButtonClick = (e) =>{
    if (e.target.name === 'next') {
      //console.log(this.state.next);
      const res = axios.get(this.state.next)
          .then((res)=>
              this.setState({
                todos:res.data.results,
                next:res.data.next,
                previous:res.data.previous
              })
          );
    }
    else if (e.target.name === 'prev'){
      //console.log(this.state.previous);
      const res = axios.get(this.state.previous)
          .then((res)=>
              this.setState({
                todos:res.data.results,
                next:res.data.next,
                previous:res.data.previous
              })
          );
    }
  }


  render() {

    console.log(this.state.ordering);
    return (
        <Container>
          <Row>
            <Col> </Col>

            <Col xs={10}>

          <Container>
            <Row>
              <Col><span className="d-flex justify-content-between align-items-center mb-3">Select todo to change</span></Col>
              <Col xs={6}></Col>
              <Col align = 'right'>
                <DropdownButton id="dropdown-basic-button" title="Ordering">
                  <Dropdown.Item href='/?ordering=expireDate'>Expire Date</Dropdown.Item>
                  <Dropdown.Item href="/?ordering=priority">Priority</Dropdown.Item>
                  <Dropdown.Item href="/">Create Order</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
          </Container>

          <div class="d-flex p-2 bd-highlight">

            <Table striped bordered hover>
              <thead>
              <tr>

                <th scope="col" >

                  {/*<div ><span><input type="checkbox" id="action-toggle" /> </span></div>*/}
                  <div ><span>id</span></div>
                </th>
                <th scope="col">
                  <div><span>Todo</span></div>
                </th>
                <th scope="col">
                  <div><span>Priority</span></div>
                </th>

                <th scope="col">
                  <div><span>Expire Date</span></div>
                </th>

                <th scope="col">
                  <div><span>Completed?</span></div>
                </th>
              </tr>
              </thead>

              <tbody>
                {this.state.todos.map(item => (
                  <tr className={item.id}>
                    {/*<td><input type="checkbox" name="_selected_action" value={item.id}/></td>*/}
                    <td> {item.id} </td>

                    <th scope='row'>
                      <Link to={{ pathname: "/addList", search: "?itemid="+ item.id  }}>
                        {item.title}
                      </Link>
                    </th>

                    <th>
                      <span>{item.priority}</span>
                    </th>

                    <th>
                      <span>{item.expireDate}</span>
                    </th>

                    <th>
                      <span>{item.completed.toString()}</span>
                    </th>

                  </tr>))
                }
              </tbody>

            </Table>
          </div>

          <div>
            <ButtonToolbar>

              <Button variant="light" name = 'prev' onClick={this.handleButtonClick}>Prev</Button>
              <Button variant="light" name = 'next' onClick={this.handleButtonClick}>Next</Button>
            </ButtonToolbar>
          </div>

          </Col>

          <Col> </Col>
          </Row>
        </Container>
    );
  }
}

export default ShowAllList;
