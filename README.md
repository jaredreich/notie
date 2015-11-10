# notie.js

notie.js is a clean and simple notification plugin (alert/growl style) for javascript, with no dependencies.
Demo: https://jaredreich.com/projects/notie

![Alt text](/demo.gif?raw=true "Demo")

* Pure javascript, no dependencies, only one file to include
* Change the colors to match your style/brand
* Font size auto-adjusts based on screen size
* Turn off bottom shadow for flat design, on for material design
* Easily customizable
* Fun and easy to use! :D

## Usage
In your html:
```html
<body>
  ...
  <script src="/path/to/notie.js"></script>
</body>
```
In your javascript:
```javascript
notie.alert(style, 'message', time_in_seconds);
notie.confirm('Title text', 'Yes button text', 'No/cancel button text', yes_callback)
```
For example:
```javascript
notie.alert(1, 'Success!', 1.5);
notie.alert(2, 'Warning<br><b>with</b><br><i>HTML</i><br><u>included.</u>', 2);
notie.alert(3, 'Error.', 2.5);

notie.confirm('Are you sure you want to do that?', 'Yes', 'Cancel', function() {
    notie.alert(1, 'Good choice!', 2);
});
notie.confirm('Are you sure?', 'Yes', 'Cancel', function() {
    notie.confirm('Are you <b>really</b> sure?', 'Yes', 'Cancel', function() {
        notie.confirm('Are you really <b>really</b> sure?', 'Yes', 'Cancel', function() {
            notie.alert(1, 'Okay, jeez...', 2);
        });
    });
});
```

## Options
At the top of notie.js you can change all the colors to match your style/brand, turn on or off the bottom shadow, and change the large and small font sizes that auto adjust based on screen width.
```css
var shadow = true;
var font_size_small = '18px';
var font_size_big = '24px';

var alert_color_success_background = '#57BF57';
var alert_color_warning_background = '#E3B771';
var alert_color_error_background = '#E1715B';
var alert_color_text = 'white';

var confirm_color_background = '#4D82D6';
var confirm_color_yes_background = '#57bf57';
var confirm_color_no_background = '#E1715B';
var confirm_color_text = 'white';
var confirm_color_yes_text = 'white';
var confirm_color_no_text = 'white';
```

## License
MIT