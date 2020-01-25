import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../redux/actions/@profile';
import { getCurrentProfile } from '../../redux/actions/@profile';

const EditProfile = ({
  getCurrentProfile,
  updateProfile,
  profile: { profile, isLoading },
  history
}) => {
  const [profileData, setProfileData] = useState({
    role: '',
    course: '',
    universityName: '',
    hobbies: '',
    facebook: '',
    instagram: ''
  });
  const {
    role,
    course,
    universityName,
    hobbies,
    facebook,
    instagram
  } = profileData;

  useEffect(() => {
    console.log('hello there');
    getCurrentProfile();
    setProfileData({
      role: !profile.role ? '' : profile.role,
      course: !profile.course ? '' : profile.course,
      universityName: !profile.universityName ? '' : profile.universityName,
      hobbies: !profile.hobbies ? '' : profile.hobbies.toString(),
      facebook: !profile.social ? '' : profile.social.facebook,
      instagram: !profile.social ? '' : profile.social.instagram
    });
  }, [isLoading, getCurrentProfile]);

  const onChange = e => {
    console.log('changed');
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    updateProfile(profileData, history);
    console.log('from update profile', profileData);
  };

  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <fieldset>
          <legend>Enter profile details</legend>
          <select name='role' value={role} onChange={e => onChange(e)}>
            <option value='0'>select role</option>
            <option value='student'>student</option>
            <option value='teacher'>teacher</option>
          </select>

          <select name='course' value={course} onChange={e => onChange(e)}>
            <option value='0'>choose course</option>
            <option value='ba'>b.a</option>
            <option value='bsc'>bsc</option>
          </select>
          <input
            type='text'
            name='universityName'
            value={universityName}
            onChange={e => onChange(e)}
            placeholder='Enter university name'
          />
          <input
            type='text'
            name='hobbies'
            value={hobbies}
            onChange={e => onChange(e)}
            placeholder='Do you have hobbies'
          />
          <div>
            <h4>Social network</h4>
            <input
              type='text'
              name='facebook'
              value={facebook}
              onChange={e => onChange(e)}
              placeholder='facebook link'
            />
            <input
              type='text'
              name='instagram'
              value={instagram}
              onChange={e => onChange(e)}
              placeholder='instagram link'
            />
          </div>
          <button type='submit'>submit</button>
        </fieldset>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log('this is state', state.profile);
  return { profile: state.profile };
};
export default connect(mapStateToProps, { updateProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
