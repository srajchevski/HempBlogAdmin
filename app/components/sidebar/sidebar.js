import React, { Component } from 'react';
import {Link} from 'react-router';

const tabs = ['Dashboard', 'Statistics', 'Profiles']

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {activeTab: 'Dashboard'}
  }

  setTab(tab) {
    this.setState({activeTab: tab});
  }

  renderLine(tab) {
    return (
      <li key={tab} role="presentation" onClick={this.setTab.bind(this, tab)} className={`${this.state.activeTab == tab ? 'active' : ''}`}><a href="#">{tab}</a></li>
    )
  }

  render () {
    return (
        <div>


          <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
            <div className="menu_section">
              <div className="navbar nav_title" style={{textAlign:"center"}}>
                <a className="site_title" style={{height:"auto"}}>
                  <span className="glyphicon glyphicon-leaf"></span>
                  <span>HempMedico Blog</span>
                </a>
              </div>
              <ul className="nav side-menu">
                <li><Link to="/"><i className="glyphicon glyphicon-home"></i> Dashboard</Link>
                </li>
                <li><Link to="/posts/create"><i className="glyphicon glyphicon-plus"></i> Add Post</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default SideBar;
