import { useReducer, useState } from 'react';
import FooterNav from './components/FooterNav';
import Screen from './components/Screen';
import {
  AppContext,
  appState,
  appStateReducer,
} from './contexts/AppContext';
import MetaImage from './legacy/MetaImage';
import Search from './legacy/Search';

const App = () => {
  // dispatch used for triggering custom events
  const [state, dispatch] = useReducer(appStateReducer, appState);
  // equivalent to value = {{state, dispatch}}
  // const contextValue = {
  //   state: state,
  //   dispatch: dispatch,
  // };

  const { currentScreen } = state;

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <header className="navbar-dark fixed-top bg-dark border-bottom border-warning">
        <nav className="container d-flex justify-content-between">
          <h1 className="display-6 text-warning">Swapi Vehicles</h1>
          <Search />
        </nav>
      </header>
      <main className="container mb-4 mt-7">
        <Screen screen={currentScreen} />
      </main>
      <footer className="container mb-4">
        <FooterNav />
      </footer>
    </AppContext.Provider>
  );
};

export default App;
