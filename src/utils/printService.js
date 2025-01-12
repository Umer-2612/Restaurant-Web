// Define the printer's IP address and port (use your printer's actual details)
const printerIp = '192.168.29.2'; // Replace with your printer's IP
const printerPort = 9100; // Common port for thermal printers (replace if needed)

// Function to format the receipt data
function formatReceiptData(orderDetails) {
  let receiptData = '';

  // Header
  receiptData += '*** Restaurant Name ***\n';
  receiptData += '123 Food St, City, State\n';
  receiptData += 'Phone: (123) 456-7890\n';
  receiptData += `Date: ${new Date().toLocaleDateString()}\n`;
  receiptData += `Time: ${new Date().toLocaleTimeString()}\n`;
  receiptData += '--------------------------------\n';

  // Order Details
  receiptData += 'Items Ordered:\n';
  orderDetails.cart.forEach((item) => {
    if (item.item && item.item.itemName && item.item.itemPrice) {
      receiptData += `${item.item.itemName} x ${item.quantity} - $${(item.item.itemPrice / 100).toFixed(2)}\n`;
    } else {
      receiptData += 'Invalid item details\n';
    }
  });

  // Payment and Footer
  receiptData += '--------------------------------\n';
  receiptData += `Total: $${(orderDetails.totalPrice / 100).toFixed(2)}\n`;
  receiptData += `Payment Method: ${orderDetails.status === 'POD' ? 'Pay on Delivery' : 'Online'}\n`;
  receiptData += `Order ID: ${orderDetails._id}\n`;
  if (orderDetails.customerDetails) {
    receiptData += `Customer: ${orderDetails.customerDetails.firstName} ${orderDetails.customerDetails.lastName}\n`;
    receiptData += `Email: ${orderDetails.customerDetails.email}\n`;
    receiptData += `Phone: ${orderDetails.customerDetails.phoneNo}\n`;
  }
  receiptData += '--------------------------------\n';
  receiptData += 'Thank you for your order!\n';
  receiptData += 'Visit us again!\n';

  return receiptData;
}

// Function to send the formatted receipt data to the printer
export async function sendToPrinter(receiptData) {
  try {
    const formattedReceiptData = formatReceiptData(receiptData);
    console.log({ formattedReceiptData });
    // Send the print data to the printer via HTTP POST
    const response = await fetch(
      `https://8167-2405-201-200c-49b6-44de-a033-3b3f-f280.ngrok-free.app:${printerPort}/print`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain', // Content type for raw printer data
        },
        body: formattedReceiptData, // Send the formatted receipt data as body
      }
    );

    if (response.ok) {
      console.log('Receipt printed successfully');
    } else {
      console.error('Failed to send print job', response.statusText);
    }
  } catch (error) {
    console.error('Error communicating with the printer:', error);
  }
}
