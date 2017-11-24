import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '../less/main.less';

if(document.getElementById('app')){
    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );
}
