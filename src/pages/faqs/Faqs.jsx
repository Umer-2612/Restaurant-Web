import React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Banner } from 'components/common/Banner';
import { LIGHT } from 'store/theme/colors';

const Faqs = () => {
  return (
    <>
      <Banner />
      <Container>
        <Stack gap={4}>
          <Box sx={{ textAlign: 'center' }} p={4}>
            <Typography
              variant="h4"
              sx={{
                color: LIGHT.primary.main,
                fontWeight: 'bold',
                fontSize: '32px',
              }}
            >
              FAQs
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2} sx={{ mt: 1, mb: 8 }}>
          <Grid
            item
            size={{
              xs: 12,
            }}
          >
            <Accordion
              sx={{
                borderRadius: '0px',
                boxShadow: 'none',
                backgroundColor: 'transparent',
                borderBottom: `1px solid ${LIGHT.grey[300]}`,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: LIGHT.grey[500] }} />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  '&:hover .MuiTypography-root': {
                    color: LIGHT.primary.main,
                  },
                }}
              >
                <Typography
                  sx={{
                    color: LIGHT.text.primary,
                    fontWeight: 'bold',
                    fontSize: '1.4rem',
                  }}
                >
                  Can I edit my order?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: LIGHT.text.secondary }}>
                  Your order can be edited before it reaches the restaurant. You
                  could contact customer support via chat or call to do so. Once
                  the order is placed and the restaurant starts preparing your
                  food, you may not edit its contents.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                borderRadius: '0px',
                boxShadow: 'none',
                backgroundColor: 'transparent',
                borderBottom: `1px solid ${LIGHT.grey[300]}`,
                mt: 1,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: LIGHT.grey[500] }} />}
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{
                  '&:hover .MuiTypography-root': {
                    color: LIGHT.primary.main,
                  },
                }}
              >
                <Typography
                  sx={{
                    color: LIGHT.text.primary,
                    fontWeight: 'bold',
                    fontSize: '1.4rem',
                  }}
                >
                  I want to cancel my order
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: LIGHT.text.secondary }}>
                  We will do our best to accommodate your request if the order
                  is not placed to the restaurant. Please note that we will have
                  the right to charge a cancellation fee up to the full order
                  value if your order has been confirmed.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                borderRadius: '0px',
                boxShadow: 'none',
                backgroundColor: 'transparent',
                borderBottom: `1px solid ${LIGHT.grey[300]}`,
                mt: 1,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: LIGHT.grey[500] }} />}
                aria-controls="panel3-content"
                id="panel3-header"
                sx={{
                  '&:hover .MuiTypography-root': {
                    color: LIGHT.primary.main,
                  },
                }}
              >
                <Typography
                  sx={{
                    color: LIGHT.text.primary,
                    fontWeight: 'bold',
                    fontSize: '1.4rem',
                  }}
                >
                  Can I book a special table for my special occasion??
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: LIGHT.text.secondary }}>
                  Yes, you can. We also allow reservation of tables for
                  birthdays, marriage anniversaries and other get-together
                  parties. Send us your details to us, and we will instantly
                  confirm the table (If available) the minute you hit the
                  booking button.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Faqs;
