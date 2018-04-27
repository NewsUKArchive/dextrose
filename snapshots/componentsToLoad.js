/* global withComponent */

import React from 'react';
import { Hello, Bye, Ignore } from './testComponents';

withComponent(<Hello fructoseID="hello world's" />, 'description', () => {});

withComponent(<Bye fructoseID="goodbyeWorld" />, 'description', () => {});

withComponent(<Ignore fructoseID="IGNORE" />, 'description', () => {});
