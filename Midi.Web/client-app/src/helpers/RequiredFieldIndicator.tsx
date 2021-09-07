import React from "react";

export class RequiredFieldIndicator extends React.Component {
    render() {
        return (
            <span style={{ color: "#DA1A32" }} data-testid="requiredFieldIndicator">
                {" "}
                *
            </span>
        );
    }
}
