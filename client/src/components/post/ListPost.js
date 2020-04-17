import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { allPost } from "../../actions/authActions";
import { NavLink, Route } from 'react-router-dom';
import { Link, withRouter } from "react-router-dom";
import AddPost from '../post/AddPost';
import axios from 'axios';

class ListPost extends Component {
  constructor( props ) {
		super( props );
  this.state = {
        posts: [],
        loading: true
      }
    }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
	_isMounted = false;

  componentDidMount() {
		this._isMounted = true;
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(response => response.json())
			.then(jsonData => {
				if ( this._isMounted ) {
					this.setState( { posts: jsonData, loading: false } );
				}
			})
  }
  renderPostItems() {
		const postData = this.state.posts;
		if ( postData.length ) {
			return postData.map( post => (
				<div className="card border-primary mb-3" key={post.id}>
					<div className="card-header">{post.id}</div>
					<div className="card-body">
						<Link to={`/post?postId=${post.id}`} className="card-title">{post.title}</Link>
						<p className="card-text">{post.body}</p>
					</div>
				</div>
			) );
		}
	}
  componentWillUnmount() {
		this._isMounted = false;
	}
  render() {

    return (
      <div style={{ height: "15vh" }} className="container valign-wrapper">        
        <div className="row">  
        <div className="my-posts page-wrap">
				
				{ this.renderPostItems() }
			</div>      
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable red accent-3"
            >
              Logout
            </button>
            
          <NavLink style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }} className="btn btn-large waves-effect waves-light hoverable blue accent-3" exact to="/post">Add Post</NavLink>         
          </div>
          <Route path="/post" component={AddPost}/>          
      </div>
      
    );
  }
}

ListPost.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ListPost);
