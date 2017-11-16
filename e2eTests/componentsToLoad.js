import Hello from "./helloWorldComponent";
import Hello1 from "./goodbyeWorldComponent";
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