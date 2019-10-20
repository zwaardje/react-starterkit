import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { createRoutes, PrivateRoute } from './routing';
import Template from './components/templates/Template';

import Init from './actions/init.actions';

export interface State {
    loaded: boolean;
}
export interface Props {
    routes: any;
    initApplication: any;
    restoreApplication: any;
    authenticated: boolean;
    restored: boolean;
}

export class App extends React.Component<Props, State> {

    state = {
        loaded: true,
    };

    componentDidMount() {
        const { authenticated, restored } = this.props;
        if (authenticated) {
            this.props.initApplication();
        }
        if (restored) {
            this.props.restoreApplication();
        }
    }

    render() {
        const { loaded } = this.state;
        const { routes, authenticated } = this.props;

        if (routes && loaded) {
            return (
                <Template>
                    <Switch>
                        {routes.map(({ private: isPrivate, ...rest }, index) => (
                            isPrivate ? <PrivateRoute key={index} {...rest} authenticated={authenticated} />
                                : <Route key={index} {...rest} />
                        ))}
                    </Switch>
                </Template>
            );
        }

        return (
            <div>
                The application is loading???
            </div>
        );
    }
}

const actions = {
    initApplication: () => Init.initApplication(),
    restoreApplication: () => Init.restoreApplication(),
};

const state = (state) => {
    const { navigation, system } = state;

    return {
        routes: createRoutes(navigation),
        authenticated: system.authenticated,
        restored: system.restored,
    };
};

export default connect(state, actions)(
    hot(module)(App),
);
