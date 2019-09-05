import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'normalize.css';

import { ThemeProvider } from 'rmwc';
import { themeOptions } from './lib/theme';
import 'material-components-web/dist/material-components-web.min.css';

import { App } from './components/mainComponents/App';

const root = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider options={themeOptions}>
    <App />
  </ThemeProvider>,
  root
);
