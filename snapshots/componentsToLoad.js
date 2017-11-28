import Hello from "./components/helloWorldComponent";
import Hello1 from "./components/goodbyeWorldComponent";
import React from "react";

withComponent(
    <Hello fructoseID="hello world's"> </Hello>,
    "description",
    () => {}
)

withComponent(
    <Hello1 fructoseID="goodbyeWorld"> </Hello1>,
    "description",
    () => {}
)