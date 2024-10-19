import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Banner, BannerText } from 'components/common/Banner';
import { LIGHT } from 'store/theme/colors';

const faqsData = [
  {
    question: 'How can I reserve a table?',
    answer:
      'Once you have decided on the time and date, you can reserve the table with just a few easy tips. Simply fill in the details we have asked you and submit them. Our experts will confirm your reservation through a call. After a successful reservation, we will inform you through the mail and call.',
  },
  {
    question: 'Can I book a special table for my special occasion?',
    answer:
      'Yes, you can. We also allow reservation of tables for birthdays, marriage anniversaries and other get-together parties. Send us your details to us, and we will instantly confirm the table (If available) the minute you hit the booking button.',
  },
  {
    question: 'Does the restaurant offer coupons?',
    answer:
      'To know more about the offers and coupons you can talk with our executives.',
  },
  {
    question: 'I have booked my table, but I haven’t had confirmation.',
    answer:
      'We will always send you an automated confirmation when you book a table with us! If you haven’t received any confirmation, please follow the reservation process again. If you have any issues connecting with us, you can simply make a call or drop a mail to resolve your problem.',
  },
  {
    question: 'How can I get confirmation to reserve a table',
    answer:
      'We will send you an instant confirmation email to the address you have used for booking. We also send a reminder 24 hours before your booking date. You can reconfirm by using the link we have sent to you.',
  },
  {
    question: 'Can I cancel my booking?',
    answer:
      'If you have to cancel your booking for any specific reason, you can call us. We ask you to give at least 24 hours of notice for any cancellations. If you need to cancel less than 24 hours before the allotted time, use the cancellation link. We also encourage our clients to give us a follow-up through the call or mail.',
  },
  {
    question: 'Do you charge any advanced booking charges?',
    answer:
      'No, we don’t charge any extra booking costs. You are free to book your table at any time at zero advance cost.',
  },
  {
    question: 'What are the charges for food and quality?',
    answer:
      'If you want to know the charges, you can search for our menu. We ask for affordable charges for our visitors.',
  },
  {
    question: 'Why are you so famous in town?',
    answer:
      'We are famous in town because of the quality and hospitality we provide to our customers. Our restaurant offers delicious food loaded with Punjabi flavours that will satisfy your taste buds. All the Indian dishes we serve to you are made with the true spices of India, no matter whether it’s veg or non-veg. Some of our exotic ranges of dishes are Tandoori, Kebab and Tikka. Not only because of the food, we are also famous because of the ambience. The ambience is effortlessly blended with the modern and desi charm featured with the magnificent chandeliers and mirrors. The walls are adorned with well-known personalities. Visit us to get a real-time experience.',
  },
];

const Faqs = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Banner>
        <BannerText>Faqs</BannerText>
      </Banner>
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
          <Grid item xs={12}>
            {faqsData.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
                sx={{
                  'borderRadius': '0px',
                  'boxShadow': 'none',
                  'backgroundColor': 'transparent',
                  'borderBottom': `1px solid ${LIGHT.grey[300]}`,
                  'mt': index > 0 ? 1 : 0,
                  '&::before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: LIGHT.grey[500] }} />
                  }
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
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
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: LIGHT.text.secondary }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Faqs;
