# UI related notes

#### decorating button with custom layout 

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item>
        <shape android:shape="rectangle">
            <solid android:color="@color/about_libraries_primary"/>
            <!--for border color-->
            <stroke android:color="#8A2BE2" android:width="2dp" />
            <!--corners allow us to make the rounded corners button-->
            <corners android:radius="10dp" />
        </shape>
    </item>
</selector>
```