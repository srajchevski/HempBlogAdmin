import React, {Component} from 'react';
import {hashHistory, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import Modal from 'react-modal';

import Header from './components/header/header';
import SideBar from './components/sidebar/sidebar';

class App extends Component {
  constructor(props) {
    super(props)

  }

  componentWillMount() {
  }

  render() {
    return(
      <div className="container body">
        <div className="main_container">
          <div className="col-md-3 left_col">
            <div className="left_col scroll-view">
              <SideBar />
            </div>
          </div>
          <Header />
          <div className="right_col" role="main">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
  }
}


function mapStateToProps(state) {
  var nextState = state.toJS();

  return {
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
