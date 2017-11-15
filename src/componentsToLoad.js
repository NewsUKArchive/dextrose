import Hello from "./helloWorldComponent";
import Hello1 from "./helloWorldComponent1";
import React from "react";

withComponent(
    <Hello fructoseID="helloWorld"> </Hello>,
    "description",
    () => {}
)

withComponent(
    <Hello1 fructoseID="helloWorld1"> </Hello1>,
    "description",
    () => {}
)