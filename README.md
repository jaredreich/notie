# notie.js

notie.js is a clean and simple notification plugin (alert/growl style) for javascript, with no dependencies.
Demo: https://jaredreich.com/projects/notie

![Alt text](/demo.gif?raw=true "Demo")

* Pure javascript, no dependencies, only one file to include
* Change the colors to match your brand
* Font size auto-adjusts based on screen size
* Turn off bottom shadown for flat design, on for material design
* Easily customizable

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
notie(style, 'message', time_in_seconds);
notie_confirm('Title text', 'Yes button text', 'No/cancel button text', yes_callback)
```
For example:
```javascript
notie(1, 'Success!', 1.5);
notie(2, 'Warning<br><b>with</b><br><i>HTML</i><br><u>included.</u>', 2);
notie(3, 'Error.', 2.5);
notie_confirm('Are you sure you want to do that?', 'Yes', 'Cancel', function() {
    notie(1, 'Good choice!', 2);
});
notie_confirm('Are you sure?', 'Yes', 'Cancel', function() {
    notie_confirm('Are you <b>really</b> sure?', 'Yes', 'Cancel', function() {
        notie_confirm('Are you <b>really</b> <u>really</u> sure?', 'Yes', 'Cancel', function() {
            notie(1, 'Okay, jeez...', 2);
        });
    });
});
```

## Options
At the top of notie.js you can change all the colors to match your brand, turn on or off the bottom shadow, and change the large and small font sizes that auto adjust based on screen width.
```css
var notie_shadow = true;
var notie_font_size_small = '18px';
var notie_font_size_big = '24px';

var notie_color_success_background = '#57BF57';
var notie_color_warning_background = '#E3B771';
var notie_color_error_background = '#E1715B';
var notie_color_text = 'white';

var notie_confirm_color_background = '#4D82D6';
var notie_confirm_color_yes_background = '#57bf57';
var notie_confirm_color_no_background = '#E1715B';
var notie_confirm_color_text = 'white';
var notie_confirm_color_yes_text = 'white';
var notie_confirm_color_no_text = 'white';
```

## License
MIT