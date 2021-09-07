import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome", module).add("Welcome", () => <Welcome showApp={linkTo("Button")} />);
