


# Draw a circle of radius 5 Km using add object of Interactive maps API
Add the following code before </script> tag

```javascript

            function drawCircle(){
                var circle = new H.map.Circle(myPos,5000);
                map.addObject(circle);
            }

            drawCircle();
```
</br>Save file to view the changes


[![Foo](img/s4.png)](Step4.md)
