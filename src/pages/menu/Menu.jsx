import React, { useEffect, useState, useRef } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'react-router-dom';

import MenuFilter from './components/MenuFilter';
import MenuItemModal from './components/MenuItemModal';

import { MenuItemLayout } from 'components/common/CommonComponents';
import { useGetCategoriesQuery } from 'store/apis/categories';
import { useGetMenusQuery } from 'store/apis/menu';

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

  const { data, isSuccess, isLoading, isFetching } = useGetMenusQuery({
    search: searchParams.get('search')?.trim() || '',
    page: page,
    limit: 20,
    category: searchParams.get('category') || '',
  });

  const { data: categoryData } = useGetCategoriesQuery();

  const categories =
    categoryData?.data?.map((category) => ({
      id: category._id,
      name: category.name,
    })) || [];

  useEffect(() => {
    if (isSuccess) {
      if (page === 1) {
        // On the first page or new category load, reset the items
        setMenuItems(data?.data || []);
      } else if (data?.data?.length === 0) {
        // No more data to load
        setHasMore(false);
      } else {
        // For page > 1, append new items, but avoid re-appending old data
        setMenuItems((prevItems) => {
          // Avoid duplication: Append only if the items are not already in the list
          const newItems = data.data.filter(
            (item) =>
              !prevItems.some((existingItem) => existingItem._id === item._id)
          );
          return [...prevItems, ...newItems];
        });
      }
    }
  }, [data, isSuccess, page]);

  useEffect(() => {
    const fetchMoreData = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 1 &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', fetchMoreData);

    return () => {
      window.removeEventListener('scroll', fetchMoreData);
    };
  }, [hasMore]);

  const handleCategoryChange = (categoryId) => {
    searchParams.set('category', categoryId);
    setSearchParams(searchParams);
    setPage(1); // Reset to the first page
    setMenuItems([]); // Clear previous menu items
    setHasMore(true); // Reset "hasMore" for new data
  };

  return (
    <Container>
      <Stack alignItems="center" ref={containerRef}>
        <Grid container size={{ xs: 12, sm: 11, md: 10 }} spacing={3}>
          {/* MenuFilter Stack */}
          {categories?.length > 0 && (
            <MenuFilter
              categories={categories}
              onCategoryChange={handleCategoryChange}
            />
          )}
          {/* Scrollable MenuItemLayout Stack */}
          <Stack width="100%">
            {menuItems?.map((menu, index) => (
              <MenuItemLayout
                key={menu?._id}
                menu={menu}
                handleMenuModalOpen={handleMenuModalOpen}
                isLastItem={Number(menuItems?.length - 1) === Number(index)}
                isLoading={isLoading}
                isFetching={isFetching}
              />
            ))}
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
