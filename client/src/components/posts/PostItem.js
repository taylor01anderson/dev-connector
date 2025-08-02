import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import auth from '../../reducers/auth';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  // Define consistent button style
  const buttonStyle = {
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    borderRadius: '0.25rem',
    minHeight: '38px',
    minWidth: '38px',
  };

  return (
    <div className="post bg-white my-1 p-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">{text}</p>
        <button className="btn" style={buttonStyle}>
          <i className="fas fa-thumbs-up"></i> <span>{likes.length}</span>
        </button>
        <button className="btn" style={buttonStyle}>
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link
          to={`/post/${_id}`}
          className="btn btn-primary"
          style={buttonStyle}
        >
          Discussion{' '}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {auth.isAuthenticated &&
          auth.loading === false &&
          user === auth.user._id && (
            <button className="btn btn-danger" style={buttonStyle}>
              <i className="fas fa-times"></i>
            </button>
          )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);
