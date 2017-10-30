/* eslint-disable no-undef, max-statements, import/first, react/jsx-filename-extension */

import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Division from './index';

configure({adapter: new Adapter()});

describe('Division', () => {
    it('Division match expected snapshot', () => {
        const division = {id: 1, title: 'company', HID: 12};
        expect(shallow(<Division className='division-class-name' division={division} />)).toMatchSnapshot();
    });
});
