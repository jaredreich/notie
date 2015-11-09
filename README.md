# notie.js

notie.js is a clean and simple notification plugin (alert/growl style) for javascript, with no dependencies.
Demo: https://jaredreich.com/projects/notie

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
notie(1, 'Success!', 2);
notie(2, 'Warning<br><b>with</b><br><i>HTML</i><br><u>included.</u>', 2);
notie(3, 'Error.', 2.5);
notie_confirm('Are you sure you want to do that?<br><b>That\'s a bold move...</b>', 'Yes', 'Cancel', function() {
    notie(1, 'Good choice!', 2);
});
```

## License
MIT