import { useDispatch, useSelector } from 'react-redux';
import clickClicker, {
  decrementClicker,
} from './actions/creators/ui';
import { initializeGoogleAuth } from './api';
import { Footer, Header } from './components/common';

initializeGoogleAuth();

export const App = () => {
  const clicker = useSelector((state) => {
    const { ui } = state;

    return ui.clicker;
  });
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      <main>
        <div>value is: {clicker}</div>
        <button
          onClick={() => {
            dispatch(decrementClicker(10));
          }}>
          dec
        </button>
        <button
          onClick={() => {
            dispatch(
              clickClicker(),
              //   {
              //   type: 'CLICK',
              //   payload: 5,
              //   // since this is an object, it is not restricted to type and payload, any other info can be sent,
              //   // add any key below to experience. destructure same in reducer to get it
              // }
            );
          }}>
          inc
        </button>
      </main>
      <Footer />
    </>
  );
};

export default App;

// actions -> {type:'', payload:''} -> `/types `/creators
// reducers
