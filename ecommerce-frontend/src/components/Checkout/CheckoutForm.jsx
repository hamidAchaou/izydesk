import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button, Alert, CircularProgress } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart, totalPrice } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    try {
      // Call backend to create order and payment intent
      await createOrder({
        items: cart.items.map(({ product, quantity }) => ({
          product_id: product.id,
          quantity,
        })),
        payment_method_id: paymentMethod.id,
        amount: totalPrice * 100, // in cents
      });

      clearCart();
      setSuccess(true);
    } catch (err) {
      setError("Payment failed. Please try again.");
    }
    setLoading(false);
  };

  if (success)
    return (
      <Alert severity="success">
        Payment successful! Thank you for your purchase.
      </Alert>
    );

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <CardElement options={{ hidePostalCode: true }} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!stripe || loading}
        sx={{ mt: 3 }}
        fullWidth
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          `Pay $${totalPrice.toFixed(2)}`
        )}
      </Button>
    </Box>
  );
}
