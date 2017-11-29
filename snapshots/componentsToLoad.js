import {Hello, Bye, Ignore} from "./testComponents";
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
