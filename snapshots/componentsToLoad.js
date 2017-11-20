import Hello from "./components/helloWorldComponent";
import Hello1 from "./components/goodbyeWorldComponent";
import React from "react";

withComponent(
    <Hello fructoseID="helloWorld"> </Hello>,
    "description",
    () => {}
)

withComponent(
    <Hello1 fructoseID="goodbyeWorld"> </Hello1>,
    "description",
    () => {}
)