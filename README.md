# notie

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Join the chat at https://gitter.im/jaredreich/notie](https://badges.gitter.im/jaredreich/notie.svg)](https://gitter.im/jaredreich/notie?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

notie is a clean and simple notification, input, and selection suite for javascript, with no dependencies.
demo: https://jaredreich.com/projects/notie

#### With notie you can:
* Alert users
* Confirm user choices
* Allow users to input information
* Allow users to select choices
* Allow users to select dates

![Alt text](/demo.gif?raw=true "Demo")

## Features

* Pure JavaScript, no dependencies
* Easily customizable
* Change colors to match your style/brand
* Modify styling with the sass file (notie.scss)
* Font size auto-adjusts based on screen size

## Browser Support

* IE 10+
* Chrome 11+
* Firefox 4+
* Safari 5.1+
* Opera 11.5+

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
```bash
npm install notie
```

Bower:
```bash
bower install notie
```


## Usage

```javascript
notie.alert(alertType(Number|String), message(String), timeInSeconds)

notie.confirm(title(String), yesText(String), noText(String), yesCallback(Function), noCallbackOptional(Function))

notie.input(options(JSON), title(String), submitText(String), cancelText(String), submitCallback(Function), cancelCallbackOptional(Function))

notie.select(title(String), cancelText(String), choices(Array of Objects))

notie.date({
  initial: Date,
  yesCallback: Function,
  noCallback: Function
})
```
For example:
```javascript
notie.alert(1, 'Success!') // Never hides unless clicked, or escape or enter is pressed
notie.alert('success', 'Success!', 3)
notie.alert(2, 'Warning<br><b>with</b><br><i>HTML</i><br><u>included.</u>', 2) // Hides after 2 seconds
notie.alert('warning', 'Watch it...', 4)
notie.alert(3, 'Error.', 2.5)
notie.alert('error', 'Oops!', 1.5)
notie.alert(4, 'Information.', 3)
notie.alert('info', 'FYI, blah blah blah.', 4)

notie.confirm('Are you sure you want to do that?', 'Yes', 'Cancel', function() {
  notie.alert(1, 'Good choice!', 2)
})
notie.confirm('Are you sure?', 'Yes', 'Cancel', function() {
  notie.confirm('Are you <b>really</b> sure?', 'Yes', 'Cancel', function() {
    notie.confirm('Are you <b>really</b> <i>really</i> sure?', 'Yes', 'Cancel', function() {
      notie.alert(1, 'Okay, jeez...', 2)
    })
  })
})

notie.input({
  type: 'email'
  placeholder: 'name@example.com',
  prefilledValue: 'jane@doe.com'
}, 'Please enter your email:', 'Submit', 'Cancel', function(valueEntered) {
  notie.alert(1, 'You entered: ' + valueEntered, 2)
}, function(valueEntered) {
  notie.alert(3, 'You cancelled with this value: ' + valueEntered, 2)
})

notie.input({
  type: 'text'
  placeholder: 'Jane Doe',
  allowed: ['a', 'sp']
}, 'Please enter your name:', 'Submit', 'Cancel', function(valueEntered) {
  notie.alert(1, 'You entered: ' + valueEntered, 2)
}, function(valueEntered) {
  notie.alert(3, 'You cancelled with this value: ' + valueEntered, 2)
})

notie.input({
  type: 'text'
  placeholder: '500',
  allowed: new RegExp('[^0-9]', 'g')
}, 'Please enter the price:', 'Submit', 'Cancel', function(valueEntered) {
  notie.alert(1, 'You entered: ' + valueEntered, 2)
}, function(valueEntered) {
  notie.alert(3, 'You cancelled with this value: ' + valueEntered, 2)
})

notie.select('Demo item #1, owner is Jane Smith', 'Cancel',
[
  {
    title: 'Share',
    handler: function () {
      notie.alert(1, 'Share item!', 3)
    }
  },
  {
    title: 'Open',
    color: '#57BF57',
    handler: function () {
      notie.alert(1, 'Open item!', 3)
    }
  },
  {
    title: 'Edit',
    type: 2,
    handler: function () {
      notie.alert(2, 'Edit item!', 3)
    }
  },
  {
    title: 'Delete',
    type: 3,
    handler: function () {
      notie.alert(3, 'Delete item!', 3)
    }
  }
]

notie.date({
  initial: new Date(2015, 8, 27),
  yesCallback: function (date) {
    notie.alert(1, 'You selected: ' + date.toISOString(), 5)
  },
  noCallback: function (date) {
    notie.alert(3, 'You cancelled: ' + date.toISOString(), 5)
  }
})
```

#### Use ES6 to inherit 'this' while using notie
``` javascript
notie.confirm('Is ES6 great?', 'Yes', 'Cancel', () => {
  this.location.href = 'htts://google.com'
})
```

## Options
#### General
```javascript
notie.setOptions({
  colorSuccess: '#57BF57',
  colorWarning: '#D6A14D',
  colorError: '#E1715B',
  colorInfo: '#4D82D6',
  colorNeutral: '#A0A0A0',
  colorText: '#FFFFFF',
  dateMonths: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'], // For other languages
  animationDelay: 300, // Be sure to also change "transition: all 0.3s ease" variable in .scss file
  backgroundClickDismiss: true
})
```

#### Select
[https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes)
```javascript
notie.input({
  autocapitalize: 'words', // default: 'none'
  autocomplete: 'on', // default: 'off'
  autocorrect: 'off', // default: 'off'
  autofocus: 'true', // default: 'true'
  inputmode: 'latin', // default: 'verbatim'
  max: '10000',// default: ''
  maxlength: '10', // default: ''
  min: '5', // default: ''
  minlength: '1', // default: ''
  placeholder: 'Jane Smith', // default: ''
  spellcheck: 'false', // default: 'default'
  step: '5' // default: 'any'
  type: 'text' // default: 'text'
}, 'Please enter your name:', 'Submit', 'Cancel', function(valueEntered) {
  // submit
}, function(valueEntered) {
  // cancel
})
```

## Other Methods
```javascript
notie.alertHide(optionalCallback) // programmatically hide notie.alert with an optional callback function
notie.isShowing() // true if any element of notie is showing, false otherwise
```

## License
MIT
