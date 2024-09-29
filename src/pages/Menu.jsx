import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { menuItems } from "../data/menuItems";

// Styled components for premium look
const FilterButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  textTransform: "capitalize",
  fontSize: "1rem",
  padding: theme.spacing(1, 3),
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const MenuCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const MenuCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const CategoryHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 700,
  color: "#800020", // Deep burgundy for headings
}));

const MenuPage = () => {
  // Define available categories
  const categories = [
    "All",
    "Biriyani",
    "Vegan Curries",
    "Accompaniments",
    "Naan/Bread",
    "Desserts",
    "Drinks",
    "Entrees",
    "Street Food",
    "Classic Curries",
    "Veg Curries",
  ];

  // State to store the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter items based on the selected category
  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems?.filter((item) => item.category === selectedCategory);

  // Debugging log
  console.log("Filtered Menu Items:", filteredMenuItems);

  return (
    <Box padding={4} sx={{ backgroundColor: "#f5f5dc" }}>
      <CategoryHeading variant="h4">Our Menu</CategoryHeading>

      {/* Category Filter Buttons */}
      <Box
        display="flex"
        justifyContent="center"
        my={3}
        flexWrap="wrap"
        gap={2}
      >
        {categories.map((category) => (
          <FilterButton
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "contained" : "outlined"}
            color={selectedCategory === category ? "primary" : "default"}
          >
            {category}
          </FilterButton>
        ))}
      </Box>

      {/* Menu Items Display */}
      <Grid container spacing={3}>
        {filteredMenuItems?.length > 0 ? (
          filteredMenuItems?.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MenuCard>
                <CardMedia
                  component="img"
                  height="250" // Adjust height as needed
                  sx={{ objectFit: "cover" }} // Ensures the image covers the area without distortion
                  image={item.image}
                  alt={item.name}
                />
                <MenuCardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Divider sx={{ marginY: 1 }} />
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{ marginTop: 1 }}
                  >
                    {item.price}
                  </Typography>
                </MenuCardContent>
              </MenuCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="textSecondary">
              No items available in this category.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MenuPage;
