


# Draw a circle of radius 5 Km using add object of Interactive maps API
Add the following code before </script> tag

```javascript
    function drawCircle(){
        var circle = new H.map.Circle(myPos,5000,{ style: customStyle })
        map.addObject(circle)
        };

    drawCircle();
```
</br> Double-click on saved file to view on browser


[![Foo](https://github.com/heremaps/devrel-workshops/blob/master/javascript/intro-shruti/img/s4.png)](https://github.com/heremaps/devrel-workshops/blob/master/javascript/intro-shruti/Step4.md) 
