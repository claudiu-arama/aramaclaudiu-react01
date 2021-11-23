import { Link } from 'react-router-dom';
import { SiLetterboxd } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../ui/Button';
import {
  requestSignIn,
  requestSignOut,
} from '../../actions/creators/auth';
import { FaUserAlt } from 'react-icons/fa';
import { CgSpinnerTwo } from 'react-icons/cg';
import { useAuth } from './../../hooks';

export const Header = () => {
  const dispatch = useDispatch();
  const { authenticated, established } = useAuth();

  const renderUserControls = () => {
    if (!established) {
      return <CgSpinnerTwo className="animate-spin"></CgSpinnerTwo>;
    }
    if (authenticated) {
      return (
        <>
          <Link to="/profile" title="profile">
            <Button
              element="span"
              className="inline-flex h-full items-center">
              <FaUserAlt></FaUserAlt>
            </Button>
          </Link>

          <Button
            skin="primaryInverted"
            type="button"
            title="log out"
            onClick={() => {
              dispatch(requestSignOut());
            }}
            className="ml-2">
            Log out
          </Button>
        </>
      );
    } else {
      return (
        <Button
          type="button"
          title="log in"
          onClick={() => {
            dispatch(requestSignIn());
          }}
          className="drilldown demo">
          log in
        </Button>
      );
    }
  };

  return (
    <header className="shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <header>
          <h1 className="uppercase text-lg font-bold">
            <Link
              to="/"
              title="go home"
              className="flex items-center">
              <SiLetterboxd className="mr-2" /> word game
            </Link>
          </h1>
        </header>

        <div>{renderUserControls()}</div>
      </div>
    </header>
  );
};

export default Header;
