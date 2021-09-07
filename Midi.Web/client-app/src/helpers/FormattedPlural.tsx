import React from "react";
import { formattedPlural } from "./forms.utils";

interface IFormattedPluralProps {
    value: number;
    zero?: string | JSX.Element;
    one?: string | JSX.Element;
    other: string | JSX.Element;
}

/** See react-intl documentation https://github.com/yahoo/react-intl/wiki/Components#formattedplural
 * This wrapper was written because react-intl only shows zero, two, etc on cultures that need them https://github.com/yahoo/react-intl/issues/473
 * @see formattedPlural for the function version
 * @example
 * <BTFormattedPlural value={array.length} one="User" other="Users" />
 * <BTFormattedPlural value={array.length} zero="No users exist" one="User" other="Users" />
 */
export class FormattedPlural extends React.PureComponent<IFormattedPluralProps> {
    render() {
        return formattedPlural(this.props);
    }
}
