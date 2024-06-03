import datetime
from django.shortcuts import render, redirect, HttpResponse,get_object_or_404
from app.models import Category, Product, contact_us, Order, Brand, Blog, Size, Color, SubCategory ,UserPreference
from app.models import Cart as e 
from django.contrib.auth import authenticate, login
from app.models import UserCreateForm
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from cart.cart import Cart
# import razorpay
import os
import json
from app.forms import PreferencesForm
from django.conf import settings
from django.core import serializers
from django.http import JsonResponse
from django.http import HttpResponse



def home(request):
    return HttpResponse("Welcome to Best Globe Shop Backend!")


def Master(request):
    return render(request, "master.html")



# def Index(request):
#     category = Category.objects.all()
#     brand = Brand.objects.all()
#     subcategory = SubCategory.objects.all()
#     product = Product.objects.all()

#     # Convert QuerySets to lists of dictionaries
#     category_list = json.loads(serializers.serialize('json', category))
#     brand_list = json.loads(serializers.serialize('json', brand))
#     product_list = json.loads(serializers.serialize('json', product))
#     subcategory_list = json.loads(serializers.serialize('json', subcategory))

#     # Construct the context dictionary
#     context = {
#         "category": category_list,
#         "product": product_list,
#         "brand": brand_list,
#         "subcategory": subcategory_list,
#     }
#     return HttpResponse(json.dumps(context), content_type='application/json')

def Index(request):
    category = Category.objects.all()
    brand = Brand.objects.all()
    subcategory = SubCategory.objects.all()
    product = Product.objects.all()

    context = {
        "category": category,
        "product": product,
        "brand": brand,
        "subcategory": subcategory,
    }
    return render(request, "index.html", context )

def signup(request):
    if request.method == "POST":
        form = UserCreateForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            new_user = authenticate(
                username=form.cleaned_data["username"],
                password=form.cleaned_data["password1"],
            )

            login(request, new_user)
            return redirect("index")
        # else:
        #     print(form.errors)
        #     return redirect('index')
    else:
        form = UserCreateForm()

    context = {"form": form, "category": Category.objects.all()}
    return render(request, "registration/signup.html", context)


@login_required(login_url="/accounts/login/")
def cart_add(request, id):
    cart = Cart(request)
    product_ = Product.objects.get(id=id)
    cart.add(product=product_)

    cart_db = e(
        user=request.user,
        product=product_,
        id=id,
        quantity=1,
        price=product_.price,
        total=product_.price,
        date=datetime.datetime.today()
    )
    
    cart_db.save()

    return redirect("index")



# web
@login_required(login_url="/accounts/login/")
def item_increment(request, id):
    cart = Cart(request)
    product = Product.objects.get(id=id)
    cart.add(product=product)
    product_db = e.objects.get(id=id)
    product_db.quantity += 1 
    product_db.total = product_db.quantity * product_db.price
    product_db.save()
    return redirect("cart_detail")


@login_required(login_url="/accounts/login/")
def item_decrement(request, id):
    cart = Cart(request)
    product = Product.objects.get(id=id)
    cart.decrement(product=product)
    product_db = e.objects.get(id=id)
    if product_db.quantity ==1 :
        return item_clear(request, id)
    else: 
        product_db.quantity -= 1 
        product_db.total = product_db.quantity * product_db.price
        product_db.save()

    return redirect("cart_detail")

@login_required(login_url="/accounts/login/")
def item_clear(request, id):
    cart = Cart(request)
    product = Product.objects.get(id=id)
    cart.remove(product)
    product_db = e.objects.get(id=id)
    product_db.delete()
    return redirect("cart_detail")

@login_required(login_url="/accounts/login/")
def cart_clear(request):
    cart = Cart(request)
    cart.clear()
    cart_db = e.objects.filter(name=request.user)
    cart_db.remove()
    return redirect("cart_detail")

