from django.urls import path, include
from rest_framework import routers
from .views import *
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_nested.routers import NestedDefaultRouter


router = routers.DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'subcategories', SubCategoryViewSet)
router.register(r'brands', BrandViewSet)
router.register(r'sizes', SizeViewSet)
router.register(r'colors', ColorViewSet)
router.register(r'products', ProductViewSet)
router.register(r'contactus', ContactUsViewSet)
router.register(r'blogs', BlogViewSet)
router.register(r'orders', views.OrderViewSet, basename="orders")
router.register(r'payments', PaymentViewSet)
router.register(r'addresses', AddressViewSet, basename='address')
router.register(r'user-profile', UserProfileViewSet, basename='user-profile')
router.register(r'wishlist', WishlistViewSet, basename='wishlist')

# router.register(r'carts', CartViewSet, basename='cart')
# router.register(r'carts/(?P<cart_pk>[0-9a-f-]+)/items', CartItemViewSet, basename='cart-item')


router.register(r'carts', CartViewSet, basename='cart')

# Nested router for cart items
carts_router = NestedDefaultRouter(router, r'carts', lookup='cart')
carts_router.register(r'items', CartItemViewSet, basename='cart-items')




urlpatterns = [
    
    path('register/', register, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),


    path('mode-preference/', UserPreferenceView.as_view()),
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('payment/verify/', PaymentVerificationView.as_view(), name='payment-verify'),
    path('change_password/', change_password, name='change_password'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('', include(router.urls)),
    path('', include(carts_router.urls)),

]
