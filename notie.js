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


// SETTINGS
// *********************************************
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
// *********************************************






// NOTIE
// *********************************************

// notie elements and styling
var notie_outer = document.createElement('div');
notie_outer.style.position = 'fixed';
notie_outer.style.top = '0';
notie_outer.style.left = '0';
notie_outer.style.zIndex = '999999999';
notie_outer.style.height = 'auto';
notie_outer.style.width = '100%';
notie_outer.style.display = 'none';
notie_outer.style.textAlign = 'center';
notie_outer.style.cursor = 'default';
notie_outer.style.MozTransition = '';
notie_outer.style.WebkitTransition = '';
notie_outer.style.transition = '';
var notie_inner = document.createElement('div');
notie_inner.style.padding = '20px';
notie_inner.style.display = 'table-cell';
notie_inner.style.verticalAlign = 'middle';
notie_outer.appendChild(notie_inner);

// Initialize notie text
var notie_text = document.createElement('span');
notie_text.style.color = notie_color_text;
if (window.innerWidth <= 600) { notie_text.style.fontSize = notie_font_size_small; }
else { notie_text.style.fontSize = notie_font_size_big; }
window.addEventListener('resize', function(){
    if (window.innerWidth <= 600) { notie_text.style.fontSize = notie_font_size_small; }
    else { notie_text.style.fontSize = notie_font_size_big; }
}, true);
notie_inner.appendChild(notie_text);

// Attach notie to the body element
document.body.appendChild(notie_outer);

// Declare variables
var notie_height = 0;
var notie_is_showing = false;
var notie_timeout0;
var notie_timeout1;
var notie_timeout2;
var notie_was_clicked_counter = 0;

function notie(type, message, seconds) {
    
    notie_was_clicked_counter++;
    
    notie_timeout0 = setTimeout(function() {
        notie_was_clicked_counter--;
    }, 300);
    
    if (notie_was_clicked_counter == 1) {
        
        if (notie_is_showing) {
            
            clearTimeout(notie_timeout1);
            clearTimeout(notie_timeout2);

            notie_hide(function() {
                notie_show(type, message, seconds);
            });
            
        }
        else {
            notie_show(type, message, seconds);
        }
        
    }
    
}

function notie_show(type, message, seconds) {
    
    notie_is_showing = true;
    
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
            notie_outer.style.backgroundColor = notie_color_success_background;
            break;
        case 2:
            notie_outer.style.backgroundColor = notie_color_warning_background;
            break;
        case 3:
            notie_outer.style.backgroundColor = notie_color_error_background;
            break;
    }
    
    // Set notie text
    notie_text.innerHTML = message;
    
    // Get notie's height
    notie_outer.style.top = -10000;
    notie_outer.style.display = 'table';
    notie_height = notie_outer.offsetHeight;
    notie_outer.style.top = '-' + notie_height + 'px';
    
    notie_timeout1 = setTimeout(function() {
        
        if (notie_shadow) { notie_outer.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)'; }
        notie_outer.style.MozTransition = 'all 0.3s ease';
        notie_outer.style.WebkitTransition = 'all 0.3s ease';
        notie_outer.style.transition = 'all 0.3s ease';
        
        notie_outer.style.top = 0;
        
        notie_timeout2 = setTimeout(function() {
            
            notie_hide(function() {
                // Nothing
            });
            
        }, duration);
        
    }, 20);
    
}

function notie_hide(callback) {
    
    notie_outer.style.top = '-' + notie_outer.offsetHeight + 'px';

    setTimeout(function() {

        if (notie_shadow) { notie_outer.style.boxShadow = ''; }
        notie_outer.style.MozTransition = '';
        notie_outer.style.WebkitTransition = '';
        notie_outer.style.transition = '';

        notie_is_showing = false;

        callback();

    }, 310);
    
}



// NOTIE_CONFIRM
// *********************************************

// notie_confirm elements and styling
var notie_confirm_outer = document.createElement('div');
notie_confirm_outer.style.position = 'fixed';
notie_confirm_outer.style.top = '0';
notie_confirm_outer.style.left = '0';
notie_confirm_outer.style.zIndex = '999999998';
notie_confirm_outer.style.height = 'auto';
notie_confirm_outer.style.width = '100%';
notie_confirm_outer.style.display = 'none';
notie_confirm_outer.style.textAlign = 'center';
notie_confirm_outer.style.MozTransition = '';
notie_confirm_outer.style.WebkitTransition = '';
notie_confirm_outer.style.transition = '';

var notie_confirm_backdrop = document.createElement('div');
notie_confirm_backdrop.style.position = 'fixed';
notie_confirm_backdrop.style.top = '0';
notie_confirm_backdrop.style.left = '0';
notie_confirm_backdrop.style.zIndex = '999999997';
notie_confirm_backdrop.style.height = '100%';
notie_confirm_backdrop.style.width = '100%';
notie_confirm_backdrop.style.display = 'none';
notie_confirm_backdrop.style.backgroundColor = 'white';
notie_confirm_backdrop.style.MozTransition = 'all 0.3s ease';
notie_confirm_backdrop.style.WebkitTransition = 'all 0.3s ease';
notie_confirm_backdrop.style.transition = 'all 0.3s ease';
notie_confirm_backdrop.style.opacity = '0';
notie_confirm_backdrop.onclick = function() { notie_confirm_hide(); }

var notie_confirm_inner = document.createElement('div');
notie_confirm_inner.style.boxSizing = 'border-box';
notie_confirm_inner.style.width = '100%';
notie_confirm_inner.style.padding = '20px';
notie_confirm_inner.style.display = 'block';
notie_confirm_inner.style.cursor = 'default';
notie_confirm_inner.style.backgroundColor = notie_confirm_color_background;
notie_confirm_outer.appendChild(notie_confirm_inner);

