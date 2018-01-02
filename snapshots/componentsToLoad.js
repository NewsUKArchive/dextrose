import {Hello, Bye, Ignore, LOL} from "./testComponents";
import React from "react";

withComponent(
    <Hello fructoseID="hello world's"> </Hello>,
    "description",
    () => {}
);

withComponent(
    <Bye fructoseID="goodbyeWorld"> </Bye>,
    "description",
    () => {}
);

withComponent(
    <Ignore fructoseID="IGNORE"> </Ignore>,
    "description",
    () => {}
)

withComponent(
    <LOL fructoseID="LOL"> </LOL>,
    "description",
    () => {}
)
