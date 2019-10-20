import React from 'react';
import * as Sentry from '@sentry/browser';

interface State {
    error: object | null;
    eventId: string | null;
}

interface Props {}

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = { error: null, eventId: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });
    }

    render() {
        const { error } = this.state;
        if (error) {
            return (
                <div>
                    Error fail fail fail
                </div>
            );
        }

        return this.props.children;
    }
}
