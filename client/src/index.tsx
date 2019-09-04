import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'normalize.css';

import { ThemeProvider } from 'rmwc';
import 'material-components-web/dist/material-components-web.min.css';
import { App } from './components/mainComponents/App';

const root = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider
    options={{
      primary: '#303030',
      secondary: '#661fff',
      error: '#b00020',
      background: '#fff',
      surface: '#fff',
      onPrimary: 'rgba(255, 255, 255, 1)',
      onSecondary: 'rgba(255, 255, 255, 1)',
      onSurface: 'rgba(0, 0, 0, 0.87)',
      onError: '#fff',
      textPrimaryOnBackground: 'rgba(0, 0, 0, 0.87)',
      textSecondaryOnBackground: 'rgba(0, 0, 0, 0.54)',
      textHintOnBackground: 'rgba(0, 0, 0, 0.38)',
      textDisabledOnBackground: 'rgba(0, 0, 0, 0.38)',
      textIconOnBackground: 'rgba(0, 0, 0, 0.38)',
      textPrimaryOnLight: 'rgba(0, 0, 0, 0.87)',
      textSecondaryOnLight: 'rgba(0, 0, 0, 0.54)',
      textHintOnLight: 'rgba(0, 0, 0, 0.38)',
      textDisabledOnLight: 'rgba(0, 0, 0, 0.38)',
      textIconOnLight: 'rgba(0, 0, 0, 0.38)',
      textPrimaryOnDark: 'white',
      textSecondaryOnDark: 'rgba(255, 255, 255, 0.7)',
      textHintOnDark: 'rgba(255, 255, 255, 0.5)',
      textDisabledOnDark: 'rgba(255, 255, 255, 0.5)',
      textIconOnDark: 'rgba(255, 255, 255, 0.5)'
    }}
  >
    <App />
  </ThemeProvider>,

  root
);
