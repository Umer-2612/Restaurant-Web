import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { useSearchParams } from 'react-router-dom';

import MenuFilter from './components/MenuFilter';
import MenuItemModal from './components/MenuItemModal';

import {
  MenuItemLayout,
  CustomPagination,
} from 'components/common/CommonComponents';
import { useGetCategoriesQuery } from 'store/apis/categories';
import { useGetMenusQuery } from 'store/apis/menu';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [menuProps, setMenuProps] = useState({
    menuDetails: null,
    isMenuOpen: false,
  });

  const handleMenuModalOpen = ({ menu }) => {
    setMenuProps({ menuDetails: menu, isMenuOpen: true });
  };

  const handleMenuModalClose = () => {
    setMenuProps({ ...menuProps, isMenuOpen: false });
    setTimeout(() => {
      setMenuProps({ menuDetails: null, isMenuOpen: false });
    }, 200);
  };

  const { data, isSuccess } = useGetMenusQuery({
    search: searchParams.get('search')?.trim() || '',
    page: searchParams.get('page') || 1,
    limit: searchParams.get('perPage') || 20,
    category: searchParams.get('category') || '',
  });

  const { data: categoryData } = useGetCategoriesQuery();

  const categories =
    categoryData?.data?.map((category) => ({
      id: category._id,
      name: category.name,
    })) || [];

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.max(1, Number(searchParams.get('limit')) || 20);

  // Effect for managing searchParams on initial load and changes
  useEffect(() => {
    if (page <= 0 || isNaN(page)) {
      searchParams.set('page', '1');
      setSearchParams(searchParams, { replace: true });
    }

    if (limit <= 0 || isNaN(limit)) {
      searchParams.set('limit', '20');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, page, limit]);

  // Effect to handle page correction if data is not available for the current page
  useEffect(() => {
    if (isSuccess && data?.data?.length === 0 && page > 1) {
      const totalPages = Math.ceil((data?.pagination?.total || 100) / limit);
      searchParams.set('page', Math.min(page, totalPages));
      setSearchParams(searchParams, { replace: true });
    }
  }, [isSuccess, data, page, limit, searchParams, setSearchParams]);

  // Retrieve cart details from localStorage
  let storedMenuDetails = [];
  try {
    storedMenuDetails = JSON.parse(localStorage.getItem('menuDetails')) || [];
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
  }

  // Add cart details to menu items
  const modifiedData = data?.data?.map((menu) => {
    const itemIndex = storedMenuDetails.findIndex(
      (cartData) => cartData?.menuId === menu?._id
    );
    return itemIndex >= 0
      ? { ...menu, cartDetails: storedMenuDetails[itemIndex] }
      : menu;
  });

  const handleCategoryChange = (categoryId) => {
    searchParams.set('category', categoryId);
    setSearchParams(searchParams);
  };
  return (
    <Container>
      <Stack alignItems="center">
        <Grid container size={{ xs: 12, sm: 11, md: 10 }} spacing={3}>
          {/* MenuFilter Stack */}
          {categories?.length > 0 && (
            <MenuFilter
              categories={categories}
              onCategoryChange={handleCategoryChange}
            />
          )}
          {/* Scrollable MenuItemLayout Stack */}
          <Stack
            width="100%"
            sx={{
              overflowY: 'auto', // Allow vertical scrolling
            }}
          >
            {modifiedData?.map((menu, index) => (
              <MenuItemLayout
                key={menu?._id}
                menu={menu}
                handleMenuModalOpen={handleMenuModalOpen}
                isLastItem={Number(modifiedData?.length - 1) === Number(index)}
              />
            ))}
          </Stack>
          <Stack width="100%">
            <CustomPagination
              limitPerPageArray={[20, 40, 60, 80]}
              total={data?.paginationData?.total || 100}
            />
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
