/* eslint-disable no-undef, max-statements, import/first, react/jsx-filename-extension */

import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserProfile from './index';

configure({adapter: new Adapter()});

describe('UserProfile', () => {
    it('UserProfile match expected snapshot', () => {
        const userProfile = {id: 1, name: 'some user', order: 1};
        expect(shallow(<UserProfile className='userProfile-class-name' userProfile={userProfile} />)).toMatchSnapshot();
    });
});
