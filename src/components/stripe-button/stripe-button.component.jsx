import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishKey = 'pk_test_51GrlYFGFPflnzmEVdil6rVvKqo5kANWF1c0WdQcmPlvYyDx6u1i2R0d27qwxwhRdTEWkDl9pbw5vQwvT67N9BnMI00kzKZuAxm';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Jems Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishKey}

        />
    )
}

export default StripeCheckoutButton