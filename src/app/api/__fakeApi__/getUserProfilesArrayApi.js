/* eslint no-undef: "off" */
import delay from 'api/__fakeApi__/delay';
import userProfilesArray from 'api/__fakeData__/userProfilesArray';

const getUserProfilesArrayApi = () => new Promise(resolve => {
    setTimeout(() => {
        resolve({userProfilesArray});
    }, delay);
});

export default getUserProfilesArrayApi;