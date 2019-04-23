# Bottom Nav

create menu/navigation.xml which defines button names and icons

```xml 
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/navigation_home"
        android:icon="@drawable/home"
        android:title="HOME" />

    <item
        android:id="@+id/navigation_orders"
        android:icon="@drawable/order"
        android:title="ORDERS" />

    <item
        android:id="@+id/navigation_cart"
        android:icon="@drawable/cart"
        android:title="CART" />

</menu>
```

Then add botton nav to the activity

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/colorAccent"
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    tools:context="com.greensmart.retailapp.MainActivity">
        ....
        <android.support.design.widget.BottomNavigationView
            android:id="@+id/navigation"
            android:layout_alignParentBottom="true"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginStart="0dp"
            android:layout_marginEnd="0dp"
            android:background="?android:attr/windowBackground"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:menu="@menu/navigation" />

</RelativeLayout>
```

make changes in activity.java file

```java
public class MainActivity extends AppCompatActivity {
    ..
    BottomNavigationView navigation;
    ..
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ..
        navigation = (BottomNavigationView) findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        navigation.getMenu().getItem(1).setCheckable(false);
        navigation.getMenu().getItem(2).setCheckable(false);
        ..
    }

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            if (SystemClock.elapsedRealtime() - mLastClickTime < 1000){
                return false;
            }
            mLastClickTime = SystemClock.elapsedRealtime();
            switch (item.getItemId()) {
                case R.id.navigation_orders:
                    startActivity(new Intent(MainActivity.this, MyOrders.class));
                    return true;
                case R.id.navigation_cart:
                    startActivity(new Intent(MainActivity.this, Cart.class));
                    return true;
            }
            return false;
        }
    };

    @Override
    protected void onResume() {
        navigation.getMenu().getItem(0).setChecked(true);
    }

```