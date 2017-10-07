import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import DatePicker from "react-datepicker";
import Dropzone from 'react-dropzone';
import Immutable from 'immutable';
import {Link} from 'react-router';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const countries = ["EN","SLO"];
const categories = ["kat1", "kat2", "kat3", "kat4", "kat5"];

class PostDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {tab:'info', date_added:moment(), image:null};
    }

    componentWillMount() {
        // get post
    }

    changeTab(tab) {
        this.setState({tab});
    }
    dateChange(date_added) {
        this.setState({date_added});
    }
    onDrop(files) {
        this.setState({image: files[0]});
    }
    uploadImg() {
        this.refs.dropzone.open();
    }
    changeContent(rte_val) {
        this.setState({rte_val});
    }

    editPost(values){

    }

    render () {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li role="presentation" onClick={this.changeTab.bind(this, 'info')} className={`${this.state.tab == 'info' ? 'active' : ''}`}><a href="#">Info</a></li>
                    <li role="presentation" onClick={this.changeTab.bind(this, 'edit')} className={` ${this.state.tab == 'edit' ? 'active' : ''}`}><a href="#">Edit</a></li>
                </ul>
                <div className={`tab-content ${this.state.tab == 'info' ? '' : 'hidden'}`}>
                    <div role="tabpanel" className="tab-pane active" id="home">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Post details</h2>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <form>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="name">Club</label>
                                            <p name="name" className="form-controll">FC Bayern München</p>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="name">League</label>
                                            <p name="name" className="form-controll">425454353453</p>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="name">Country</label>
                                            <p name="name" className="form-controll">Germany</p>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="name">Date</label>
                                            <p name="name" className="form-controll">Ljubljanska ulica 6</p>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="name">Category</label>
                                            <p name="name" className="form-controll">Sasa Marinkovic</p>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="name">Position</label>
                                            <p name="name" className="form-controll">www.bayern.de</p>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="name">Owner</label>
                                            <p name="name" className="form-controll">Bundes liga</p>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="name">Price</label>
                                            <p name="name" className="form-controll">Bundes liga</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`tab-content ${this.state.tab == 'edit' ? '' : 'hidden'}`}>
                    <div role="tabpanel" className="tab-pane active" id="home">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Edit post</h2>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <form onSubmit={handleSubmit(this.editPost.bind(this))}>
                                    <div className="row">
                                        <Field name="title" type="text" component={renderField} label="Title" />
                                        <Field name="category" type="text" component={renderSelect} options={categories} label="Category"/>
                                        <Field name="url" type="text" component={renderField} label="URL"/>
                                        <div className="col-md-6" style={{marginTop:15}}>
                                            <label style={{display:"block"}}>Post image</label>
                                            <button type="button" className="btn btn-primary" onClick={this.uploadImg.bind(this)}>Choose image</button>
                                            <Dropzone ref="dropzone" onDrop={this.onDrop.bind(this)} multiple={false} accept="image/*" style={{display:'none'}} />
                                            {this.state.image ? <a target="_blank" href={`${typeof this.state.image == 'string' ? `localhost:3000${this.state.image}` : this.state.image.preview}`}>
                                                <img style={{width: 32, height: 32}} src={`${typeof this.state.image == 'string' ? this.state.image : this.state.image.preview}`}/>
                                            </a> : "" }
                                        </div>
                                        <div className="col-md-12" style={{marginTop:15}}>
                                            <label>Content</label>
                                            <RichTextEditor
                                                value={this.state.rte_val}
                                                onChange={this.changeContent.bind(this)}
                                            />
                                        </div>
                                        <div className="col-md-12" style={{marginTop:15}} >
                                            <button style={{float:"right",width:"30%",margin:"0 auto"}} className="btn btn-primary">Save</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const renderField = ({input, label, placeholder, type, meta: {touched, warning, error}}) => {
    return (
        <div className="col-md-4">
            <label htmlFor="name">{label}</label>
            <input type={type} {...input} className="form-control" placeholder={placeholder}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    );
};
const renderSelect = ({input, label, options, meta: {touched, warning, error}}) => {
    return (
        <div className="col-md-4">
            <label htmlFor="name">{label}</label>
            <select {...input} className="form-control">
                {options.map((opt)=>{
                    return (<option key={opt} value={opt}>{opt}</option>);
                })};
            </select>
        </div>
    );
};

const validate = values => {
    const errors = {}
    if(values) {
        values = values.toJS();
    }

    return errors;
}

PostDetails.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
}

export default compose(
    reduxForm({
        form: 'Edit_Post_form',
        validate
    })
)(PostDetails);