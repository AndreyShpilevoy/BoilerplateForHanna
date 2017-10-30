/* eslint-disable no-undef, max-statements, import/first, react/jsx-filename-extension */

import React from 'react';
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import MainPage, {MainPagePure} from './index';

configure({adapter: new Adapter()});

jest.mock('./reducer', () => ({
    getUserProfilesArray: () => ({type: 'MOCK'}),
    getDivisionsArray: () => ({type: 'MOCK'})
}));

jest.mock('react-router-dom/Link');

describe('MainPage', () => {
    const mockStore = configureMockStore();

    it('MainPagePure without data match expected snapshot', () => {
        const props = {
            userProfilesArray: [],
            divisionsArray: [],
            getUserProfilesArray: () => {},
            getDivisionsArray: () => {}
        };
        expect(shallow(<MainPagePure {...props} />)).toMatchSnapshot();
    });

    it('MainPagePure with data match expected snapshot', () => {
        const props = {
            userProfilesArray: [
                {id: 1, name: 'Ben', order: 1},
                {id: 2, name: 'Suzan', order: 2}
            ],
            divisionsArray: [
                {id: 1, title: 'Soda', HID: 1},
                {id: 2, title: 'Water inc.', HID: 3}
            ],
            getUserProfilesArray: () => {},
            getDivisionsArray: () => {}
        };
        expect(shallow(<MainPagePure {...props} />)).toMatchSnapshot();
    });

    it('MainPage without data match expected snapshot', () => {
        const props = {
            store: mockStore({mainPageReducer: {userProfilesArray: [], divisionsArray: [] } })
        };
        expect(mount(<MainPage {...props} />, {lifecycleExperimental: true})).toMatchSnapshot();
    });

    it('MainPage with data match expected snapshot', () => {
        const props = {
            store: mockStore({mainPageReducer: {
                userProfilesArray: [
                    {id: 1, name: 'Ben', order: 1},
                    {id: 2, name: 'Suzan', order: 2}
                ],
                divisionsArray: [
                    {id: 1, title: 'Soda', HID: 1},
                    {id: 2, title: 'Water inc.', HID: 3}
                ] } })
        };
        expect(mount(<MainPage {...props} />, {lifecycleExperimental: true})).toMatchSnapshot();
    });
});
