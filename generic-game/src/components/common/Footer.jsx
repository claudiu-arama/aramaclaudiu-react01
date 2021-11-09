import { Link, NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border border-top border-red">
      <div className="container mx-auto">
        <section className="flex justify-between">
          <header>
            <h1>
              <Link to="/" title="homepage" className="uppercase">
                word game
              </Link>
            </h1>
            <p className="text-xs">crafter by artisans</p>
          </header>
          <ul>
            <li>
              <NavLink
                to="/profile"
                title="go to profile"
                className="font-bold"
                activeClassName="text-red-500">
                profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ranks"
                title="see users"
                className={(isActive) => {
                  return `${
                    isActive ? 'text-red-500' : ''
                  } font-bold`;
                }}>
                ranks
              </NavLink>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
