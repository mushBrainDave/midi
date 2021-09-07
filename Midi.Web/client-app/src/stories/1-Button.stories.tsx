import { Button } from "antd";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

storiesOf("Button", module)
    .add("Text", () => <Button onClick={action("clicked")}>Hello Button</Button>)
    .add("Emoji", () => (
        <Button onClick={action("clicked")}>
            <span role="img" aria-label="so cool">
                😀 😎 👍 💯
            </span>
        </Button>
    ));
