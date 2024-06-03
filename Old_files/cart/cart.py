from decimal import Decimal
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render, redirect

class Cart(object):

    def __init__(self, request):
        self.request = request
        self.session = request.session
        self.cart = self.session.get(settings.CART_SESSION_ID, {})
        if not isinstance(self.cart, dict):
        # Initialize an empty dictionary for the cart if it's not already
            self.cart = {}
            self.session[settings.CART_SESSION_ID] = self.cart

    def add(self, product, quantity=1):
        """
        Add a product to the cart or update its quantity.
        """
        product_id = str(product.id)
        if product_id in self.cart:
            # Update quantity if product already exists in cart
            self.cart[product_id]['quantity'] += quantity
        else:
            # Add new product to cart
            self.cart[product_id] = {
                'product_id': product.id,
                'name': product.name,
                'quantity': quantity,
                'price': str(product.price * quantity),
                'image': product.image.url
            }
        self.save()



    def save(self):
        """
        Save the cart data to the session.
        """
        self.session[settings.CART_SESSION_ID] = self.cart
        self.session.modified = True

    def remove(self, product):
        # Remove a product from the cart
        product_id = str(product.id)
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    

    def clear(self):
        """
        Clear all items from the cart.
        """
        self.cart = {}
        self.save()

    def get_cart_items(self):
        """
        Return a list of items in the cart.
        """
        return self.cart.values()

    def get_total_quantity(self):
        """
        Return the total quantity of items in the cart.
        """
        total_quantity = sum(item['quantity'] for item in self.cart.values())
        return total_quantity



# class Cart(object):

#     def __init__(self, request):
#         self.request = request
#         self.session = request.session
#         self.cart = self.session.get(settings.CART_SESSION_ID, {})
#         if not isinstance(self.cart, dict):
#             # Initialize an empty dictionary for the cart if it's not already
#             self.cart = {}
#             self.session[settings.CART_SESSION_ID] = self.cart

#     def add(self, product, quantity=1):
#         product_id = str(product.id)
#         if product_id in self.cart:
#         # Update quantity if product already exists in cart
#             print("Before adding quantity:", self.cart[product_id]['quantity'])
#             self.cart[product_id]['quantity'] += quantity
#             print("After adding quantity:", self.cart[product_id]['quantity'])
#         else:
#         # Add new product to cart
#             self.cart[product_id] = {
#                 'product_id': product.id,
#                 'name': product.name,
#                 'quantity': quantity,
#                 'price': str(product.price * quantity),
#                 'image': product.image.url
#             }
#         self.save()


#     def save(self):
#         """
#         Save the cart data to the session.
#         """
#         self.session[settings.CART_SESSION_ID] = self.cart
#         self.session.modified = True

#     def remove(self, product):
#         product_id = str(product.id)
#         if product_id in self.cart:
#             del self.cart[product_id]
#             self.save()



#     # def remove(self, product):
#     #     """
#     #     Remove a product from the cart.
#     #     """
#     #     product_id = str(product.id)
#     #     if product_id in self.cart:
#     #         print("Before removal:", self.cart)  # Print cart before removal
#     #         del self.cart[product_id]
#     #         self.save()
#     #         self.session.modified = True
#     #         print("After removal:", self.cart)  # Print cart after removal



#     def clear(self):
#         """
#         Clear all items from the cart.
#         """
#         self.cart = {}
#         self.save()

#     def get_cart_items(self):
#         """
#         Return a list of items in the cart.
#         """
#         return self.cart.values()

#     def get_total_quantity(self):
#         """
#         Return the total quantity of items in the cart.
#         """
#         total_quantity = sum(item['quantity'] for item in self.cart.values())
#         return total_quantity

#     def get_total_price(self):
#         """
#         Return the total price of all items in the cart.
#         """
#         total_price = sum(float(item['total_price']) for item in self.cart.values())
#         return total_price
