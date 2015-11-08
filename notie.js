// SETTINGS
// *********************************************
var notie_font_size_small = '18px';
var notie_font_size_big = '24px';
var notie_color_text = 'white';
var notie_color_success = '#57bf57';
var notie_color_warning = '#D6A14D';
var notie_color_error = '#E1715B';
var notie_color_confirm_text = 'white';
var notie_color_confirm_background = '#4D82D6';
var notie_color_confirm_yes = '#57bf57';
var notie_color_confirm_no = '#E1715B';
// *********************************************



// Create notie elements
var notie_outer = document.createElement('div');
notie_outer.style.position = 'fixed';
notie_outer.style.top = '0';
notie_outer.style.left = '0';
notie_outer.style.zIndex = '999999999';
notie_outer.style.height = 'auto';
notie_outer.style.width = '100%';
notie_outer.style.display = 'none';
notie_outer.style.textAlign = 'center';
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
    
    console.log(notie_was_clicked_counter);
    
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
    
    // Set notie type (background color)
    switch(type) {
        case 1:
            notie_outer.style.backgroundColor = notie_color_success;
            break;
        case 2:
            notie_outer.style.backgroundColor = notie_color_warning;
            break;
        case 3:
            notie_outer.style.backgroundColor = notie_color_error;
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
        
        notie_outer.style.MozTransition = 'all 0.3s ease';
        notie_outer.style.WebkitTransition = 'all 0.3s ease';
        notie_outer.style.transition = 'all 0.3s ease';
        
        notie_outer.style.top = 0;
        
        notie_timeout2 = setTimeout(function() {
            
            notie_hide(function() {
                // Nothing
            });
            
        }, 2000);
        
    }, 20);
    
    
    
}

function notie_hide(callback) {
    
    notie_outer.style.top = '-' + notie_outer.offsetHeight + 'px';

    setTimeout(function() {

        notie_outer.style.MozTransition = '';
        notie_outer.style.WebkitTransition = '';
        notie_outer.style.transition = '';

        notie_is_showing = false;

        callback();

    }, 310);
    
}






// Create notie_confirm elements
var notie_confirm_outer = document.createElement('div');



function notie_confirm(title, yes_text, no_text, yes_callback, first, last) {
    
    scroll_disable();
    
}







/*
function notie_confirm(title, yes_text, cancel_text, yes_callback, first, last) {
    
    scroll_disable();
    
    // Colors
    var notie_color_outer = '#84B2A8';
    var notie_color_yes = '#709A91';
    var notie_color_cancel = '#D1776A';
    var notie_color_text = '#FFFFFF';
    var notie_color_backdrop = 'rgba(255,255,255,0.5)';
    
    var height = 0;
    
    $('<div id="notie-confirm" style="position:fixed;z-index:9999999;left:0px;width:100%;text-align:center;background-color:'+notie_color_outer+';display:none;-webkit-transition: all 0.3s ease;-moz-transition: all 0.3s ease;-o-transition: all 0.3s ease;-ms-transition: all 0.3s ease;transition: all 0.3s ease;"><div style="width:100%;"><h2 style="padding:10px;color:'+notie_color_text+';">'+title+'</h2></div><div id="notie-confirm-cancel" style="display:table;height:60px;width:50%;background-color:'+notie_color_cancel+';float:left;cursor:pointer;"><div style="display:table-cell;vertical-align:middle;"><h2 style="color:'+notie_color_text+'">'+cancel_text+'</h2></div></div><div id="notie-confirm-yes" style="display:table;height:60px;width:50%;background-color:'+notie_color_yes+';float:right;cursor:pointer;"><div style="display:table-cell;vertical-align:middle;"><h2 style="color:'+notie_color_text+'">'+yes_text+'</h2></div></div></div>').appendTo('body');
    
    if (first == true) {
        $('<div id="notie-confirm-backdrop" style="position:fixed;z-index:9999998;top:0px;left:0px;height:100%;width:100%;background-color:'+notie_color_backdrop+';display:none;"></div>').appendTo('body');
    }
    
    height = $('#notie-confirm').outerHeight();
    $('#notie-confirm').css('top', -height + 'px');
    $('#notie-confirm').css('display', 'table');
    
    setTimeout(function() {
        
        $('#notie-confirm').css('top', '0px');
        $('#notie-confirm-backdrop').fadeIn(300);
        
        setTimeout(function() {
            
            $('#notie-confirm-yes').on('click', function() {
                
                notie_confirm_hide(height, last);
                
                setTimeout(function() {
                    yes_callback();
                }, 320);
            });
            $('#notie-confirm-cancel').on('click', function() {
                notie_confirm_hide(height, true);
            });

            $('#notie-confirm-backdrop').on('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();

                notie_confirm_hide(height, true);
            });

        }, 300);
        
    }, 50);
    
}
function notie_confirm_hide(height, last) {
    
    $('#notie-confirm').css('top', -height + 'px');
    
    if (last == true) {
        $('#notie-confirm-backdrop').fadeOut(300);
    }
    
    setTimeout(function() {     
        
        $('#notie-confirm').remove();
        scroll_enable();
        
        if (last == true) {
            $('#notie-confirm-backdrop').remove();
        }
        
        
    }, 300);
    
}
*/


// Scroll Disable and Enable
function scroll_disable() {
    document.body.style.height = '100%;';
    document.body.style.overflow = 'hidden';
    document.body.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
}
function scroll_enable() {
    document.body.style.height = '';
    document.body.style.overflow = '';
    document.body.removeEventListener('touchmove', function(e) { e.preventDefault(); }, false);
}