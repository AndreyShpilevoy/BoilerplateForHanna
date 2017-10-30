import React from 'react';
import {string} from 'prop-types';
import {Link} from 'react-router-dom';
import logo from 'images/logo.svg';

const Logo = ({className, alt}) => (
    <Link to='/MainPage'>
        <img src={logo} className={className} alt={alt} />
    </Link>
);

Logo.propTypes = {
    className: string,
    alt: string
};

Logo.defaultProps = {
    className: '',
    alt: ''
};

export default Logo;
