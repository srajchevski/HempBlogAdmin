import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, router} from 'react-router';
import DatePicker from "react-datepicker";
import moment from 'moment';
import PropTypes from 'prop-types';
import Pagination from "react-js-pagination";
import Modal from 'react-modal';
//import "bootstrap/less/bootstrap.less";
import 'url-search-params-polyfill';
import 'react-datepicker/dist/react-datepicker.css';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        minWidth              : '40%',
        transform             : 'translate(-50%, -50%)'
    }
};
const data = [{_id:"721s2", title:"CBD+", category:"kat1", url:"www.hempmedico.com/cbd", language:"SLO", post_image:"/img/coekot.jpg", date_added:"19.09.2017"},
    {_id:"scmo2", title:"Hemp = ambrosia", category:"kat2", url:"www.hempmedico.com/hemp-ambrosia", language:"EN", post_image:"/img/img.jpg", date_added:"19.09.2017"},
    {_id:"pokn8", title:"CannaHoney", category:"kat3", url:"www.hempmedico.com/cannabis-honey", language:"EN", post_image:"/img/mourinho.jpg", date_added:"19.09.2017"}];

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {tab:'kat1', page:1, search:'', fromDate: moment().subtract(1, 'months'), toDate: moment(), deleteModal:false, activePost:null}
    }

    componentWillMount() {
        let query = this.props.location.query;

        if (query.page) {
            this.setState({page: parseInt(query.page)});
        } else {
            query = {...query, page: this.state.page};
            this.context.router.push({...this.props.location, query});
        }
        if (query.tab) {
            this.setState({tab: query.tab})
        } else {
            query = {...query, tab: this.state.tab};
            this.context.router.push({...this.props.location, query});
        }
        if (query.fromDate) {
            this.setState({fromDate: moment.unix(query.fromDate)});
        } else {
            query = {...query, fromDate: this.state.fromDate.unix()};
            this.context.router.push({...this.props.location, query});
        }
        if (query.toDate) {
            this.setState({toDate: moment.unix(query.toDate)});
        } else {
            query = {...query, toDate: this.state.toDate.unix()}
            this.context.router.push({...this.props.location, query});
        }
        if (query.search) {
            this.setState({search: query.search})
        } else {
            query = {...query, search: this.state.search}
            this.context.router.push({...this.props.location, query});
        }
        // get
    }

    openModal(activePost){
        this.setState({deleteModal:true, activePost});
    }
    closeModal(){
        this.setState({deleteModal:false});
    }
    changeFromDate(fromDate) {
        let query = {...this.props.location.query, fromDate: fromDate.unix()};
        this.context.router.push({...this.props.location, query});
        // get posts
        this.setState({fromDate});
    }
    changeToDate(toDate){
        let query = {...this.props.location.query, toDate: toDate.unix()};
        this.context.router.push({...this.props.location, query});
        // get posts
        this.setState({toDate});
    }
    changeTab(tab) {
        let query = {...this.props.location.query, tab: tab};
        this.context.router.push({...this.props.location, query});
        // get posts
        this.setState({tab});
    }
    changeSearch(event) {
        console.log("term: ", event.target.value);
        let query = {...this.props.location.query, search: event.target.value};
        this.context.router.push({...this.props.location, query});
        // get?
        this.setState({search: event.target.value});
    }
    changePage(page) {
        let query = {...this.props.location.query, page: page};
        this.context.router.push({...this.props.location, query});
        // get
        this.setState({page});
    }

    renderSingleRow(row) {
        return (
            <tr key={row._id}>
              <td>{row.title}</td>
              <td>{row.category}</td>
              <td>{row.url}</td>
              <td>{row.language}</td>
              <td><Link to="posts/1312"><span className="glyphicon glyphicon-search"></span></Link></td>
              <td><a style={{cursor:"pointer"}} onClick={this.openModal.bind(this, row)}><span className="glyphicon glyphicon-trash"></span></a></td>
            </tr>
        );
    }

    deletePost() {
        // del activePost._id
        this.closeModal();
    }

    render () {
        return (
            <div>
              <div className="page-header">
                <h1> Dashboard </h1>
              </div>

              <div>
                <div className="panel-body">
                    <div className="row" style={{backgroundColor:"#fff", paddingTop:20, paddingBottom:20, margin:0, marginBottom: 20}}>
                        <div className="col-md-3">
                            <label style={{display:'block'}}>From</label>
                            <DatePicker selected={this.state.fromDate}
                                        onChange={this.changeFromDate.bind(this)}
                                        maxDate={this.state.toDate}
                                        dateFormat="DD/MM/YYYY" />
                        </div>
                        <div className="col-md-3">
                            <label style={{display:'block'}}>To</label>
                            <DatePicker selected={this.state.toDate}
                                        onChange={this.changeToDate.bind(this)}
                                        minDate={this.state.fromDate}
                                        dateFormat="DD/MM/YYYY" />
                        </div>
                        <div className="col-md-3 col-md-offset-3">
                            <label>Search</label>
                            <div className="input-group">
                                  <input type="text" className="form-control" value={this.state.search} onChange={this.changeSearch.bind(this)} placeholder="Search for..." />
                                  <span className="input-group-addon" id="basic-addon2"><span className="glyphicon glyphicon-search"></span></span>
                            </div>
                        </div>

                    </div>

                    <ul className="nav nav-tabs">
                        <li role="presentation" onClick={this.changeTab.bind(this, 'kat1')} className={`${this.state.tab == 'kat1' ? 'active' : ''}`}><a href="#">Kat 1</a></li>
                        <li role="presentation" onClick={this.changeTab.bind(this, 'kat2')} className={` ${this.state.tab == 'kat2' ? 'active' : ''}`}><a href="#">Kat 2</a></li>
                        <li role="presentation" onClick={this.changeTab.bind(this, 'kat3')} className={` ${this.state.tab == 'kat3' ? 'active' : ''}`}><a href="#">Kat 3</a></li>
                        <li role="presentation" onClick={this.changeTab.bind(this, 'kat4')} className={` ${this.state.tab == 'kat4' ? 'active' : ''}`}><a href="#">Kat 4</a></li>
                        <li role="presentation" onClick={this.changeTab.bind(this, 'kat5')} className={` ${this.state.tab == 'kat5' ? 'active' : ''}`}><a href="#">Kat 5</a></li>
                        <li role="presentation" onClick={this.changeTab.bind(this, 'all')} className={` ${this.state.tab == 'all' ? 'active' : ''}`}><a href="#">All</a></li>
                    </ul>

                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id="home">
                            <div className="x_panel">
                                <div className="x_content">
                                    <table className="table table-hover">
                                        <thead>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>URL</th>
                                        <th>Language</th>
                                        <th>Details/Edit</th>
                                        <th>Delete</th>
                                        </thead>
                                        <tbody>
                                            {data.map(this.renderSingleRow.bind(this))}
                                        </tbody>
                                    </table>

                                    <Pagination
                                        activePage={this.state.page}
                                        itemsCountPerPage={20}
                                        totalItemsCount={65}
                                        onChange={this.changePage.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    <Modal
                        isOpen={this.state.deleteModal}
                        onRequestClose={this.closeModal.bind(this)}
                        style={customStyles}
                        contentLabel="delete_post_modal" >
                        <div className="modal-header">
                            <h2>Delete post</h2>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this post?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" onClick={this.closeModal.bind(this)}>Cancel</button>
                            <button className="btn btn-success" onClick={this.deletePost.bind(this)}>Delete</button>
                        </div>
                    </Modal>
                </div>
              </div>
            </div>
        );
    }
}

Dashboard.contextTypes = {
    router: React.PropTypes.object
};

export default Dashboard;