import React from 'react'; // useCallback

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Badge from '@mui/material/Badge';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { pxToRem } from 'store/theme/typography';

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isAdminOnly',
})(({ theme, active, isAdminOnly, activemenu, className }) => {
  return {
    'color': theme.palette.text.title,
    // need to change overflow style
    'overflow': 'hidden',
    'borderRadius': 8,
    'height': '44px',
    '&:hover': {
      color: theme.palette.primary.main,
      background: theme.palette.other.sideBgColor,
    },
    ...(active > -1 && {
      color: theme.palette.primary.main,
      background: theme.palette.other.sideBgColor,
    }),
    ...(activemenu > -1 && {
      background: theme.palette.background.active,
    }),

    'paddingLeft': pxToRem(10),
    'paddingRight': pxToRem(10),
  };
});

const StyledListItemIcon = styled(ListItemIcon)(({ theme, active }) => ({
  marginRight: 10,
  minWidth: 24,
  maxWidth: 24,
  width: 24,
  color: 'inherit',
  ...(active > -1 && {
    fill: theme.palette.common.white,
  }),
}));

export default function MenuItemList({
  menu,
  toggleCollapse,
  onClick,
  badgeCount,
  keyName,
}) {
  const location = useLocation();
  const [isHover, setIsHover] = React.useState(false);

  const isAdminOnly =
    keyName === 'companySettings' || keyName === 'adminSettings';

  return (
    <ListItem
      disablePadding
      sx={{
        display: 'block',
        mt: 1,
      }}
    >
      <div>
        <StyledListItemButton
          className={`${menu.key}-mobile`}
          onClick={() => onClick(menu)}
          active={location.pathname.indexOf(menu.path)}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
          isAdminOnly={isAdminOnly}
          disableTouchRipple
        >
          {badgeCount > 0 ? (
            <Badge badgeContent={badgeCount} overlap="circular" color="primary">
              {menu.icon}
            </Badge>
          ) : (
            <StyledListItemIcon>{menu.icon}</StyledListItemIcon>
          )}

          <ListItemText
            primary={
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                textOverflow="ellipsis"
                color={(theme) => menu?.link && theme.palette.info.main}
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {menu.title}{' '}
                <Stack alignItems={'center'} direction={'row'}>
                  {menu.menus && menu.menus?.length ? (
                    <>
                      {menu.key === toggleCollapse ? (
                        <ExpandLessRoundedIcon />
                      ) : (
                        <ExpandMoreRoundedIcon />
                      )}
                    </>
                  ) : null}
                </Stack>
                {menu.submenus && isHover ? (
                  <ArrowCircleRightIcon
                    sx={{ color: (theme) => theme.palette.primary.main }}
                  />
                ) : (
                  ''
                )}
              </Stack>
            }
          />
        </StyledListItemButton>
        {menu.menus && (
          <Collapse
            in={toggleCollapse !== false && toggleCollapse.includes(menu.key)}
            sx={{
              mb: 0.2,
              borderRadius: (theme) => theme.shape.borderRadius + 'px',
            }}
          >
            <List sx={{ py: 0 }}>
              {menu.menus.map((menu) => {
                return (
                  <ListItem
                    key={menu.key || menu?._id}
                    disablePadding
                    sx={{ display: 'block', my: 0.5 }}
                  >
                    <StyledListItemButton
                      onClick={() => {
                        onClick(menu);
                      }}
                      activemenu={
                        menu.path
                          ? location.pathname.indexOf(menu.path)
                          : location.pathname.split('/').pop() === menu?._id
                            ? 0
                            : -1
                      }
                      sx={{ pl: 3.5 }}
                    >
                      <StyledListItemIcon>
                        {menu?.icon || <FormatListBulletedIcon />}
                      </StyledListItemIcon>
                      <ListItemText
                        sx={{
                          h6: {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          },
                          color: (theme) =>
                            menu?.link && theme.palette.info.main,
                        }}
                        primary={menu.title}
                        primaryTypographyProps={{ variant: 'subtitle2' }}
                      />
                    </StyledListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        )}
      </div>
    </ListItem>
  );
}

MenuItemList.propTypes = {
  menu: PropTypes.object,
  onClick: PropTypes.func,
  toggleCollapse: PropTypes.any,
  badgeCount: PropTypes.number,
  keyName: PropTypes.string,
};
