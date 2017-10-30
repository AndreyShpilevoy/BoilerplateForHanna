import React from 'react';
import {string, shape, number} from 'prop-types';

const Division = ({className, division}) => {
    const {id, title, HID} = division;
    const userInfoString = `Division id: ${id}, title: ${title}, HID: ${HID}`;
    return (
        <div className={className}>
            {userInfoString}
        </div>
    );
};

Division.propTypes = {
    className: string,
    division: shape({
        id: number.isRequired,
        title: string.isRequired,
        HID: number.isRequired
    }).isRequired
};

Division.defaultProps = {
    className: ''
};

export default Division;
