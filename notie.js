/*
 * notie.js - A clean and simple notification plugin (alert/growl style) for javascript, with no dependencies.
 *
 * Copyright (c) 2015 Jared Reich
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 * https://jaredreich.com/projects/notie
 *
 * Version:  1.0
 *
*/

var notie = function(){

// SETTINGS
// *********************************************
var shadow = true;
var font_size_small = '18px';
var font_size_big = '24px';

var color_success_background = '#57BF57';
var color_warning_background = '#E3B771';
var color_error_background = '#E1715B';
var color_text = 'white';

var confirm_color_background = '#4D82D6';
var confirm_color_yes_background = '#57bf57';
var confirm_color_no_background = '#E1715B';
var confirm_color_text = 'white';
var confirm_color_yes_text = 'white';
var confirm_color_no_text = 'white';
// *********************************************






// NOTIE
// *********************************************

// notie elements and styling
var outer = document.createElement('div');
outer.style.position = 'fixed';
outer.style.top = '0';
outer.style.left = '0';
outer.style.zIndex = '999999999';
outer.style.height = 'auto';
outer.style.width = '100%';
outer.style.display = 'none';
outer.style.textAlign = 'center';
outer.style.cursor = 'default';
outer.style.MozTransition = '';
outer.style.WebkitTransition = '';
outer.style.transition = '';
var inner = document.createElement('div');
inner.style.padding = '20px';
inner.style.display = 'table-cell';
inner.style.verticalAlign = 'middle';
outer.appendChild(inner);

// Initialize notie text
var text = document.createElement('span');
text.style.color = color_text;
if (window.innerWidth <= 600) { text.style.fontSize = font_size_small; }
else { text.style.fontSize = font_size_big; }
window.addEventListener('resize', function(){
    if (window.innerWidth <= 600) { text.style.fontSize = font_size_small; }
    else { text.style.fontSize = font_size_big; }
}, true);
inner.appendChild(text);

// Attach notie to the body element
document.body.appendChild(outer);

// Declare variables
var height = 0;
var is_showing = false;
var timeout0;
var timeout1;
var timeout2;
var was_clicked_counter = 0;

function alert(type, message, seconds) {
    
    was_clicked_counter++;
    
    timeout0 = setTimeout(function() {
        was_clicked_counter--;
    }, 300);
    
    if (was_clicked_counter == 1) {
        
        if (is_showing) {
            
            clearTimeout(timeout1);
            clearTimeout(timeout2);

            hide(function() {
                show(type, message, seconds);
            });
            
        }
        else {
            show(type, message, seconds);
        }
        
    }
    
}

function show(type, message, seconds) {
    
    is_showing = true;
    
    var duration = 0;
    if (typeof seconds == 'undefined') {
        var duration = 3000;
    }
    else if (seconds < 1) {
        duration = 1000;
    }
    else {
        duration = seconds * 1000;
    }
    
    // Set notie type (background color)
    switch(type) {
        case 1:
            outer.style.backgroundColor = color_success_background;
            break;
        case 2:
            outer.style.backgroundColor = color_warning_background;
            break;
        case 3:
            outer.style.backgroundColor = color_error_background;
            break;
    }
    
    // Set notie text
    text.innerHTML = message;
    
    // Get notie's height
    outer.style.top = -10000;
    outer.style.display = 'table';
    height = outer.offsetHeight;
    outer.style.top = '-' + height + 'px';
    
    timeout1 = setTimeout(function() {
        
        if (shadow) { outer.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)'; }
        outer.style.MozTransition = 'all 0.3s ease';
        outer.style.WebkitTransition = 'all 0.3s ease';
        outer.style.transition = 'all 0.3s ease';
        
        outer.style.top = 0;
        
        timeout2 = setTimeout(function() {
            
            hide(function() {
                // Nothing
            });
            
        }, duration);
        
    }, 20);
    
}

function hide(callback) {
    
    outer.style.top = '-' + outer.offsetHeight + 'px';

    setTimeout(function() {

        if (shadow) { outer.style.boxShadow = ''; }
        outer.style.MozTransition = '';
        outer.style.WebkitTransition = '';
        outer.style.transition = '';

        is_showing = false;

        callback();

    }, 310);
    
}



// CONFIRM
// *********************************************

// confirm elements and styling
var confirm_outer = document.createElement('div');
confirm_outer.style.position = 'fixed';
confirm_outer.style.top = '0';
confirm_outer.style.left = '0';
confirm_outer.style.zIndex = '999999998';
confirm_outer.style.height = 'auto';
confirm_outer.style.width = '100%';
confirm_outer.style.display = 'none';
confirm_outer.style.textAlign = 'center';
confirm_outer.style.MozTransition = '';
confirm_outer.style.WebkitTransition = '';
confirm_outer.style.transition = '';

var confirm_backdrop = document.createElement('div');
confirm_backdrop.style.position = 'fixed';
confirm_backdrop.style.top = '0';
confirm_backdrop.style.left = '0';
confirm_backdrop.style.zIndex = '999999997';
confirm_backdrop.style.height = '100%';
confirm_backdrop.style.width = '100%';
confirm_backdrop.style.display = 'none';
confirm_backdrop.style.backgroundColor = 'white';
confirm_backdrop.style.MozTransition = 'all 0.3s ease';
confirm_backdrop.style.WebkitTransition = 'all 0.3s ease';
confirm_backdrop.style.transition = 'all 0.3s ease';
confirm_backdrop.style.opacity = '0';
confirm_backdrop.onclick = function() { confirm_hide(); }

var confirm_inner = document.createElement('div');
confirm_inner.style.boxSizing = 'border-box';
confirm_inner.style.width = '100%';
confirm_inner.style.padding = '20px';
confirm_inner.style.display = 'block';
confirm_inner.style.cursor = 'default';
confirm_inner.style.backgroundColor = confirm_color_background;
confirm_outer.appendChild(confirm_inner);

var confirm_yes = document.createElement('div');
confirm_yes.style.cssFloat = 'left';
confirm_yes.style.height = '50px';
confirm_yes.style.lineHeight = '50px';
confirm_yes.style.width = '50%';
confirm_yes.style.cursor = 'pointer';
confirm_yes.style.backgroundColor = confirm_color_yes_background;
confirm_outer.appendChild(confirm_yes);

var confirm_no = document.createElement('div');
confirm_no.style.cssFloat = 'right';
confirm_no.style.height = '50px';
confirm_no.style.lineHeight = '50px';
confirm_no.style.width = '50%';
confirm_no.style.cursor = 'pointer';
confirm_no.style.backgroundColor = confirm_color_no_background;
confirm_no.onclick = function() { confirm_hide(); }
confirm_outer.appendChild(confirm_no);

// Initialize confirm text
var confirm_text = document.createElement('span');
confirm_text.style.color = confirm_color_text;
if (window.innerWidth <= 600) { confirm_text.style.fontSize = font_size_small; }
else { confirm_text.style.fontSize = font_size_big; }
window.addEventListener('resize', function(){
    if (window.innerWidth <= 600) { confirm_text.style.fontSize = font_size_small; }
    else { confirm_text.style.fontSize = font_size_big; }
}, true);
confirm_inner.appendChild(confirm_text);

var confirm_yes_text = document.createElement('span');
confirm_yes_text.style.color = confirm_color_yes_text;
if (window.innerWidth <= 600) { confirm_yes_text.style.fontSize = font_size_small; }
else { confirm_yes_text.style.fontSize = font_size_big; }
window.addEventListener('resize', function(){
    if (window.innerWidth <= 600) { confirm_yes_text.style.fontSize = font_size_small; }
    else { confirm_yes_text.style.fontSize = font_size_big; }
}, true);
confirm_yes.appendChild(confirm_yes_text);

var confirm_no_text = document.createElement('span');
confirm_no_text.style.color = confirm_color_no_text;
if (window.innerWidth <= 600) { confirm_no_text.style.fontSize = font_size_small; }
else { confirm_no_text.style.fontSize = font_size_big; }
window.addEventListener('resize', function(){
    if (window.innerWidth <= 600) { confirm_no_text.style.fontSize = font_size_small; }
    else { confirm_no_text.style.fontSize = font_size_big; }
}, true);
confirm_no.appendChild(confirm_no_text);

// Attach confirm elements to the body element
document.body.appendChild(confirm_outer);
document.body.appendChild(confirm_backdrop);

// Declare variables
var confirm_height = 0;
var confirm_is_showing = false;

function confirm(title, yes_text, no_text, yes_callback) {
    
    confirm_show(title, yes_text, no_text, yes_callback);
    
}
function confirm_show(title, yes_text, no_text, yes_callback) {
    
    scroll_disable();
    
    // Yes callback function
    confirm_yes.onclick = function() {
        confirm_hide();
        setTimeout(function() {
            yes_callback();
        }, 310);
    }
    
    function confirm_show_inner() {
        
        // Set confirm text
        confirm_text.innerHTML = title;
        confirm_yes_text.innerHTML = yes_text;
        confirm_no_text.innerHTML = no_text;

        // Get confirm's height
        confirm_outer.style.top = -10000;
        confirm_outer.style.display = 'table';
        confirm_height = confirm_outer.offsetHeight;
        confirm_outer.style.top = '-' + confirm_height + 'px';
        confirm_backdrop.style.display = 'block';

        setTimeout(function() {

            if (shadow) { confirm_outer.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)'; }
            confirm_outer.style.MozTransition = 'all 0.3s ease';
            confirm_outer.style.WebkitTransition = 'all 0.3s ease';
            confirm_outer.style.transition = 'all 0.3s ease';

            confirm_outer.style.top = 0;
            confirm_backdrop.style.opacity = '0.75';
            
            setTimeout(function() {
                confirm_is_showing = true;
            }, 310);
            
        }, 20);
        
    }
    
    if (confirm_is_showing) {
        confirm_hide();
        setTimeout(function() {
            confirm_show_inner();
        }, 310);
    }
    else {
        confirm_show_inner();
    }
    
}

function confirm_hide() {
    
    confirm_outer.style.top = '-' + confirm_outer.offsetHeight + 'px';
    confirm_backdrop.style.opacity = '0';

    setTimeout(function() {

        if (shadow) { confirm_outer.style.boxShadow = ''; }
        confirm_outer.style.MozTransition = '';
        confirm_outer.style.WebkitTransition = '';
        confirm_outer.style.transition = '';
        confirm_backdrop.style.display = 'none';
        
        scroll_enable();
        
        confirm_is_showing = false;

    }, 310);
    
}


// Scroll Disable and Enable
var scroll_disable_function = function(e) { e.preventDefault(); }
function scroll_disable() {
    document.body.style.height = '100%;';
    document.body.style.overflow = 'hidden';
    document.ontouchstart = function(e){ e.preventDefault(); }
}
function scroll_enable() {
    document.body.style.height = '';
    document.body.style.overflow = '';
    document.ontouchstart = function(e){ return true; }
}
return {
    alert: alert,
    confirm: confirm
}

}();
