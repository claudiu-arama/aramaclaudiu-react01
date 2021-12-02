import { UserStats } from '../components/profile';
import { Button } from '../components/ui';
import { useAuth } from '../hooks';
import { useStats } from '../hooks';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { authenticated, established } = useAuth();
  const stats = useStats();
  return (
    <div className="container mx-auto p-4">
      <h1>welcome to word game</h1>
      {!established ? (
        '...add spinner here'
      ) : authenticated ? (
        <>
          <UserStats
            {...stats}
            className="mt-8"
            entryClassName="p-5"></UserStats>
          <div className="mt-2 text-center">
            <Link to="/play">
              <Button title="play now" element="span">
                play now
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center">
          <button
            className="w-75 md:max-w-xl w-3/4 py-20 border rounded-md shadow hover:bg-gray-100"
            type="button"
            title="Login">
            Login to get started
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
