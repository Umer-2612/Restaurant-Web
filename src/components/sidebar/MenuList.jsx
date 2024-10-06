import React, { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import MenuItemList from './MenuItemList';

import { sideBarItemSelector } from 'store/slices/sidebar';
import { convertPathNameToKey } from 'utils/commonFunctions';

export default function MenuList() {
  const location = useLocation();
  const navigate = useNavigate();
  const onMenuClick = useCallback(
    (menu) => {
      menu?.link ? window.open(menu?.link, '_blank') : navigate(menu?.path);
    },
    [navigate]
  );
  const sideBarItems = useSelector(sideBarItemSelector);
  const [toggleCollapse, setToggleCollapse] = useState(
    convertPathNameToKey(location)
  );
  const onToggleCollapse = useCallback((key) => {
    setToggleCollapse((prevState) =>
      prevState !== false ? (prevState.includes(key) ? false : key) : key
    );
  }, []);

  const onMenuItemClick = useCallback(
    (menu) => {
      if (menu.menus?.length) {
        onToggleCollapse(menu.key);
      } else {
        onMenuClick(menu);
      }
    },
    [onMenuClick, onToggleCollapse]
  );

  return (
    <Box
      sx={{
        'overflow': 'hidden',
        '&::-webkit-scrollbar': {
          width: '0.1rem',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: (theme) => theme.palette.secondary.light,
        },
        '&:hover': {
          overflowY: 'auto',
        },
      }}
    >
      <List>
        <Box>
          {sideBarItems.map((item) => {
            return (
              <MenuItemList
                key={item.key}
                keyName={item.key}
                menu={item}
                onClick={onMenuItemClick}
                toggleCollapse={toggleCollapse}
              />
            );
          })}
        </Box>
      </List>
    </Box>
  );
}
