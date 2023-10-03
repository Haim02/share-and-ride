import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStaeFromError(error) {
        return { hasError: false }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true })
    }

    render() {
        if(this.state.hasError){
            return <h1 style={{textAlign: 'center'}}>!שגיעה</h1>
        }
        return this.props.children
    }
}

export default ErrorBoundary
