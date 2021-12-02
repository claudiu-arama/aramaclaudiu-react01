import {
  Switch,
  Route,
  Router,
  BrowserRouter,
} from 'react-router-dom';
import { initializeGoogleAuth } from './api';
import { Footer, Header } from './components/common';
import history from './history';
import {
  GamePage,
  HomePage,
  NotFoundPage,
  ProfilePage,
  RanksPage,
} from './pages';

initializeGoogleAuth();

export const App = () => {
  return (
    <Router history={history}>
      <Header />
      <main className="text-red-500">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/profile" component={ProfilePage}></Route>
          <Route path="/ranks" component={RanksPage}></Route>
          <Route path="/play" component={GamePage}></Route>
          <Route component={NotFoundPage}></Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

// actions -> {type:'', payload:''} -> `/types `/creators
// reducers
