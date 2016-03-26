# notie

[![Join the chat at https://gitter.im/jaredreich/notie](https://badges.gitter.im/jaredreich/notie.svg)](https://gitter.im/jaredreich/notie?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

notie is a clean and simple notification suite for javascript, with no dependencies.
demo: https://jaredreich.com/projects/notie

#### With notie you can:
* Alert users
* Confirm user choices
* Input user information

![Alt text](/demo.gif?raw=true "Demo")

## Features

* Pure JavaScript, no dependencies
* Works in all modern browsers (Chrome, Firefox, Safari, IE 9+, Edge, Opera)
* Easily customizable
* Change colors to match your style/brand
* Modify styling with the sass file (notie.scss)
* Font size auto-adjusts based on screen size

## Installation

HTML:
```html
<head>
  ...
  <link rel="stylesheet" type="text/css" href="/path/to/notie.css">
</head>
<body>
  ...
  <!-- Bottom of body -->
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
notie.alert(alertType(Number), message(String, timeInSeconds);

notie.confirm(title(String), yesText(String), noText(String), yesCallback(Function), noCallbackOptional(Function));

notie.input(options(JSON), title(String), submitText(String), cancelText(String), submitCallback(Function), cancelCallbackOptional(Function));
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
        notie.confirm('Are you <b>really</b> <i>really</i> sure?', 'Yes', 'Cancel', function() {
            notie.alert(1, 'Okay, jeez...', 2);
        });
    });
});

notie.input({
	type: 'email'
	placeholder: 'name@example.com',
	prefilledValue: 'jane@doe.com'
},'Please enter your email address:', 'Submit', 'Cancel', 'email', 'name@example.com', function(value_entered) {
    notie.alert(1, 'You entered: ' + value_entered, 2);
});
notie.input({
	type: 'password',
	placeholder: 'Enter your password'
}, 'Please enter your password:', 'Submit', 'Cancel', function(valueEntered) {
	notie.alert(1, 'You entered: ' + valueEntered, 2);
}, function(valueEntered) {
	notie.alert(3, 'You cancelled with this value: ' + valueEntered, 2);
});

```

## Options
```javascript
notie.setOptions({
	animationDelay: 300, // Be sure to also change "transition: all 0.3s ease" variable in .scss file
	backgroundClickDismiss: true
});
```

## License
MIT
