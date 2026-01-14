import React, { useEffect, useState, useRef } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
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
import { cartSelector, modifyCartDetails } from 'store/slices/cart';
import useRestaurantStatus from 'store/slices/useRestaurantStatus';

const CLASSIC_CURRY_CATEGORY_ID = '67096a46c45927fe078dbfca';

const parseClassicVariant = (itemName = '') => {
  const parts = itemName.split('-');
  const label =
    parts[1]?.trim() || itemName.replace(/classic curry/i, '').trim();
  const key = label?.toLowerCase().replace(/\s+/g, '-') || 'default';
  return { key, label };
};

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [menuProps, setMenuProps] = useState({
    menuDetails: null,
    isMenuOpen: false,
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showClosedMessage, setShowClosedMessage] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isCategoryChanged, setIsCategoryChanged] = useState(false);
  const storedMenuDetails = useSelector(cartSelector);
  const containerRef = useRef();
  const { isOpen } = useRestaurantStatus();
  const dispatch = useDispatch();

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
    if (!isOpen) {
      setShowClosedMessage(true);
      dispatch(modifyCartDetails([]));
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (!isSuccess) return;

    const storedMenuMap = new Map(
      (storedMenuDetails || []).map((item) => [item?.menuId, item])
    );

    const classicItems = [];
    const otherItems = [];

    data?.data?.forEach((menu) => {
      const matchedCart = storedMenuMap.get(menu?._id);

      const withCartDetails = matchedCart
        ? { ...menu, cartDetails: matchedCart }
        : menu;

      const isClassicCurry =
        (menu?.category?._id === CLASSIC_CURRY_CATEGORY_ID ||
          menu?.category === CLASSIC_CURRY_CATEGORY_ID) &&
        menu?.itemName?.toLowerCase().startsWith('classic curry');

      if (isClassicCurry) {
        classicItems.push(withCartDetails);
      } else {
        otherItems.push(withCartDetails);
      }
    });

    let modifiedData = [...otherItems];
    const classicCount = classicItems.length;
    const adjustedTotal =
      (data?.paginationData?.total || 0) -
      classicCount +
      (classicCount ? 1 : 0);

    if (classicItems.length > 0) {
      const variantOptions = classicItems.map((item) => {
        const { key, label } = parseClassicVariant(item?.itemName);
        return {
          key,
          label,
          price: item?.itemPrice,
          menuId: item?._id,
          itemImagePath: item?.itemImagePath,
          // itemDescription: item?.itemDescription,
          cartDetails: storedMenuMap.get(item?._id),
        };
      });

      const selectedVariantFromCart =
        variantOptions.find((option) => option?.cartDetails?.quantity > 0) ||
        variantOptions[0];

      const classicDisplayItem = {
        _id: 'classic-curry-group',
        itemName: 'Classic Curry',
        itemDescription:
          selectedVariantFromCart?.itemDescription ||
          classicItems[0]?.itemDescription,
        itemImagePath:
          selectedVariantFromCart?.itemImagePath ||
          classicItems[0]?.itemImagePath,
        category: classicItems[0]?.category,
        variantOptions,
        variantDefaultKey: selectedVariantFromCart?.key,
        variantGroupKey: 'classic-curry-group',
        cartDetails: selectedVariantFromCart?.cartDetails
          ? {
              ...selectedVariantFromCart.cartDetails,
              variantKey: selectedVariantFromCart.key,
              variantLabel: selectedVariantFromCart.label,
              menuId: selectedVariantFromCart.menuId,
              cartItemId: selectedVariantFromCart.menuId,
              variantGroupKey: 'classic-curry-group',
            }
          : {
              menuId: selectedVariantFromCart?.menuId,
              cartItemId: selectedVariantFromCart?.menuId,
              quantity: 0,
              variantKey: selectedVariantFromCart?.key,
              variantLabel: selectedVariantFromCart?.label,
              variantGroupKey: 'classic-curry-group',
            },
      };

      modifiedData = [classicDisplayItem, ...modifiedData];
    }

    if (page === 1) {
      setMenuItems(modifiedData || []);
      setHasMore((modifiedData?.length || 0) < adjustedTotal);
    } else {
      setMenuItems((prevItems) => {
        const newItems = modifiedData.filter(
          (item) =>
            !prevItems.some((existingItem) => existingItem._id === item._id)
        );
        const combined = [...prevItems, ...newItems];
        setHasMore((combined?.length || 0) < adjustedTotal);
        return combined;
      });
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
    <Container maxWidth="xl">
      <Stack spacing={3} py={3}>
        {(!isOpen || showClosedMessage) && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: 'warning.light',
              py: 2,
              px: 3,
              borderRadius: 2,
            }}
          >
            <Typography color="warning.dark" align="center" fontWeight={500}>
              Restaurant is currently closed. Please check back during business
              hours.
            </Typography>
          </Stack>
        )}

        <MenuFilter
          categories={categories}
          onCategoryChange={handleCategoryChange}
          isLoading={isCategoryLoading}
        />
        <Stack width="100%">
          {menuItems?.map((menu, index) => {
            return (
              <Reveal key={menu?._id} output={[0, 10, 20, 30, 40]}>
                <MenuItemLayout
                  menu={menu}
                  variantOptions={menu?.variantOptions}
                  variantGroupKey={menu?.variantGroupKey}
                  handleMenuModalOpen={handleMenuModalOpen}
                  isLastItem={Number(menuItems?.length - 1) === Number(index)}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  showClosedMessage={setShowClosedMessage}
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
