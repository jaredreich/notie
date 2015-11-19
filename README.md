# notie.js

notie.js is a clean and simple notification plugin (alert/growl style) for javascript, with no dependencies.
Demo: https://jaredreich.com/projects/notie.js

#### With notie.js you can:
* Alert users
* Confirm user choices
* Input user information

![Alt text](/demo.gif?raw=true "Demo")

## Features

* Pure javascript, no dependencies, only one file to include
* Works in all modern browsers (Chrome, Firefox, Safari, IE, Edge, Opera)
* Easily customizable
* Change the colors to match your style/brand
* Font size auto-adjusts based on screen size
* Turn bottom shadow off for flat design, on for material design
* Override or add styling in a separate .css file (optional)

## Installation

HTML:
```html
<body>
  ...
  <script src="/path/to/notie.js"></script>
</body>
```

npm:
```
npm install notie
```

Bower:
```
bower install notie
```


## Usage

```javascript
notie.alert(style_number, 'message', time_in_seconds);
notie.confirm('Title text', 'Yes button text', 'No button text', yes_callback)
notie.input('Title text', 'Submit button text', 'Cancel button text', 'type', 'placeholder', submit_callback, 'Optional pre-filled value');
```
For example:
```javascript
notie.alert(1, 'Success!', 1.5);
notie.alert(2, 'Warning<br><b>with</b><br><i>HTML</i><br><u>included.</u>', 2);
notie.alert(3, 'Error.', 2.5);
notie.alert(4, 'Information.', 2);

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

notie.input('Please enter your email address:', 'Submit', 'Cancel', 'email', 'name@example.com', function(value_entered) {
    notie.alert(1, 'You entered: ' + value_entered, 2);
});
notie.input('What city do you live in?', 'Submit', 'Cancel', 'text', 'Enter your city:', function(value_entered) {
    notie.alert(1, 'You entered: ' + value_entered, 2);
}, 'New York');

```

## Options
At the top of notie.js you can change all the colors to match your style/brand, turn on or off the bottom shadow, and change the large and small font sizes that auto adjust based on screen width.
```javascript
// General
var shadow = true;
var font_size_small = '18px';
var font_size_big = '24px';
var font_change_screen_width = 600;
var animation_delay = 0.3;
var background_click_dismiss = true;

// notie.alert colors
var alert_color_success_background = '#57BF57';
var alert_color_warning_background = '#E3B771';
var alert_color_error_background = '#E1715B';
var alert_color_info_background = '#4D82D6';
var alert_color_text = '#FFF';

// notie.confirm colors
var confirm_and_input_color_background = '#4D82D6';
var confirm_and_input_color_yes_background = '#57BF57';
var confirm_and_input_color_no_background = '#E1715B';
var confirm_and_input_color_text = '#FFF';
var confirm_and_input_color_yes_text = '#FFF';
var confirm_and_input_color_no_text = '#FFF';

// ID's for use within your own .css file (OPTIONAL)
// (Be sure to use !important to override the javascript)
// Example: #notie-alert-inner { padding: 30px !important; }
var alert_outer_id = 'notie-alert-outer';
var alert_inner_id = 'notie-alert-inner';
var alert_text_id = 'notie-alert-text';
var confirm_outer_id = 'notie-confirm-outer';
var confirm_inner_id = 'notie-confirm-inner';
var confirm_backdrop_id = 'notie-confirm-backdrop';
var confirm_yes_id = 'notie-confirm-yes';
var confirm_no_id = 'notie-confirm-no';
var confirm_text_id = 'notie-confirm-text';
var confirm_yes_text_id = 'notie-confirm-yes-text';
var confirm_no_text_id = 'notie-confirm-no-text';
var input_outer_id = 'notie-input-outer';
var input_inner_id = 'notie-input-inner';
var input_backdrop_id = 'notie-input-backdrop';
var input_div_id = 'notie-input-div';
var input_field_id = 'notie-input-field';
var input_yes_id = 'notie-input-yes';
var input_no_id = 'notie-input-no';
var input_text_id = 'notie-input-text';
var input_yes_text_id = 'notie-input-yes-text';
var input_no_text_id = 'notie-input-no-text';
```

## License
MIT