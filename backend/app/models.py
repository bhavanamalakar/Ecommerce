from django.db import models
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
import datetime
from django.db.models import DecimalField
from django.utils import timezone

import uuid

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=200, primary_key=True)

    def __str__(self):
        return self.name


class Size(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Color(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

#BLOG
class Blog(models.Model):
    title = models.CharField(max_length=25)
    image = models.ImageField(upload_to="ecommerce/blog/image")
    description = models.TextField(default="")
    short_description = models.TextField(default="", max_length=100)
    blog_id = models.IntegerField(primary_key=True, default=0)

    def __str__(self):
        return self.title


class Product(models.Model):
    Availability = (("In Stock", "In Stock"), ("Out of Stock", "Out of Stock"))
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, null=False, default="", 
    )
    subcategory = models.ForeignKey(
        SubCategory, on_delete=models.CASCADE, null=False, default=""
    )
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=300)
    description = models.TextField(max_length=1000 ,  null=False , default="")
    price = models.IntegerField()
    Availability = models.CharField(
        choices=Availability, null=True, max_length=100)
    image = models.ImageField(upload_to="ecommerce/ping")
    image1 = models.ImageField(upload_to="ecommerce/ping", null=True, blank=True)
    image2 = models.ImageField(upload_to="ecommerce/ping", null=True, blank=True)
    image3 = models.ImageField(upload_to="ecommerce/ping", null=True, blank=True)
    date = models.DateField(auto_now_add=True)
    discount = models.BooleanField(
        default=False,
    )
    discount_amt = models.IntegerField(
        default=0, null=True, blank=True
    )
    discount_percentage = models.IntegerField(
        default=0, null=True, blank=True
    )

    new_or_not = models.BooleanField(
        default=True,
    )

    size = models.ManyToManyField(Size, default="NO SIZE")
    color = models.ManyToManyField(Color, default="NO COLOR")
    def __str__(self):
        return self.name


#USERCREATION

class UserCreateForm(UserCreationForm):
    email = forms.EmailField(
        required=True, label="Email", error_messages={"exists": "This Already Exists"}
    )
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)

    class Meta:
        model = User
        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
            "password1",
            "password2",
        )

    def __init__(self, *args, **kwargs):
        super(UserCreateForm, self).__init__(*args, **kwargs)

        self.fields["username"].widget.attrs["placeholder"] = "User Name"
        self.fields["email"].widget.attrs["placeholder"] = "Email"
        self.fields["first_name"].widget.attrs["placeholder"] = "First Name"
        self.fields["last_name"].widget.attrs["placeholder"] = "Last Name"
        self.fields["password1"].widget.attrs["placeholder"] = "Password"
        self.fields["password2"].widget.attrs["placeholder"] = "Confirm Password"

    def save(self, commit=True):
        user = super(UserCreateForm, self).save(commit=False)
        user.first_name = self.cleaned_data["first_name"]
        user.last_name = self.cleaned_data["last_name"]
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user

    def clean_email(self):
        if User.objects.filter(email=self.cleaned_data["email"]).exists():
            raise forms.ValidationError(
                self.fields["email"].error_message["exists"])
        return self.cleaned_data["email"]

#PROFILE
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return self.user.username

    def soft_delete(self):
        self.deleted_at = timezone.now()
        self.user.is_active = False                # Disable the associated user account
        self.user.save()
        self.save()

    def restore(self):
        self.deleted_at = None
        self.user.is_active = True                  # Re-enable the associated user account
        self.user.save()                            # Save the changes to the user account
        self.save() 

    def is_deleted(self):
        return self.deleted_at is not None

#ORDER
class Order(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    )
    image = models.ImageField(upload_to="ecommerce/order/image")
    products = models.ManyToManyField(Product, through='OrderItem')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.IntegerField()
    quantity = models.CharField(max_length=5)
    total = models.CharField(max_length=1000, default="")
    address = models.TextField()
    phone = models.CharField(max_length=10)
    pincode = models.CharField(max_length=6)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    date = models.DateField(default=datetime.datetime.today)

    def __str__(self):
        return f"Order #{self.pk}"
    
    def calculate_total_amount(self):
        total_amount = 0
        for item in self.items.all():
            total_amount += item.quantity * item.unit_price
        return total_amount
    
    def mark_as_paid(self):
        self.status = 'Paid'
        self.save()

    def mark_as_failed(self):
        self.status = 'failed'
        self.save()
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order {self.order.pk} - {self.product.name}"


class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed'),
    ]
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    razorpay_payment_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_order_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_signature = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for Order {self.order.pk}"
    

#ADDRESS
class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.address_line_1}, {self.city}, {self.state}, {self.country}, {self.postal_code}"    




#CART
class Cart(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="carts",default=1)
    date =  models.DateField(auto_now_add=True)
    grand_total = models.DecimalField(max_digits=10, decimal_places=2,null=True)

    @property
    def items(self):
        return self.cartitems_set.all()

    def __str__(self):
        return str(self.id)

    def calculate_grand_total(self):
        total = sum(item.quantity * item.price for item in self.items.all())
        self.grand_total = total
        self.save(update_fields=['grand_total'])
    
class Cartitems(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items", null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True, related_name='cartitems')
    quantity = models.PositiveSmallIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        if self.product:
            self.price = self.product.price
        super().save(*args, **kwargs)
        self.cart.calculate_grand_total()


    
# darkmode
class UserPreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dark_mode = models.BooleanField(default=False)

#CONTACT US
class contact_us(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    subject = models.CharField(max_length=100)
    message = models.TextField()

    def __str__(self):
        return self.name

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlists')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='wishlists')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"
