# General Notes

#### calling activity method from recycler view

[link](https://stackoverflow.com/questions/12142255/call-activity-method-from-adapter)

In the adapter Add a new Field :

private Context mContext;
In the adapter Constructor add the following code :

```java
public AdapterName(......,Context context){
//your code.
this.mContext=context;
}
```

In the getView(...) of Adapter :

```java
Button btn=(Button)convertView.findViewById(yourButtonId);
btn.setOnClickListener(new Button.OnClickListener() {

        @Override
        public void onClick(View v) {
            if(mContext instanceof YourActivityName){
                ((YourActivityName)mContext).yourDesiredMethod();
            }
        }
    });
```

replace with your own class names where you see your code, your activity etc.

If you need to use this same adapter for more than one activity then :

Create an Interface
```java
public interface IMethodCaller{
    void yourDesiredMethod();
}
```

Implement this interface in activities you require to have this method calling functionality.

Then in Adapter getView() , call like :

Button btn=(Button)convertView.findViewById(yourButtonId);

```java
btn.setOnClickListener(new Button.OnClickListener() {

    @Override
    public void onClick(View v) {
        if(mContext instanceof IMethodCaller){
            ((IMethodCaller)mContext).yourDesiredMethod();
        }
    }
});
```

You are done. If you need to use this adapter for activities which does not require this calling mechanism, the code will not execute (If check fails).

