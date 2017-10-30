import React, {PureComponent} from 'react';
import {node, func, string} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getLocale} from './reducer';
import {localeSelector} from './selectors';

export class LayoutPure extends PureComponent {
    static propTypes = {
        children: node.isRequired,
        getLocale: func.isRequired,
        locale: string.isRequired
    };

    componentDidMount() {
        this.props.getLocale();
    }

    render() {
        const localeString = `Locale: ${this.props.locale}`;
        return (
            <div>
                <div>
                    {'Some layout wrapper start'}
                </div>
                <div>
                    {localeString}
                </div>
                {this.props.children}
                <div>
                    {'Some layout wrapper end'}
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    locale: localeSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getLocale
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LayoutPure);
