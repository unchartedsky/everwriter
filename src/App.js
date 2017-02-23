import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TopNav from './TopNav';
import { Grid, Row, Col } from 'react-bootstrap';
import Editor from './Editor';

class App extends Component {
  render() {
    return (
        <Grid>
          <Row>
            <Col sm={16}>
              <TopNav/>
            </Col>
          </Row>
          <Row>
            <Col sm={0.5}/>
            <Col sm={11}>
              <Editor placeholder={'Write something...'}/>
            </Col>
            <Col sm={0.5}/>
          </Row>
        </Grid>
    );
  }
}

export default App;
