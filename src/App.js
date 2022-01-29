import './assets/css/index.css';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import Routes from './routes/Routes';
// import { store, persistor } from './stores';

const App = () => {
  return (
    <Provider>
      <PersistGate loading={null}>
      </PersistGate>
    </Provider>
  );
}

export default App;
