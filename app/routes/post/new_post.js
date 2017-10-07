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
import 'react-datepicker/dist/react-datepicker.css';

const countries = ["EN","SLO"];
const categories = ["kat1", "kat2", "kat3", "kat4", "kat5"];

class NewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {rte_val: RichTextEditor.createEmptyValue(), image:null};
    }

    componentWillMount() {
        // get offer
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

    createPost(vals) {
        let values = vals.toJS();
        if (this.state.rte_val.toString('markdown').trim()!="" && this.state.image) {
            // create
            let data = new FormData();
            data.append("title", values.title);
            data.append("category", values.category);
            data.append("url", values.url);
            data.append("content", this.state.rte_val.toString('html'));
            data.append("post_image", this.state.image);
            this.context.router.push('/');
            // redirect to dashboard
        }
        else {
            if (!this.state.image) {
                console.log("no img");
            }
            if (this.state.rte_val.toString('markdown').trim()=="") {
                console.log("rte empty");
            }
        }
    }

    render () {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div>
                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="home">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Create new post</h2>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <form onSubmit={handleSubmit(this.createPost.bind(this))}>
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

const renderField = ({name, label, placeholder, type, meta: {touched, warning, error}}) => {
    return (
        <div className="col-md-6" style={{marginTop:15}}>
            <label htmlFor="name">{label}</label>
            <input type={type} {...name} className="form-control" placeholder={placeholder}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    );
};
const renderSelect = ({name, label, options, meta: {touched, warning, error}}) => {
    return (
        <div className="col-md-6" style={{marginTop:15}}>
            <label htmlFor="name">{label}</label>
            <select {...name} className="form-control">
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

    /*if (!values.title) {
        errors.title = "Specify title";
    }
    if (!values.url) {
        errors.url = "Specify URL";
    }*/

    return errors;
};

NewPost.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};
NewPost.contextTypes = {
    router: PropTypes.object
};

export default compose(
    reduxForm({
        form: 'Create_Post_form',
        validate
    })
)(NewPost);