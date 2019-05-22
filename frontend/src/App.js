import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ShowAllList from './ShowAllList';
import { Button, ButtonToolbar, Container, Row, Col} from 'react-bootstrap';
import ChangeList from "./ChangeList";

class App extends Component {


  render() {
    return (
      <Router>
         <Container>
           <Row>
             <Col align = 'center'>
               <h2>Manage Your Todo Lists!</h2>
             </Col>
           </Row>
           <Row>
              <Col></Col>
              <Col align = 'center'>
                <Route render={({ history}) => (
                  <Button
                    type='button' variant="info"
                    onClick={() => { history.push('/addlist') }}>
                    Add a new todo!
                  </Button>
                )} />
              </Col>
              <Col></Col>
           </Row>
           <Row></Row>

           <Route exact path="/" component={ShowList} />
           <Route path="/addlist" component={AddList} />
        </Container>
      </Router>
    );
  }

}

export default App;

function AddList({location}) {
  //console.log("function called!")
  let params = new URLSearchParams(location.search);

  return <ChangeList itemid = {params.get('itemid')} />;
}

function ShowList({location}){
  let params = new URLSearchParams(location.search);
  return <ShowAllList ordering = {params.get('ordering')} />;
}

