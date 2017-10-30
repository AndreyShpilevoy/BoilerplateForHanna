/* eslint no-undef: "off" */
import delay from 'api/__fakeApi__/delay';
import locale from 'api/__fakeData__/locale';

const getLocaleApi = () => new Promise(resolve => {
    setTimeout(() => {
        resolve({locale});
    }, delay);
});

export default getLocaleApi;