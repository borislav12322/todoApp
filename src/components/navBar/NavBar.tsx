import React, { ReactElement } from 'react';
import s from './navBar.module.css';
import { NavLink } from 'react-router-dom';
import LogoPartOne from '../../assets/images/logo-part1.svg';
import LogoPartTwo from '../../assets/images/logo-part2.svg';
import { NavBarItemType } from './NavBarContainer';

type PropsType = {
  navBarArray: NavBarItemType[];
};

const NavBar = React.memo(
  ({ navBarArray }: PropsType): ReactElement => (
    <header className={s.navBarContainer}>
      <div className={s.navBarWrapper}>
        <NavLink to="/" className={s.logoWrapper}>
          <img src={LogoPartOne} alt="logo" />
          <img src={LogoPartTwo} alt="logo" />
        </NavLink>
        <div className={s.navLinksWrapper}>
          {navBarArray.map(navLinkItem => (
            <NavLink
              key={navLinkItem.id}
              to={navLinkItem.link}
              className={s.navLink}
              style={({ isActive }) => ({
                borderBottom: isActive ? '1px solid #FFFFFF' : 'none',
              })}
            >
              {navLinkItem.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  ),
);

export default NavBar;
