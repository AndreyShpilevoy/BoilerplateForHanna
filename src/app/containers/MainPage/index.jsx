import React, {PureComponent} from 'react';
import {func, arrayOf, shape, number, string} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Logo from 'components/Logo';
import UserProfile from 'components/UserProfile';
import Division from 'components/Division';
import {getUserProfilesArray, getDivisionsArray} from './reducer';
import {sortedUserProfilesArraySelector, divisionsArraySelector} from './selectors';
import styles from './index.css';

export class MainPagePure extends PureComponent {
    static propTypes = {
        getUserProfilesArray: func.isRequired,
        getDivisionsArray: func.isRequired,
        userProfilesArray: arrayOf(
            shape({
                id: number.isRequired,
                name: string.isRequired,
                order: number.isRequired
            })
        ).isRequired,
        divisionsArray: arrayOf(
            shape({
                id: number.isRequired,
                title: string.isRequired,
                HID: number.isRequired
            })
        ).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            pathToFile: 'src/containers/MainPage/index.js'
        };
    }

    componentDidMount() {
        this.props.getUserProfilesArray();
        this.props.getDivisionsArray();
    }

    mapUserProfiles = userProfilesArray => userProfilesArray.map(x => <UserProfile key={x.id} userProfile={x} />);
    mapDivisions = divisionsArray => divisionsArray.map(x => <Division key={x.id} division={x} />);

    render() {
        const {pathToFile} = this.state;
        const {userProfilesArray, divisionsArray} = this.props;
        const title = 'Welcome to React';
        return (
            <div className={styles.app}>
                <div className={styles.appHeader}>
                    <Logo className={styles.appLogo} alt='logo' />
                    <h2>
                        {title}
                    </h2>
                </div>
                <p className={styles.appIntro}>
                    {'To get started, edit '}
                    <code>{pathToFile}</code>
                    {' and save to reload.'}
                </p>
                <div>User profiles list:</div>
                {this.mapUserProfiles(userProfilesArray)}
                <div>Divisions list:</div>
                {this.mapDivisions(divisionsArray)}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    userProfilesArray: sortedUserProfilesArraySelector(state),
    divisionsArray: divisionsArraySelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getUserProfilesArray,
        getDivisionsArray
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainPagePure);
