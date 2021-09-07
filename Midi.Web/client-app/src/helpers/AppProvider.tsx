import "antd/dist/antd.css";
import React from "react";

/** Shared between storybook and react
 * Place all styles/providers that need to be used in storybook, react app, and tests */
export class AppProvider extends React.Component {
    render = () => this.props.children;
}
