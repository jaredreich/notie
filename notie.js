/*
 * notie.js - A clean and simple notification plugin (alert/growl style) for javascript, with no dependencies.
 *
 * Copyright (c) 2015 Jared Reich
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 * https://jaredreich.com/projects/notie.js
 *
 * Version:  1.1.1
 *
*/

var notie = function(){

    // SETTINGS
    // *********************************************
    
    // General
    var shadow = true;
    var font_size_small = '18px';
    var font_size_big = '24px';
    var font_change_screen_width = 600;
    var animation_delay = 0.3;
    
    // notie.alert colors
    var alert_color_success_background = '#57BF57';
    var alert_color_warning_background = '#E3B771';
    var alert_color_error_background = '#E1715B';
    var alert_color_info_background = '#4D82D6';
    var alert_color_text = '#FFF';

    // notie.confirm colors
    var confirm_color_background = '#4D82D6';
    var confirm_color_yes_background = '#57bf57';
    var confirm_color_no_background = '#E1715B';
    var confirm_color_text = '#FFF';
    var confirm_color_yes_text = '#FFF';
    var confirm_color_no_text = '#FFF';
    
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
    
    // *********************************************
    
    
    
    // NOTIE.ALERT
    // *********************************************

    // notie elements and styling
    var alert_outer = document.createElement('div');
    alert_outer.id = alert_outer_id;
    alert_outer.style.position = 'fixed';
    alert_outer.style.top = '0';
    alert_outer.style.left = '0';
    alert_outer.style.zIndex = '999999999';
    alert_outer.style.height = 'auto';
    alert_outer.style.width = '100%';
    alert_outer.style.display = 'none';
    alert_outer.style.textAlign = 'center';
    alert_outer.style.cursor = 'default';
    alert_outer.style.MozTransition = '';
    alert_outer.style.WebkitTransition = '';
    alert_outer.style.transition = '';
    alert_outer.style.cursor = 'pointer';
    alert_outer.addEventListener('click', function() {
        clearTimeout(alert_timeout_1);
        clearTimeout(alert_timeout_2);
        alert_hide();
    });
    var alert_inner = document.createElement('div');
    alert_inner.id = alert_inner_id;
    alert_inner.style.padding = '20px';
    alert_inner.style.display = 'table-cell';
    alert_inner.style.verticalAlign = 'middle';
    alert_outer.appendChild(alert_inner);

    // Initialize notie text
    var alert_text = document.createElement('span');
    alert_text.id = alert_text_id;
    alert_text.style.color = alert_color_text;
    if (window.innerWidth <= font_change_screen_width) { alert_text.style.fontSize = font_size_small; }
    else { alert_text.style.fontSize = font_size_big; }
    window.addEventListener('resize', function(){
        if (window.innerWidth <= font_change_screen_width) { alert_text.style.fontSize = font_size_small; }
        else { alert_text.style.fontSize = font_size_big; }
    }, true);
    alert_inner.appendChild(alert_text);

    // Attach notie to the body element
    document.body.appendChild(alert_outer);

    // Declare variables
    var height = 0;
    var is_showing = false;
    var alert_timeout_1;
    var alert_timeout_2;
    var was_clicked_counter = 0;

    function alert(type, message, seconds) {

        was_clicked_counter++;

        setTimeout(function() {
            was_clicked_counter--;
        }, (animation_delay * 1000 + 10));

        if (was_clicked_counter == 1) {

            if (is_showing) {

                clearTimeout(alert_timeout_1);
                clearTimeout(alert_timeout_2);

                alert_hide(function() {
                    alert_show(type, message, seconds);
                });

            }
            else {
                alert_show(type, message, seconds);
            }

        }

    }

    function alert_show(type, message, seconds) {

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
                alert_outer.style.backgroundColor = alert_color_success_background;
                break;
            case 2:
                alert_outer.style.backgroundColor = alert_color_warning_background;
                break;
            case 3:
                alert_outer.style.backgroundColor = alert_color_error_background;
                break;
            case 4:
                alert_outer.style.backgroundColor = alert_color_info_background;
                break;
        }

        // Set notie text
        alert_text.innerHTML = message;

        // Get notie's height
        alert_outer.style.top = '-10000px';
        alert_outer.style.display = 'table';
        alert_outer.style.top = '-' + alert_outer.offsetHeight - 5 + 'px';

        alert_timeout_1 = setTimeout(function() {

            if (shadow) { alert_outer.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)'; }
            alert_outer.style.MozTransition = 'all ' + animation_delay + 's ease';
            alert_outer.style.WebkitTransition = 'all ' + animation_delay + 's ease';
            alert_outer.style.transition = 'all ' + animation_delay + 's ease';

            alert_outer.style.top = 0;

            alert_timeout_2 = setTimeout(function() {

                alert_hide(function() {
                    // Nothing
                });

            }, duration);

        }, 20);

    }

    function alert_hide(callback) {

        alert_outer.style.top = '-' + alert_outer.offsetHeight - 5 + 'px';

        setTimeout(function() {

            if (shadow) { alert_outer.style.boxShadow = ''; }
            alert_outer.style.MozTransition = '';
            alert_outer.style.WebkitTransition = '';
            alert_outer.style.transition = '';
            
            alert_outer.style.top = '-10000px';

            is_showing = false;

            callback();

        }, (animation_delay * 1000 + 10));

    }



    // NOTIE.CONFIRM
    // *********************************************

    // confirm elements and styling
    var confirm_outer = document.createElement('div');
    confirm_outer.id = confirm_outer_id;
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
    confirm_backdrop.id = confirm_backdrop_id;
    confirm_backdrop.style.position = 'fixed';
    confirm_backdrop.style.top = '0';
    confirm_backdrop.style.left = '0';
    confirm_backdrop.style.zIndex = '999999997';
    confirm_backdrop.style.height = '100%';
    confirm_backdrop.style.width = '100%';
    confirm_backdrop.style.display = 'none';
    confirm_backdrop.style.backgroundColor = 'white';
    confirm_backdrop.style.MozTransition = 'all ' + animation_delay + 's ease';
    confirm_backdrop.style.WebkitTransition = 'all ' + animation_delay + 's ease';
    confirm_backdrop.style.transition = 'all ' + animation_delay + 's ease';
    confirm_backdrop.style.opacity = '0';
    confirm_backdrop.onclick = function() { confirm_hide(); }

    var confirm_inner = document.createElement('div');
    confirm_inner.id = confirm_inner_id;
    confirm_inner.style.boxSizing = 'border-box';
    confirm_inner.style.width = '100%';
    confirm_inner.style.padding = '20px';
    confirm_inner.style.display = 'block';
    confirm_inner.style.cursor = 'default';
    confirm_inner.style.backgroundColor = confirm_color_background;
    confirm_outer.appendChild(confirm_inner);

    var confirm_yes = document.createElement('div');
    confirm_yes.id = confirm_yes_id;
    confirm_yes.style.cssFloat = 'left';
    confirm_yes.style.height = '50px';
    confirm_yes.style.lineHeight = '50px';
    confirm_yes.style.width = '50%';
    confirm_yes.style.cursor = 'pointer';
    confirm_yes.style.backgroundColor = confirm_color_yes_background;
    confirm_outer.appendChild(confirm_yes);

    var confirm_no = document.createElement('div');
    confirm_no.id = confirm_no_id;
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
    confirm_text.id = confirm_text_id;
    confirm_text.style.color = confirm_color_text;
    if (window.innerWidth <= font_change_screen_width) { confirm_text.style.fontSize = font_size_small; }
    else { confirm_text.style.fontSize = font_size_big; }
    window.addEventListener('resize', function(){
        if (window.innerWidth <= font_change_screen_width) { confirm_text.style.fontSize = font_size_small; }
        else { confirm_text.style.fontSize = font_size_big; }
    }, true);
    confirm_inner.appendChild(confirm_text);

    var confirm_yes_text = document.createElement('span');
    confirm_yes_text.id = confirm_yes_text_id;
    confirm_yes_text.style.color = confirm_color_yes_text;
    if (window.innerWidth <= font_change_screen_width) { confirm_yes_text.style.fontSize = font_size_small; }
    else { confirm_yes_text.style.fontSize = font_size_big; }
    window.addEventListener('resize', function(){
        if (window.innerWidth <= font_change_screen_width) { confirm_yes_text.style.fontSize = font_size_small; }
        else { confirm_yes_text.style.fontSize = font_size_big; }
    }, true);
    confirm_yes.appendChild(confirm_yes_text);

    var confirm_no_text = document.createElement('span');
    confirm_no_text.id = confirm_no_text_id;
    confirm_no_text.style.color = confirm_color_no_text;
    if (window.innerWidth <= font_change_screen_width) { confirm_no_text.style.fontSize = font_size_small; }
    else { confirm_no_text.style.fontSize = font_size_big; }
    window.addEventListener('resize', function(){
        if (window.innerWidth <= font_change_screen_width) { confirm_no_text.style.fontSize = font_size_small; }
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
        
        // Hide notie.alert
        clearTimeout(alert_timeout_1);
        clearTimeout(alert_timeout_2);
        alert_hide();

    }
    function confirm_show(title, yes_text, no_text, yes_callback) {

        scroll_disable();

        // Yes callback function
        confirm_yes.onclick = function() {
            confirm_hide();
            setTimeout(function() {
                yes_callback();
            }, (animation_delay * 1000 + 10));
        }

        function confirm_show_inner() {

            // Set confirm text
            confirm_text.innerHTML = title;
            confirm_yes_text.innerHTML = yes_text;
            confirm_no_text.innerHTML = no_text;

            // Get confirm's height
            confirm_outer.style.top = '-10000px';
            confirm_outer.style.display = 'table';
            confirm_outer.style.top = '-' + confirm_outer.offsetHeight - 5 + 'px';
            confirm_backdrop.style.display = 'block';

            setTimeout(function() {

                if (shadow) { confirm_outer.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)'; }
                confirm_outer.style.MozTransition = 'all ' + animation_delay + 's ease';
                confirm_outer.style.WebkitTransition = 'all ' + animation_delay + 's ease';
                confirm_outer.style.transition = 'all ' + animation_delay + 's ease';

                confirm_outer.style.top = 0;
                confirm_backdrop.style.opacity = '0.75';

                setTimeout(function() {
                    confirm_is_showing = true;
                }, (animation_delay * 1000 + 10));

            }, 20);

        }

        if (confirm_is_showing) {
            confirm_hide();
            setTimeout(function() {
                confirm_show_inner();
            }, (animation_delay * 1000 + 10));
        }
        else {
            confirm_show_inner();
        }

    }

    function confirm_hide() {

        confirm_outer.style.top = '-' + confirm_outer.offsetHeight - 5 + 'px';
        confirm_backdrop.style.opacity = '0';

        setTimeout(function() {

            if (shadow) { confirm_outer.style.boxShadow = ''; }
            confirm_outer.style.MozTransition = '';
            confirm_outer.style.WebkitTransition = '';
            confirm_outer.style.transition = '';
            confirm_backdrop.style.display = 'none';
            
            confirm_outer.style.top = '-10000px';

            scroll_enable();

            confirm_is_showing = false;

        }, (animation_delay * 1000 + 10));

    }


    // SCROLL DISABLE AND ENABLE FOR NOTIE.CONFIRM
    // *********************************************
    var original_body_height, original_body_overflow;
    function scroll_disable() {
        original_body_height = document.body.style.height;
        original_body_overflow = document.body.style.overflow;
        document.body.style.height = '100%;';
        document.body.style.overflow = 'hidden';
    }
    function scroll_enable() {
        document.body.style.height = original_body_height;
        document.body.style.overflow = original_body_overflow;
    }
    
    
    
    
    return {
        alert: alert,
        confirm: confirm
    };

}();

if (module) {
    module.exports = notie;
}