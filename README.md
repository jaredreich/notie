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
npm install notie-js
```

Bower:
```
bower install notie
```


## Usage

```javascript
notie.alert(styleNumber, 'message', timeInSeconds);
notie.confirm('Title text', 'Yes button text', 'No button text', yesCallback)
notie.input('Title text', 'Submit button text', 'Cancel button text', 'type', 'placeholder', submitCallback, 'Optional pre-filled value');
```
For example:
```javascript
notie.alert(1, 'Success!', 1.5);
notie.alert(2, 'Warning<br><b>with</b><br><i>HTML</i><br><u>included.</u>', 2);
notie.alert(3, 'Error.', 2.5);
notie.alert(4, 'Information.' 2);

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

notie.input('Please enter your email address:', 'Submit', 'Cancel', 'email', 'name@example.com', function(valueEntered) {
    notie.alert(1, 'You entered: ' + valueEntered, 2);
});
notie.input('What city do you live in?', 'Submit', 'Cancel', 'text', 'Enter your city:', function(valueEntered) {
    notie.alert(1, 'You entered: ' + valueEntered, 2);
}, 'New York');

```

## Options
At the top of notie.js you can change all the colors to match your style/brand, turn on or off the bottom shadow, and change the large and small font sizes that auto adjust based on screen width.
```javascript
// General
var shadow = true;
var fontSizeSmall = '18px';
var fontSizeBig = '24px';
var fontChangeScreenWidth = 600;
var animationDelay = 0.3;

// notie.alert colors
var alertColorSuccessBackground = '#57BF57';
var alertColorWarningBackground = '#E3B771';
var alertColorErrorBackground = '#E1715B';
var alertColorInfoBackground = '#4D82D6';
var alertColorText = '#FFF';

// notie.confirm colors
var confirmAndInputColorBackground = '#4D82D6';
var confirmAndInputColorYesBackground = '#57BF57';
var confirmAndInputColorNoBackground = '#E1715B';
var confirmAndInputColorText = '#FFF';
var confirmAndInputColorYesText = '#FFF';
var confirmAndInputColorNoText = '#FFF';

// ID's for use within your own .css file (OPTIONAL)
// (Be sure to use !important to override the javascript)
// Example: #notie-alert-inner { padding: 30px !important; }
var alertOuterID = 'notie-alert-outer';
var alertInnerID = 'notie-alert-inner';
var alertTextID = 'notie-alert-text';
var confirmOuterID = 'notie-confirm-outer';
var confirmInnerID = 'notie-confirm-inner';
var confirmBackdropID = 'notie-confirm-backdrop';
var confirmYesID = 'notie-confirm-yes';
var confirmNoID = 'notie-confirm-no';
var confirmTextID = 'notie-confirm-text';
var confirmYesTextID = 'notie-confirm-yes-text';
var confirmNoTextID = 'notie-confirm-no-text';
var inputOuterID = 'notie-input-outer';
var inputInnerID = 'notie-input-inner';
var inputBackdropID = 'notie-input-backdrop';
var inputDivID = 'notie-input-div';
var inputFieldID = 'notie-input-field';
var inputYesID = 'notie-input-yes';
var inputNoID = 'notie-input-no';
var inputTextID = 'notie-input-text';
var inputYesTextID = 'notie-input-yes-text';
var inputNoTextID = 'notie-input-no-text';
```

## License
MIT