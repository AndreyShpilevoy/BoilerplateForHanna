/* eslint no-undef: "off" */
import delay from 'api/__fakeApi__/delay';
import divisionsArray from 'api/__fakeData__/divisionsArray';

const getDivisionsArrayApi = () => new Promise(resolve => {
    setTimeout(() => {
        resolve({divisionsArray});
    }, delay);
});

export default getDivisionsArrayApi;