@login_required(login_url="/accounts/login/")
def cart_detail(request):
    cart_sessions = request.session.get("cart")
    if not cart_sessions:
        # If session data is not available, sync with database
        cart_sessions = e.objects.filter(user=request.user)
        request.session["cart"] = list(cart_sessions.values_list("id", flat=True))
        request.session["cart_synced"] = True
    elif not request.session.get("cart_synced"):
        # If session data is available, but not synced with database, sync now
        cart_database = e.objects.filter(user=request.user)
        if set(cart_sessions) != set(cart_database.values_list("id", flat=True)):
            cart_sessions = list(cart_database.values_list("id", flat=True))
            request.session["cart"] = cart_sessions
        request.session["cart_synced"] = True
    context = {
        "category": Category.objects.all(),
        "cart": cart_sessions,
        "cart_length": len(cart_sessions),
    }
    return render(request, "cart/cart_detail.html", context)

#remove item from cart
# def cart_remove(request, product_id):
#     cart = Cart(request)
#     product = get_object_or_404(Product, id=product_id)
#     cart.remove(product)
#     request.session["cart"] = list(e.objects.filter(user=request.user).values_list("id", flat=True))
#     request.session["cart_synced"] = True
#     return redirect('cart_detail')


def Contact_Page(request):
    if request.method == "POST":
        contact = contact_us(
            name=request.POST.get("name"),
            email=request.POST.get("email"),
            subject=request.POST.get("subject"),
            message=request.POST.get("message"),
        )
        contact.save()
    return render(request, "contact.html", {"category": Category.objects.all()})


def Checkout(request):
    if request.method == "POST":
        address = request.POST.get("address")
        phone = request.POST.get("phone")
        pincode = request.POST.get("pincode")
        cart = request.session.get("cart")
        uid = request.session.get("_auth_user_id")
        user = User.objects.get(pk=uid)
        for i in cart:
            a = int(cart[i]["price"])
            b = cart[i]["quantity"]
            total = a * b
            order = Order(
                user=user,
                product=cart[i]["name"],
                price=cart[i]["price"],
                quantity=cart[i]["quantity"],
                image=cart[i]["image"],
                address=address,
                phone=phone,
                pincode=pincode,
                total=total,
            )
            order.save()
        request.session["cart"] = {}
        return redirect("index")
    return render(request,"checkout.html")


def Your_Order(request):
    uid = request.session.get("_auth_user_id")
    user = User.objects.get(pk=uid)
    order = Order.objects.filter(user=user)
    context = {
        "order": order,
    }
    return render(request, "order.html", context)


def Product_page(request):
    category = Category.objects.all()
    brand = Brand.objects.all()
    brandID = request.GET.get("brand")
    categoryID = request.GET.get("category")
    if categoryID is not None:
        product = Product.objects.filter(
            subcategory=categoryID).order_by("-id")
    elif brandID is not None:
        product = Product.objects.filter(brand=brandID).order_by("-id")

    else:
        product = Product.objects.all()
    context = {
        "category": category,
        "product": product,
        "product_count": product.count(),
        "brand": brand,
        "category": Category.objects.all(),
    }

    return render(request, "product.html", context)


def Product_detail(request, id):
    product = Product.objects.filter(id=id).first()
    context = {
        "product": product,
        "category": Category.objects.all(),
    }

    return render(request, "single_prod.html", context)


def Search(request):
    query = request.GET.get("query")
    product = Product.objects.filter(name__icontains=query)
    brand = Brand.objects.all()
    context = {
        "product": product,
        "query": query,
        "product_count": product.count(),
        "category": Category.objects.all(),
        "brand": brand,
    }
    return render(request, "search.html", context)


def Blog_Page(request):
    blog = Blog.objects.all()
    context = {
        "blog": blog,
        "category": Category.objects.all(),
    }
    return render(request, "blog.html", context)


def Blog_Detail(request, id):
    other_blog = Blog.objects.all()
    blog = Blog.objects.filter(blog_id=id).values_list()
    context = {
        "blog": {
            "title": blog[0][0],
            "description": blog[0][2],
            "short_description": blog[0][3],
            "image": blog[0][1],
            "o_blog": other_blog,
        },
        "category": Category.objects.all(),
    }

    return render(request, "blog_detail.html", context)


def Announcement(request):
    return render(request, "announcement.html", {"category": Category.objects.all()})


# darkmode

#darkmode
@login_required
def theme_preference(request):
    user_preference, created = UserPreference.objects.get_or_create(user=request.user)
    
    if request.method == 'POST':
        user_preference.dark_mode = request.POST.get('dark_mode', False)
        user_preference.save()
    
    return render(request, 'theme_preference.html', {'user_preference': user_preference})


