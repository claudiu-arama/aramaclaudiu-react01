import { useAuth } from '../hooks/useAuth';

export const HomePage = () => {
  const { authenticated, established } = useAuth();
  return (
    <div className="container mx-auto p-4">
      {!established ? (
        '...add spinner here'
      ) : authenticated ? (
        'user logged in'
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
