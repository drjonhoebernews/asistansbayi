// shipping data
export const shippingMethodData = [
  {
    id: 1,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/shipping/fedex.webp',
    name: 'FedEx',
    value: 'fedex',
  },
  {
    id: 2,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/shipping/ups.webp',
    name: 'ups',
    value: 'ups',
  },
  {
    id: 3,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/shipping/dhl.webp',
    name: 'DHL',
    value: 'dhl',
  },
];

// shipping duration data
export const shippingSpeedData = [
  {
    id: 1,
    speed: 'slow',
    title: '$7.00 No Rush Shipping',
    description: 'Arrives with in 4 days from order date.',
    checked: false,
  },
  {
    id: 2,
    speed: 'default',
    title: '$8.00 Shipping',
    description: 'Arrives with in 3 days from order date.',
    checked: true,
  },
  {
    id: 3,
    speed: 'quick',
    title: '$20.00 Rush Shipping',
    description: 'Arrives with in 2 days from order date.',
    checked: false,
  },
  {
    id: 4,
    speed: 'fast',
    title: '$40.00 Urgent Shipping',
    description: 'Arrives with in 1 day from order date.',
    checked: false,
  },
];

// payment method data
export const paymentMethodData = [
  {
    id: 1,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/payment/paypal.webp',
    name: 'PayPal',
    value: 'paypal',
    description:
      'Interest-free payment every 2 weeks. You will be redirected to Paypal after placing order.',
    defaultChecked: false,
  },
  {
    id: 2,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/payment/stripe.webp',
    name: 'Stripe',
    value: 'stripe',
    description:
      'Interest-free payment every 2 weeks. You will be redirected to Paypal after placing order.',
    defaultChecked: false,
  },
  {
    id: 3,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/payment/master.webp',
    name: 'MasterCard',
    value: 'mastercard',
    description:
      'Interest-free payment every 2 weeks. You will be redirected to Paypal after placing order.',
    defaultChecked: false,
  },
];

// ordered product data
export const orderProducts = [
  {
    id: 1,
    product: {
      name: 'Marc Jacob’s Decadent',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/5.webp',
    },
    price: '$175.00',
    subtotal: '$175.00',
    quantity: 1,
  },
  {
    id: 2,
    product: {
      name: 'Black Shoes',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/3.webp',
    },
    price: '$160.00',
    subtotal: '$320.00',
    quantity: 2,
  },
  {
    id: 3,
    product: {
      name: 'Beats Headphone',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/2.webp',
    },
    price: '$55.00',
    subtotal: '$55.00',
    quantity: 1,
  },
];
