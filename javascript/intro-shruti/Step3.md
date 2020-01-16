


# Draw a circle of radius 5 Km using add object of Interactive maps API
Add the following code before </script> tag

```javascript

            function drawCircle(){
                var circle = new H.map.Circle(myPos,5000);
                map.addObject(circle);
            }

            drawCircle();
```
</br> Double-click on saved file to view on browser


[![Foo](https://github.com/kuberaspeaking/HERE-JS-workshop/blob/master/img/s4.png)](https://github.com/kuberaspeaking/HERE-JS-workshop/blob/master/Step4.md) 
