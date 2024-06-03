from rest_framework import viewsets ,status,generics
from app.models import Category, SubCategory, Brand, Size, Color, Product, contact_us, Order, Blog, Cart
from .serializers import *
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
# #USER LOGIN
from rest_framework.authtoken.models import Token 
from django.contrib.auth import authenticate, login
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, DestroyModelMixin ,ListModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from django.contrib.auth import logout
from django.http import JsonResponse
from .utils import create_order, process_payment
import requests
from django.conf import settings
from datetime import timedelta
from django.utils import timezone

import razorpay
###########----USER INFORMATION START ------------############

# USER CREATION
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):

    if request.user.is_authenticated:
        return Response({'error': 'Another user is already logged in. Cannot register.'}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.save()
        if user:
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#USER-LOGIN
@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    if request.user.is_authenticated:
        return Response({'error': 'User is already logged in'}, status=status.HTTP_400_BAD_REQUEST)
    
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    
    if user:
        try:
            profile = UserProfile.objects.get(user=user)
            if profile.is_deleted():
                if timezone.now() - profile.deleted_at < timedelta(days=60):
                    profile.restore()
                    # Re-authenticate user after profile restoration
                    user = authenticate(request, username=username, password=password)
                    if not user:
                        return Response({'error': 'Invalid credentials after profile restoration'}, status=status.HTTP_401_UNAUTHORIZED)
                else:
                    return Response({'error': 'User profile is permanently deleted'}, status=status.HTTP_410_GONE)
        except UserProfile.DoesNotExist:
            pass

        login(request, user)
        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

#USER-LOGOUT
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

        ############----USER INFORMATION CLOSE ------------############

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    
class SizeViewSet(viewsets.ModelViewSet):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer

class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ContactUsViewSet(viewsets.ModelViewSet):
    queryset = contact_us.objects.all()
    serializer_class = ContactUsSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        product_id = self.request.data.get('product_id')
        if not product_id:
            return Response({'error': 'Product ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer.save(user=self.request.user, product=product)

    @action(detail=True, methods=['delete'])
    def remove(self, request, pk=None):
        try:
            wishlist_item = Wishlist.objects.get(user=request.user, product_id=pk)
            wishlist_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Wishlist.DoesNotExist:
            return Response({'error': 'Wishlist item not found.'}, status=status.HTTP_404_NOT_FOUND)


class CartViewSet(CreateModelMixin, RetrieveModelMixin, DestroyModelMixin, ListModelMixin, GenericViewSet):
    # queryset = Cart.objects.none() 
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def get_or_create_cart(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            cart = Cart.objects.create(user=request.user)
        serializer = self.get_serializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CartItemViewSet(viewsets.ModelViewSet):
    http_method_names = ["get", "post", "patch", "delete"]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cartitems.objects.filter(cart_id=self.kwargs["cart_pk"])

    def get_serializer_class(self):
        if self.request.method == "POST":
            return AddCartItemSerializer
        elif self.request.method == 'PATCH':
            return UpdateCartItemSerializer
        return CartItemSerializer

    def get_serializer_context(self):
        return {"cart_id": self.kwargs["cart_pk"]}

    def perform_create(self, serializer):
        cart_id = self.kwargs["cart_pk"]
        serializer.save(cart_id=cart_id)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()
    
    
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(deleted_at__isnull=True)

    def get_object(self):
        user = self.request.user
        try:
            return UserProfile.objects.get(user=user, deleted_at__isnull=True)
        except UserProfile.DoesNotExist:
            try:
                profile = UserProfile.objects.get(user=user)
                profile.restore()
                return profile
            except UserProfile.DoesNotExist:
                profile = UserProfile.objects.create(user=user)
                return profile

    def retrieve(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        profile = self.get_object()
        profile.soft_delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class UserPreferenceView(APIView):
    def get(self, request):
        user = request.user
        try:
            preference = UserPreference.objects.get(user=user)
            serializer = UserPreferenceSerializer(preference)
            return Response(serializer.data)
        except UserPreference.DoesNotExist:
            return Response({'dark_mode': False})

    def post(self, request):
        user = request.user
        try:
            preference = UserPreference.objects.get(user=user)
        except UserPreference.DoesNotExist:
            preference = UserPreference(user=user)

        preference.dark_mode = request.data.get('dark_mode', False)
        preference.save()
        serializer = UserPreferenceSerializer(preference)
        return Response(serializer.data)

from django.contrib.auth import update_session_auth_hash

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    if request.method == 'POST':
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if user.check_password(serializer.data.get('old_password')):
                user.set_password(serializer.data.get('new_password'))
                user.save()
                update_session_auth_hash(request, user)  # To update session after password change
                return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
            return Response({'error': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CheckoutView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        cart = get_object_or_404(Cart, id=request.data.get('cart_id'))
        if not cart.items.exists():
            return Response({"detail": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create an order from cart
        order_data = {
            'user': request.user.id,
            'price': sum(item.product.price * item.quantity for item in cart.items.all()),
            'quantity': sum(item.quantity for item in cart.items.all()),
            'address': request.data.get('address'),
            'phone': request.data.get('phone'),
            'pincode': request.data.get('pincode'),
            'status': 'Pending',
            'date': timezone.now().date(),
            'items': [
                {
                    'product': item.product.id,
                    'quantity': item.quantity,
                    'unit_price': item.product.price,
                } for item in cart.items.all()
            ]
        }
        order_serializer = self.get_serializer(data=order_data)
        order_serializer.is_valid(raise_exception=True)
        order = order_serializer.save()

        # Create Razorpay order
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        razorpay_order = client.order.create({
            'amount': int(order.price * 100),  # amount in paisa
            'currency': 'INR',
            'payment_capture': '1'
        })

        # Create Payment entry
        payment_data = {
            'order': order.id,
            'amount': order.price,
            'razorpay_order_id': razorpay_order['id'],
            'status': 'pending',
        }
        payment_serializer = PaymentSerializer(data=payment_data)
        payment_serializer.is_valid(raise_exception=True)
        payment = payment_serializer.save()

        # Clear the cart
        cart.items.all().delete()

        return Response({
            'order': order_serializer.data,
            'razorpay_order_id': razorpay_order['id'],
            'razorpay_key_id': settings.RAZORPAY_KEY_ID,
            'amount': order.price,
            'currency': 'INR'
        }, status=status.HTTP_201_CREATED)
    
class PaymentVerificationView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        # Determine serializer class based on request method
        if self.request.method == 'POST':
            return PaymentSerializer
        # Add more conditions if needed
    
    
    def post(self, request, *args, **kwargs):
        razorpay_payment_id = request.data.get('razorpay_payment_id')
        razorpay_order_id = request.data.get('razorpay_order_id')
        razorpay_signature = request.data.get('razorpay_signature')
        
        payment = get_object_or_404(Payment, razorpay_order_id=razorpay_order_id)

        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        params_dict = {
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': razorpay_signature
        }

        try:
            client.utility.verify_payment_signature(params_dict)
            payment.status = 'success'
            payment.razorpay_payment_id = razorpay_payment_id
            payment.razorpay_signature = razorpay_signature
            payment.save()
            
            payment.order.status = 'Confirmed'
            payment.order.save()

            return Response({"status": "Payment successful"}, status=status.HTTP_200_OK)
        except razorpay.errors.SignatureVerificationError:
            payment.status = 'failed'
            payment.save()
            
            payment.order.status = 'Cancelled'
            payment.order.save()

            return Response({"status": "Payment failed"}, status=status.HTTP_400_BAD_REQUEST)