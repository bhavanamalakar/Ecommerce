# utils.py

from django.db import transaction
from app.models import Cart,Order,OrderItem, Payment

def create_order(user, cart_id, address, phone, pincode):
    try:
        cart = Cart.objects.get(id=cart_id)
    except Cart.DoesNotExist:
        return None
    
    with transaction.atomic():
        # Create order based on cart items and provided details
        order = Order.objects.create(
            user=user,
            address=address,
            phone=phone,
            pincode=pincode,
            # Other order details as needed
        )

        # Copy cart items to order items
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                unit_price=cart_item.product.price  # Assuming each product has a price field
            )

        # Clear cart items after successful order creation
        cart.items.all().delete()

    return order

def process_payment(order, payment_details):
    # Placeholder implementation for payment processing
    # In a real application, you would integrate with a payment gateway (e.g., Stripe, PayPal)
    # and handle payment processing logic (e.g., authorize payment, capture payment, etc.)
    try:
        with transaction.atomic():
            payment = Payment.objects.create(
                order=order,
                amount=order.calculate_total_amount(),
                payment_details=payment_details,
                # Other payment details as needed
            )
            # Update order status based on payment status
            if payment.is_successful():
                order.mark_as_paid()
            else:
                order.mark_as_failed()
    except Exception as e:
        # Handle payment processing errors
        print(f"Payment processing failed: {e}")
        raise e
