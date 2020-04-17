import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { createPost } from "../../actions/authActions";
import classnames from "classnames";

class AppPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",      
      errors: {},
      newPosts: [],
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      title: this.state.title,      
      description: this.state.description
    };

    this.props.createPost(newPost, this.props.history);
  };
  renderNewPosts = () => {
		const {newPosts} = this.state;
		if ( newPosts.length ) {
			return newPosts.map( post => (
				<div className="card border-primary mb-3">
					<div className="card-header">{post.id}</div>
					<div className="card-body">
						<h5 className="card-title">{post.title}</h5>
						<p className="card-text">{post.body}</p>
					</div>
				</div>
			) );
		}
	};

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              dashboard
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add Post</b> below
              </h4>             
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}
                  id="title"
                  type="text"
                  className={classnames("", {
                    invalid: errors.title
                  })}
                />
                <label htmlFor="title">Post Title</label>
                <span className="red-text">{errors.title}</span>
              </div>              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.description}
                  error={errors.password}
                  id="description"
                  type="text"
                  className={classnames("", {
                    invalid: errors.description
                  })}
                />
                <label htmlFor="description">Post Description</label>
                <span className="red-text">{errors.description}</span>
              </div>
              
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Create
                </button>
              </div>
            </form>
            { this.renderNewPosts() }
          </div>
        </div>
      </div>
    );
  }
}

AppPost.propTypes = {
    createPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createPost }
)(withRouter(AppPost));