var notie_confirm_yes = document.createElement('div');
notie_confirm_yes.style.cssFloat = 'left';
notie_confirm_yes.style.height = '50px';
notie_confirm_yes.style.lineHeight = '50px';
notie_confirm_yes.style.width = '50%';
notie_confirm_yes.style.cursor = 'pointer';
notie_confirm_yes.style.backgroundColor = notie_confirm_color_yes_background;
notie_confirm_outer.appendChild(notie_confirm_yes);

var notie_confirm_no = document.createElement('div');
notie_confirm_no.style.cssFloat = 'right';
notie_confirm_no.style.height = '50px';
notie_confirm_no.style.lineHeight = '50px';
notie_confirm_no.style.width = '50%';
notie_confirm_no.style.cursor = 'pointer';
notie_confirm_no.style.backgroundColor = notie_confirm_color_no_background;
notie_confirm_no.onclick = function() { notie_confirm_hide(); }
notie_confirm_outer.appendChild(notie_confirm_no);

// Initialize notie_confirm text
var notie_confirm_text = document.createElement('span');
notie_confirm_text.style.color = notie_confirm_color_text;
if (window.innerWidth <= 600) { notie_confirm_text.style.fontSize = notie_font_size_small; }
else { notie_confirm_text.style.fontSize = notie_font_size_big; }
window.addEventListener('resize', function(){
    if (window.innerWidth <= 600) { notie_confirm_text.style.fontSize = notie_font_size_small; }
    else { notie_confirm_text.style.fontSize = notie_font_size_big; }
}, true);
notie_confirm_inner.appendChild(notie_confirm_text);

var notie_confirm_yes_text = document.createElement('span');
notie_confirm_yes_text.style.color = notie_confirm_color_yes_text;
if (window.innerWidth <= 600) { notie_confirm_yes_text.style.fontSize = notie_font_size_small; }
else { notie_confirm_yes_text.style.fontSize = notie_font_size_big; }
window.addEventListener('resize', function(){
    if (window.innerWidth <= 600) { notie_confirm_yes_text.style.fontSize = notie_font_size_small; }
    else { notie_confirm_yes_text.style.fontSize = notie_font_size_big; }
}, true);
notie_confirm_yes.appendChild(notie_confirm_yes_text);

var notie_confirm_no_text = document.createElement('span');
notie_confirm_no_text.style.color = notie_confirm_color_no_text;
if (window.innerWidth <= 600) { notie_confirm_no_text.style.fontSize = notie_font_size_small; }
else { notie_confirm_no_text.style.fontSize = notie_font_size_big; }
window.addEventListener('resize', function(){
    if (window.innerWidth <= 600) { notie_confirm_no_text.style.fontSize = notie_font_size_small; }
    else { notie_confirm_no_text.style.fontSize = notie_font_size_big; }
}, true);
notie_confirm_no.appendChild(notie_confirm_no_text);

// Attach notie_confirm elements to the body element
document.body.appendChild(notie_confirm_outer);
document.body.appendChild(notie_confirm_backdrop);

// Declare variables
var notie_confirm_height = 0;
var notie_confirm_is_showing = false;

function notie_confirm(title, yes_text, no_text, yes_callback) {
    
    notie_confirm_show(title, yes_text, no_text, yes_callback);
    
}
function notie_confirm_show(title, yes_text, no_text, yes_callback) {
    
    scroll_disable();
    
    // Yes callback function
    notie_confirm_yes.onclick = function() {
        notie_confirm_hide();
        setTimeout(function() {
            yes_callback();
        }, 310);
    }
    
    function notie_confirm_show_inner() {
        
        // Set notie_confirm text
        notie_confirm_text.innerHTML = title;
        notie_confirm_yes_text.innerHTML = yes_text;
        notie_confirm_no_text.innerHTML = no_text;

        // Get notie_confirm's height
        notie_confirm_outer.style.top = -10000;
        notie_confirm_outer.style.display = 'table';
        notie_confirm_height = notie_confirm_outer.offsetHeight;
        notie_confirm_outer.style.top = '-' + notie_confirm_height + 'px';
        notie_confirm_backdrop.style.display = 'block';

        setTimeout(function() {

            if (notie_shadow) { notie_confirm_outer.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)'; }
            notie_confirm_outer.style.MozTransition = 'all 0.3s ease';
            notie_confirm_outer.style.WebkitTransition = 'all 0.3s ease';
            notie_confirm_outer.style.transition = 'all 0.3s ease';

            notie_confirm_outer.style.top = 0;
            notie_confirm_backdrop.style.opacity = '0.75';
            
            setTimeout(function() {
                notie_confirm_is_showing = true;
            }, 310);
            
        }, 20);
        
    }
    
    if (notie_confirm_is_showing) {
        notie_confirm_hide();
        setTimeout(function() {
            notie_confirm_show_inner();
        }, 310);
    }
    else {
        notie_confirm_show_inner();
    }
    
}

function notie_confirm_hide() {
    
    notie_confirm_outer.style.top = '-' + notie_confirm_outer.offsetHeight + 'px';
    notie_confirm_backdrop.style.opacity = '0';

    setTimeout(function() {

        if (notie_shadow) { notie_confirm_outer.style.boxShadow = ''; }
        notie_confirm_outer.style.MozTransition = '';
        notie_confirm_outer.style.WebkitTransition = '';
        notie_confirm_outer.style.transition = '';
        notie_confirm_backdrop.style.display = 'none';
        
        scroll_enable();
        
        notie_confirm_is_showing = false;

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