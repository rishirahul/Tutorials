# cart badge

[Tutorial Link ](https://savannahscodecorner.wordpress.com/2018/04/25/bottomnavigationview-upgraded-adding-notification-badges/)

[Third party tool](https://github.com/aurelhubert/ahbottomnavigation)

create a shape file for badge in ./res/drawable/cart_badge.xml

```xml
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="oval">
    <solid android:color="@color/theme_default_primary_dark"/>
    <stroke
        android:width="2dp"
        android:color="@color/theme_default_primary_dark"/>
</shape>
```

Then create a layout file view_cart_layout.xml

```xml
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <TextView
        android:id="@+id/cart_badge"
        android:layout_width="25dp"
        android:layout_height="25dp"
        android:text="100"
        android:textSize="10dp"
        android:textColor="@color/gen_white"
        android:layout_gravity="top|center_horizontal"
        android:layout_marginStart="10dp"
        android:background="@drawable/cart_badge"
        android:gravity="center"
        android:padding="3dp" />
</FrameLayout>
```

Now this view has to be attached to some component and inflated on top of it

```java
    public void addCartBadgeView() {
        BottomNavigationMenuView menuView = (BottomNavigationMenuView) navigation.getChildAt(0);
        BottomNavigationItemView itemView = (BottomNavigationItemView) menuView.getChildAt(2);

        cartBadge = LayoutInflater.from(this).inflate(R.layout.view_cart_badge, menuView, false);
        cartbadgeTextview = (TextView) cartBadge.findViewById(R.id.cart_badge);
        itemView.addView(cartBadge);
        updateCartBadgeView();
    }
```

To hide it from the screen or update text on it

```java
    public void updateCartBadgeView() {
        listCartItems = db.getAllCartItem();
        int totalItems = listCartItems.size();
        if (totalItems > 0) {
            if (cartBadge.getVisibility() == GONE) {
                cartBadge.setVisibility(View.VISIBLE);
            }
            cartbadgeTextview.setText(Integer.toString(totalItems));
        }
        else {
            cartBadge.setVisibility(GONE);
        }

    }
```