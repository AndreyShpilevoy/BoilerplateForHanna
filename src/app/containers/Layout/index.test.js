/* eslint no-undef: 0, react/no-multi-comp:0, react/prop-types:0 react/display-name: 0, react/jsx-filename-extension: 0 */

import React from 'react';
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import Layout, {LayoutPure} from './index';

configure({adapter: new Adapter()});

jest.mock('./reducer', () => ({
    getLocale: () => ({type: 'MOCK'})
}));

describe('MainPage', () => {
    const mockStore = configureMockStore();

    it('LocalePure match expected snapshot', () => {
        const props = {
            locale: 'EN',
            children: 'content',
            getLocale: () => {}
        };
        expect(shallow(<LayoutPure {...props} />)).toMatchSnapshot();
    });

    it('MainPage match expected snapshot', () => {
        const props = {
            store: mockStore({layoutReducer: {locale: 'EN'} })
        };
        expect(mount(<Layout {...props}>content</Layout>, {lifecycleExperimental: true})).toMatchSnapshot();
    });
});
