import React from 'react';
import {string, shape, number} from 'prop-types';

const UserProfile = ({className, userProfile}) => {
    const {id, name} = userProfile;
    const userInfoString = `User id: ${id}, User name: ${name}`;
    return (
        <div className={className}>
            {userInfoString}
        </div>
    );
};

UserProfile.propTypes = {
    className: string,
    userProfile: shape({
        id: number.isRequired,
        name: string.isRequired,
        order: number.isRequired
    }).isRequired
};

UserProfile.defaultProps = {
    className: ''
};

export default UserProfile;
