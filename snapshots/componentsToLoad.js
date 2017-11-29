import {Hello, Bye, Ignore} from "./testComponents";
import React from "react";

withComponent(
    <Hello fructoseID="HELLO WORLD'S"> </Hello>,
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