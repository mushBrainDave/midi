import React from "react";
import { AppProvider } from "../src/helpers/AppProvider";

export const withAppProvider = (story: any) => {
    return <AppProvider>{story()}</AppProvider>;
};
