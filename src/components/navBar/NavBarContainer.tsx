import React, { ReactElement } from 'react';
import NavBar from './NavBar';

export type NavBarItemType = {
  id: number;
  name: string;
  link: string;
};

const NavBarContainer = (): ReactElement => {
  const navBarArray: NavBarItemType[] = [
    { id: 1, name: 'Main Page', link: '/' },
    { id: 2, name: 'To Do Lists', link: '/toDoLists' },
  ];

  return <NavBar navBarArray={navBarArray} />;
};

export default NavBarContainer;
