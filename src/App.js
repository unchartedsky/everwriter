import React, { Component } from 'react';
import { connect } from 'react-redux';
//region bootstrap
import TopNav from './TopNav';
import { Col, Grid, Row } from 'react-bootstrap';
//endregion
//region reapop
import 'babel-polyfill';
import NotificationsSystem, { addNotification as notify } from 'reapop';
import theme from 'reapop-theme-wybo';
//endregion
import MediumEditor from './components/editor/MediumEditor';

import './App.css';

export class App extends Component {
  componentDidUpdate() {
    const { notify } = this.props;

    notify({
      title: 'Syncing',
      message: 'Please be patient, this might take a few second.',
      status: 'info',
      dismissible: true,
      dismissAfter: 3000,
      position: 'br'
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col sm={16}>
            <TopNav />
          </Col>
        </Row>
        <Row>
          <Col sm={0.5} />
          <Col sm={11}>
            <MediumEditor placeholder={'Write something...'} />
          </Col>
          <Col sm={0.5} />
        </Row>
        <Row>
          <Col sm={16}>
            <NotificationsSystem theme={theme} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

let mapStateToProps = state => {
  if (state.evernoteSync) {
    return {
      text: state.evernoteSync.text
    };
  }

  return {};
};

export default connect(mapStateToProps, { notify })(App);
