import React, { useEffect, useState, useRef } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import MenuFilter from './components/MenuFilter';
import MenuItemModal from './components/MenuItemModal';

import Reveal from 'components/animation/Reveal';
import {
  MenuItemLayout,
  RenderMenuSkeleton,
} from 'components/common/CommonComponents';
import { useGetCategoriesQuery } from 'store/apis/categories';
import { useGetMenusQuery } from 'store/apis/menu';
import { cartSelector } from 'store/slices/cart';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [menuProps, setMenuProps] = useState({
    menuDetails: null,
    isMenuOpen: false,
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // Append new data on infinite scroll
  const [menuItems, setMenuItems] = useState([]);
  const [isCategoryChanged, setIsCategoryChanged] = useState(false);
  const storedMenuDetails = useSelector(cartSelector);
  const containerRef = useRef();

  const handleMenuModalOpen = ({ menu }) => {
    setMenuProps({ menuDetails: menu, isMenuOpen: true });
  };

  const handleMenuModalClose = () => {
    setMenuProps({ ...menuProps, isMenuOpen: false });
    setTimeout(() => {
      setMenuProps({ menuDetails: null, isMenuOpen: false });
    }, 200);
  };

  const { data, isSuccess, isLoading, isFetching } = useGetMenusQuery(
    {
      search: searchParams.get('search')?.trim() || '',
      page: page,
      limit: 20,
      category: searchParams.get('category') || 'All',
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetCategoriesQuery();

  const categories =
    categoryData?.data?.map((category) => ({
      id: category._id,
      name: category.name,
    })) || [];

  useEffect(() => {
    if (data?.paginationData?.total === menuItems?.length) {
      setHasMore(false);
    }
  }, [data?.paginationData?.total, menuItems?.length]);

  useEffect(() => {
    if (isSuccess) {
      const modifiedData = data?.data?.map((menu) => {
        const itemIndex = storedMenuDetails.findIndex(
          (cartData) => cartData?.menuId === menu?._id
        );

        return itemIndex >= 0
          ? { ...menu, cartDetails: storedMenuDetails[itemIndex] }
          : menu;
      });
      if (page === 1) {
        setMenuItems(modifiedData || []);
      } else if (data?.paginationData?.total === menuItems?.length) {
        setHasMore(false);
      } else {
        setMenuItems((prevItems) => {
          const newItems = modifiedData.filter(
            (item) =>
              !prevItems.some((existingItem) => existingItem._id === item._id)
          );
          return [...prevItems, ...newItems];
        });
      }
    }
  }, [
    data?.data,
    data?.paginationData?.total,
    isSuccess,
    menuItems?.length,
    page,
    storedMenuDetails,
  ]);

  useEffect(() => {
    let isFetching = false;

    const fetchMoreData = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 800 &&
        hasMore &&
        !isFetching &&
        !isLoading
      ) {
        isFetching = true;
        setPage((prevPage) => prevPage + 1);

        // To avoid multiple calls, reset the flag after a delay (adjust if necessary)
        setTimeout(() => {
          isFetching = false;
        }, 500); // Delay before allowing the next call (500ms here)
      }
    };

    window.addEventListener('scroll', fetchMoreData);

    return () => {
      window.removeEventListener('scroll', fetchMoreData);
    };
  }, [hasMore, isLoading]);

  useEffect(() => {
    if (isCategoryChanged && !isFetching) {
      return setIsCategoryChanged(false);
    }
  }, [isCategoryChanged, isFetching]);

  const handleCategoryChange = (categoryId) => {
    searchParams.set('category', categoryId);
    setSearchParams(searchParams);
    setPage(1);
    setMenuItems([]);
    setHasMore(true);
    setIsCategoryChanged(true);
  };

  if (isLoading || isCategoryChanged || isCategoryLoading) {
    return (
      <Container sx={{ mt: 5 }}>
        <Stack alignItems="center" ref={containerRef}>
          <Grid container size={{ xs: 12, sm: 11, md: 10 }} spacing={3}>
            {Array.from({ length: 8 }).map((_, cellIndex) => (
              <RenderMenuSkeleton key={cellIndex} />
            ))}
          </Grid>
        </Stack>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Stack alignItems="center" ref={containerRef}>
        <Grid container size={{ xs: 12, sm: 11, md: 10 }} spacing={3}>
          {categories?.length > 0 && (
            <MenuFilter
              categories={categories}
              onCategoryChange={handleCategoryChange}
            />
          )}
          <Stack width="100%">
            {menuItems?.map((menu, index) => {
              return (
                <Reveal key={menu?._id} output={[0, 10, 20, 30, 40]}>
                  <MenuItemLayout
                    menu={menu}
                    handleMenuModalOpen={handleMenuModalOpen}
                    isLastItem={Number(menuItems?.length - 1) === Number(index)}
                    isLoading={isLoading}
                    isFetching={isFetching}
                  />
                </Reveal>
              );
            })}
            {hasMore && (
              <Stack
                justifyContent="center"
                alignItems="center"
                direction="row"
                gap={2}
                p={2}
              >
                <CircularProgress size={24} />
                <Typography variant="subtitle2">Loading</Typography>
              </Stack>
            )}
          </Stack>
        </Grid>
        <MenuItemModal
          menuProps={menuProps}
          setMenuProps={setMenuProps}
          handleMenuModalClose={handleMenuModalClose}
        />
      </Stack>
    </Container>
  );
};

export default Menu;
