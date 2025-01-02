export const MENU_KEY = {
  menu1: 'menu1',
  menu2: 'menu2',
  menu3: 'menu3',
};

export const menu = [
  {
    label: 'menu1',
    key: MENU_KEY.menu1,
    route: {
      name: 'menu1.index',
    },
  },
  {
    label: 'menu2',
    key: MENU_KEY.menu2,
    route: {
      name: 'menu2.index',
    },
  },
  {
    label: 'menu3',
    key: MENU_KEY.menu3,
    route: {
      name: 'menu3.index',
    },
  },
  {
    label: 'logout',
    handleClick: 'logout',
  },
];
