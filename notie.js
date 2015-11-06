// SETTINGS
var color_text = 'white';
var color_success = 'green';
var color_warning = 'yellow';
var color_error = 'red';
var color_confirm_text = 'white';
var color_confirm_background = 'blue';
var color_confirm_yes = 'green';
var color_confirm_no = 'red';

// Create notie elements
var notie_outer = document.createElement('div');
notie_outer.style.position = 'fixed';
notie_outer.style.top = '0';
notie_outer.style.left = '0';
notie_outer.style.zIndex = '999999999';
notie_outer.style.height = '100px';
notie_outer.style.width = '100%';
notie_outer.style.display = 'table';
notie_outer.style.textAlign = 'center';
var notie_inner = document.createElement('div');
notie_inner.style.padding = '20px';
notie_inner.style.display = 'table-cell';
notie_inner.style.verticalAlign = 'middle';

notie_outer.appendChild(notie_inner);

// Initialize notie text
var notie_text = document.createElement('span');
notie_text.style.color = color_text;
if (window.innerWidth <= 600) { notie_text.style.fontSize = '18px'; }
else { notie_text.style.fontSize = '24px'; }
window.addEventListener('resize', function(){
    if (window.innerWidth <= 600) { notie_text.style.fontSize = '18px'; }
    else { notie_text.style.fontSize = '24px'; }
}, true);
notie_inner.appendChild(notie_text);

// Attach notie to the body element
document.body.appendChild(notie_outer);

function notie(type, message, seconds) {
    
    // Set notie type (background color)
    switch(type) {
        case 1:
            notie_outer.style.backgroundColor = color_success;
            break;
        case 2:
            notie_outer.style.backgroundColor = color_warning;
            break;
        case 3:
            notie_outer.style.backgroundColor = color_error;
            break;
    }
    
    // Set notie text
    notie_text.innerHTML = message;
    
    // Show notie
    notie_outer.style.display = 'table';
    
}




/*
var notie_timeout;
var height = '125px';
var height_negative = '-125px';
function notie(type, message, seconds) {
    
    if (seconds > 0) {
        var showTime = seconds * 1000;
    }
    else {
        var showTime = 2500;
    }
    
    // Colors
    var color = '';
    if (type == 1) {
        color = '#709A91';
    }
    else if (type == 2) {
        color = '#D1AA6A';
    }
    else if (type == 3) {
        color = '#CC685A';
    }
    
    if ($('#notie').length) {
        
        notie_hide();
        
        setTimeout(function() {
            clearTimeout(notie_timeout);
            notie_show(type, message, seconds, showTime, color);
        }, 300);
    }
    else {
        notie_show(type, message, seconds, showTime, color);
    }
}
function notie_show(type, message, seconds, showTime, color) {
    
    $('<div id="notie" style="position:fixed;z-index:9999999;top:'+height_negative+';left:0px;height:'+height+';width:100%;text-align:center;background-color:'+color+';display:table;-webkit-transition: all 0.3s ease;-moz-transition: all 0.3s ease;-o-transition: all 0.3s ease;-ms-transition: all 0.3s ease;transition: all 0.3s ease;"><div style="display:table-cell;vertical-align:middle;"><h2 style="color:#ffffff;padding-left:10%;padding-right:10%;">'+message+'</h2></div></div>').appendTo('body');

    setTimeout(function() {
        $('#notie').css('top', '0px');
    }, 50);
    
    notie_timeout = setTimeout(function() {
        
        notie_hide();
        
    }, showTime);
}
function notie_hide() {
    
    $('#notie').css('top', height_negative);
    
    setTimeout(function() {     
        $('#notie').remove();
    }, 300);
}
function notie_confirm(title, yes_text, cancel_text, yes_callback, first, last) {
    
    scroll_disable();
    
    // Colors
    var color_outer = '#84B2A8';
    var color_yes = '#709A91';
    var color_cancel = '#D1776A';
    var color_text = '#FFFFFF';
    var color_backdrop = 'rgba(255,255,255,0.5)';
    
    var height = 0;
    
    $('<div id="notie-confirm" style="position:fixed;z-index:9999999;left:0px;width:100%;text-align:center;background-color:'+color_outer+';display:none;-webkit-transition: all 0.3s ease;-moz-transition: all 0.3s ease;-o-transition: all 0.3s ease;-ms-transition: all 0.3s ease;transition: all 0.3s ease;"><div style="width:100%;"><h2 style="padding:10px;color:'+color_text+';">'+title+'</h2></div><div id="notie-confirm-cancel" style="display:table;height:60px;width:50%;background-color:'+color_cancel+';float:left;cursor:pointer;"><div style="display:table-cell;vertical-align:middle;"><h2 style="color:'+color_text+'">'+cancel_text+'</h2></div></div><div id="notie-confirm-yes" style="display:table;height:60px;width:50%;background-color:'+color_yes+';float:right;cursor:pointer;"><div style="display:table-cell;vertical-align:middle;"><h2 style="color:'+color_text+'">'+yes_text+'</h2></div></div></div>').appendTo('body');
    
    if (first == true) {
        $('<div id="notie-confirm-backdrop" style="position:fixed;z-index:9999998;top:0px;left:0px;height:100%;width:100%;background-color:'+color_backdrop+';display:none;"></div>').appendTo('body');
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