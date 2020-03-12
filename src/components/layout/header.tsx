import React, { PureComponent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import '../../styles/components/header.scss';

type LinkType = {
  path: string;
  label: string;
};

const ROUTES = [
  {
    path: '/analysis',
    label: 'Analysis',
  },
  {
    path: '/currencies',
    label: 'Currencies',
  },
];

interface HeaderProps extends RouteComponentProps<any>, React.Props<any> {}

class Header extends PureComponent<HeaderProps> {
  renderLink = (item: LinkType) => {
    const selected = this.props.history.location.pathname === item.path;
    return (
      <li key={item.label} className="header-item">
        <Link
          className={`header-item-link${selected ? ' selected' : ''}`}
          to={item.path}
        >
          {item.label}
        </Link>
      </li>
    );
  };
  render() {
    return (
      <nav className="header-root">
        <ul className="header-items-list">{ROUTES.map(this.renderLink)}</ul>
      </nav>
    );
  }
}

export default withRouter(Header);
