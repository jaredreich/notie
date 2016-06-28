/*

notie - a clean and simple notification suite for javascript, with no dependencies

Copyright (c) 2016 Jared Reich

Licensed under the MIT license:
http://www.opensource.org/licenses/mit-license.php

Project demo:
https://jaredreich.com/projects/notie

Version:  3.2.0

*/

/**
 * Diablohu modified
 * https://github.com/Diablohu/
 * 
 * New options:
 *      offsetTop
 *          offset top position for notification frame, default to 0 as before
 *      autohideDelay
 *          timeout for auto-hiding, default to 0 as always shown
 * 
 * New feature
 *      Now use CSS Transform to manupilate frame animation when posible, if not, use Top instead
 * 
 * Other tweaks
 *      All elements nodes will not be created nor appended into document until reference function called
 */

var notie = function() {
	
	// Default options
	var options = {
		colorSuccess: '',
		colorWarning: '',
		colorError: '',
		colorInfo: '',
		colorNeutral: '',
		colorText: '',
		animationDelay: 300,
		backgroundClickDismiss: true,

        // offset top position for notification frame, default to 0 as before
        offsetTop: 0,

        // timeout for auto-hiding, default to 0 as always shown
        autohideDelay: 0
	}	
	function setOptions(customOptions) {
		// Custom options
		for (var key in customOptions) {
			options[key] = customOptions[key];
		}
	}

    function cssPositionY( el, y ){
        var key = [
            'transform',
            'webkitTransform',
            'mozTransform',
            'msTransform',
            'oTransform'
        ]

        for( var i = 0; i < key.length; i++ ){
            //console.log( key[i], value )
            if( typeof el.style[key[i]] != 'undefined' )
                return el.style[key[i]] = 'translateY(' + y + 'px)'
        }

        // if CSS transform not supported, use top insted
        return el.style.top = y + 'px'
    }
	
	
	// alert
    // **************
	var alertOuter
	var alertInner
	var alertContent
    var alertText
	// alert helper variables
    var alertIsShowing = false;
    var alertTimeout1;
    var alertTimeout2;
    var wasClickedCounter = 0;
	
	function alert(type, message, seconds) {

        alertInit();
		
		if (options.colorText.length > 0) alertText.style.color = options.colorText;
		
		blur();

        wasClickedCounter++;

        setTimeout(function() {
            wasClickedCounter--;
        }, (options.animationDelay + 10));

        if (wasClickedCounter === 1) {

            if (alertIsShowing) {

                clearTimeout(alertTimeout1);
                clearTimeout(alertTimeout2);

                alertHide(function() {
                    alertShow(type, message, seconds);
                });

            }
            else {
                alertShow(type, message, seconds);
            }

        }

    }

    function alertInit(){
        if( !alertOuter ){	
            // create alert container
            alertOuter = document.createElement('div');
            alertOuter.id = 'notie-alert-outer';
            
            // Hide alert on click
            alertOuter.onclick = function() {
                clearTimeout(alertTimeout1);
                clearTimeout(alertTimeout2);
                alertHide();
            };
            
            // add alert to body
            document.body.appendChild(alertOuter);
            
            // create alert inner container
            alertInner = document.createElement('div');
            alertInner.id = 'notie-alert-inner';
            alertOuter.appendChild(alertInner);
            
            // create alert content container
            alertContent = document.createElement('div');
            alertContent.id = 'notie-alert-content';
            alertInner.appendChild(alertContent);
            
            // Initialize alert text
            alertText = document.createElement('span');
            alertText.id = 'notie-alert-text';
            alertContent.appendChild(alertText);
        }
    }

    function alertShow(type, message, seconds) {

        alertInit();

        alertIsShowing = true;

        var duration = 0;
        if (typeof seconds === 'undefined' || seconds === 0) {
            var duration = options.autohideDelay || 86400000;
        }
        else if (seconds > 0 && seconds < 1) {
            duration = 1000;
        }
        else {
            duration = seconds * 1000;
        }
		
		// Remove all color classes first
		removeClass(alertOuter, 'notie-background-success');
		removeClass(alertOuter, 'notie-background-warning');
		removeClass(alertOuter, 'notie-background-error');
		removeClass(alertOuter, 'notie-background-info');
		
        // Set notie type (background color)
        switch(type) {
            case 1:
				if (options.colorSuccess.length > 0) alertOuter.style.backgroundColor = options.colorSuccess;
				else addClass(alertOuter, 'notie-background-success');
                break;
            case 2:
                if (options.colorWarning.length > 0) alertOuter.style.backgroundColor = options.colorWarning;
				else addClass(alertOuter, 'notie-background-warning');
                break;
            case 3:
				if (options.colorError.length > 0) alertOuter.style.backgroundColor = options.colorError;
				else addClass(alertOuter, 'notie-background-error');
                break;
            case 4:
                if (options.colorInfo.length > 0) alertOuter.style.backgroundColor = options.colorInfo;
				else addClass(alertOuter, 'notie-background-info');
                break;
        }

        // Set notie text
        alertText.innerHTML = message;

        cssPositionY( alertOuter, -10000 );
        alertOuter.style.display = 'table';
        cssPositionY( alertOuter, 0 - alertOuter.offsetHeight - 5 );

        alertTimeout1 = setTimeout(function() {
			
			addClass(alertOuter, 'notie-transition');

            cssPositionY( alertOuter, options.offsetTop );

            alertTimeout2 = setTimeout(function() {

                alertHide(function() {
                    // Nothing
                });

            }, duration);

        }, 20);
		
    }

    function alertHide(callback) {

        alertInit();

        cssPositionY( alertOuter, 0 - alertOuter.offsetHeight - 5 );

        setTimeout(function() {
			
			removeClass(alertOuter, 'notie-transition');
            
            cssPositionY( alertOuter, -10000 );

            alertIsShowing = false;

            if (callback) { callback(); }

        }, (options.animationDelay + 10));

    }
	
	
	
	// confirm
    // **************	
	var confirmOuter
	var confirmInner
	var confirmText
	var confirmYes
    var confirmNo
	var confirmTextYes
    var confirmTextNo
	var confirmBackground
	// confirm helper variables
    var confirmIsShowing = false;

    function confirm(title, yesText, noText, yesCallback, noCallback) {

        confirmInit();
		
		if (options.colorInfo.length > 0) confirmInner.style.backgroundColor = options.colorInfo;
		if (options.colorSuccess.length > 0) confirmYes.style.backgroundColor = options.colorSuccess;
		if (options.colorError.length > 0) confirmNo.style.backgroundColor = options.colorError;
		if (options.colorText.length > 0) {
			confirmText.style.color = options.colorText;
			confirmTextYes.style.color = options.colorText;
			confirmTextNo.style.color = options.colorText;
		}
		
		blur();
        
        if (alertIsShowing) {
            // Hide notie.alert
            clearTimeout(alertTimeout1);
            clearTimeout(alertTimeout2);
            alertHide(function() {
                confirmShow(title, yesText, noText, yesCallback, noCallback);
            });
        }
        else {
            confirmShow(title, yesText, noText, yesCallback, noCallback);
        }
        

    }

    function confirmInit(){
        
        if( !confirmOuter ){
            confirmOuter = document.createElement('div');
            confirmOuter.id = 'notie-confirm-outer';
            
            confirmInner = document.createElement('div');
            confirmInner.id = 'notie-confirm-inner';
            confirmOuter.appendChild(confirmInner);
            
            confirmText = document.createElement('span');
            confirmText.id = 'notie-confirm-text';
            confirmInner.appendChild(confirmText);
            
            confirmYes = document.createElement('div');
            confirmYes.id = 'notie-confirm-yes'
            confirmOuter.appendChild(confirmYes);

            confirmNo = document.createElement('div');
            confirmNo.id = 'notie-confirm-no';
            confirmOuter.appendChild(confirmNo);
            
            confirmTextYes = document.createElement('span');
            confirmTextYes.id = 'notie-confirm-text-yes';
            confirmYes.appendChild(confirmTextYes);

            confirmTextNo = document.createElement('span');
            confirmTextNo.id = 'notie-confirm-text-no';
            confirmNo.appendChild(confirmTextNo);
            
            confirmBackground = document.createElement('div');
            confirmBackground.id = 'notie-confirm-background';
            addClass(confirmBackground, 'notie-transition');
            
            // Hide notie.confirm on no click and background click
            confirmBackground.onclick = function() {
                if (options.backgroundClickDismiss) {
                    confirmHide();
                }
            };
            
            // Attach confirm elements to the body element
            document.body.appendChild(confirmOuter);
            document.body.appendChild(confirmBackground);
        }

    }

    function confirmShow(title, yesText, noText, yesCallback, noCallback) {

        confirmInit();

        scrollDisable();

        // Yes callback function
        confirmYes.onclick = function() {
            confirmHide();
			if (yesCallback) {
				setTimeout(function() {
					yesCallback();
				}, (options.animationDelay + 10));
			}
        }
		
		// No callback function
		confirmNo.onclick = function() {
            confirmHide();
            if (noCallback) {
				setTimeout(function() {
					noCallback();
				}, (options.animationDelay + 10));
			}
        }

        function confirmShowInner() {

            // Set confirm text
            confirmText.innerHTML = title;
            confirmTextYes.innerHTML = yesText;
            confirmTextNo.innerHTML = noText;

            // Get confirm's height
            cssPositionY( confirmOuter, -10000 );
            confirmOuter.style.display = 'table';
            cssPositionY( confirmOuter, 0 - confirmOuter.offsetHeight - 5 );
            confirmBackground.style.display = 'block';

            setTimeout(function() {
				
                addClass(confirmOuter, 'notie-transition');

                cssPositionY( confirmOuter, options.offsetTop );
                confirmBackground.style.opacity = '0.75';

                setTimeout(function() {
                    confirmIsShowing = true;
                }, (options.animationDelay + 10));

            }, 20);

        }

        if (confirmIsShowing) {
            confirmHide();
            setTimeout(function() {
                confirmShowInner();
            }, (options.animationDelay + 10));
        }
        else {
            confirmShowInner();
        }

    }

    function confirmHide() {

        confirmInit();

        cssPositionY( confirmOuter, 0 - confirmOuter.offsetHeight - 5 );
        confirmBackground.style.opacity = '0';

        setTimeout(function() {
			
            removeClass(confirmOuter, 'notie-transition');
            cssPositionY( confirmOuter, -10000 );
            confirmBackground.style.display = 'none';

            scrollEnable();

            confirmIsShowing = false;

        }, (options.animationDelay + 10));

    }
	
	
	
	
	// input
    // **********
    var inputOuter
	var inputBackground
	var inputInner
    var inputField
    var inputYes
    var inputNo
    var inputText
    var inputTextYes
    var inputTextNo
	// input helper variables
    var inputIsShowing = false;
	
	function input(settings, title, submitText, cancelText, submitCallback, cancelCallback) {

        inputInit();
		
		if (options.colorInfo.length > 0) inputInner.style.backgroundColor = options.colorInfo;
		if (options.colorSuccess.length > 0) inputYes.style.backgroundColor = options.colorSuccess;
		if (options.colorError.length > 0) inputNo.style.backgroundColor = options.colorError;
		if (options.colorText.length > 0) {
			inputText.style.color = options.colorText;
			inputTextYes.style.color = options.colorText;
			inputTextNo.style.color = options.colorText;
		}
		
		blur();
		
		if (typeof settings.type !== 'undefined' && settings.type) {
			inputField.setAttribute('type', settings.type);
		}
		else {
			inputField.setAttribute('type', 'text');
		}
		
		if (typeof settings.placeholder !== 'undefined' && settings.placeholder) {
			inputField.setAttribute('placeholder', settings.placeholder);
		}
		else {
			// Do not set placeholder
		}
		
        if (typeof settings.prefilledValue !== 'undefined' && settings.prefilledValue) {
			inputField.value = settings.prefilledValue;
		}
		else {
			inputField.value = '';
		}
        
        if (alertIsShowing) {
			
            // Hide alert
            clearTimeout(alertTimeout1);
            clearTimeout(alertTimeout2);
            alertHide(function() {
                inputShow(title, submitText, cancelText, submitCallback, cancelCallback);
            });
			
        }
        else {
            inputShow(title, submitText, cancelText, submitCallback, cancelCallback);
        }

    }

    function inputInit(){

        if( !inputOuter ){
            inputOuter = document.createElement('div');
            inputOuter.id = 'notie-input-outer';
            
            inputBackground = document.createElement('div');
            inputBackground.id = 'notie-input-background';
            addClass(inputBackground, 'notie-transition');
            
            inputInner = document.createElement('div');
            inputInner.id = 'notie-input-inner';
            inputOuter.appendChild(inputInner);
            
            inputField = document.createElement('input');
            inputField.id = 'notie-input-field';
            inputField.setAttribute('autocomplete', 'off');
            inputField.setAttribute('autocorrect', 'off');
            inputField.setAttribute('autocapitalize', 'off');
            inputField.setAttribute('spellcheck', 'false');
            inputOuter.appendChild(inputField);
            
            inputYes = document.createElement('div');
            inputYes.id = 'notie-input-yes';
            inputOuter.appendChild(inputYes);

            inputNo = document.createElement('div');
            inputNo.id = 'notie-input-no';
            inputOuter.appendChild(inputNo);
            
            inputText = document.createElement('span');
            inputText.id = 'notie-input-text';
            inputInner.appendChild(inputText);

            inputTextYes = document.createElement('span');
            inputTextYes.id = 'notie-input-text-yes';
            inputYes.appendChild(inputTextYes);

            inputTextNo = document.createElement('span');
            inputTextNo.id = 'notie-input-text-no';
            inputNo.appendChild(inputTextNo);

            // Attach input elements to the body element
            document.body.appendChild(inputOuter);
            document.body.appendChild(inputBackground);	
            
            // Hide input on no click and background click
            inputBackground.onclick = function() {
                if (options.backgroundClickDismiss) {
                    inputHide();
                }
            };
        }

    }

    function inputShow(title, submitText, cancelText, submitCallback, cancelCallback) {

        inputInit();

        scrollDisable();

        // Yes callback function
        inputYes.onclick = function() {
            inputHide();
			if (submitCallback) {
				setTimeout(function() {
					submitCallback(inputField.value);
				}, (options.animationDelay + 10));
			}
        }
		
		// No callback function
		inputNo.onclick = function() {
            inputHide();
            if (cancelCallback) {
				setTimeout(function() {
					cancelCallback(inputField.value);
				}, (options.animationDelay + 10));
			}
        }

        function inputShowInner() {

            // Set input text
            inputText.innerHTML = title;
            inputTextYes.innerHTML = submitText;
            inputTextNo.innerHTML = cancelText;

            // Get input's height
            cssPositionY( inputOuter, -10000 );
            inputOuter.style.display = 'table';
            cssPositionY( inputOuter, 0 - inputOuter.offsetHeight - 5 );
            inputBackground.style.display = 'block';

            setTimeout(function() {

				addClass(inputOuter, 'notie-transition');
				
                cssPositionY( inputOuter, options.offsetTop );
                inputBackground.style.opacity = '0.75';

                setTimeout(function() {
                    inputIsShowing = true;
					
					// put focus on input field
					inputField.focus();
					
                }, (options.animationDelay + 10));

            }, 20);

        }

        if (inputIsShowing) {
            inputHide();
            setTimeout(function() {
                inputShowInner();
            }, (options.animationDelay + 10));
        }
        else {
            inputShowInner();
        }

    }

    function inputHide() {

        inputInit();

        cssPositionY( inputOuter, 0 - inputOuter.offsetHeight - 5 );
        inputBackground.style.opacity = '0';

        setTimeout(function() {
			
			removeClass(inputOuter, 'notie-transition');
            inputBackground.style.display = 'none';
            
            cssPositionY( inputOuter, -10000 );

            scrollEnable();

            inputIsShowing = false;

        }, (options.animationDelay + 10));

    }
	
	
	
	// select
    // **************	
	var selectOuter
	var selectInner
	var selectText
	var selectBackground
	var selectChoices
	var selectCancel	
	// select helper variables
    var selectIsShowing = false;
	
	function select(title, choices /*, callback1, callback2, ... */) {

        selectInit();
		
		if (options.colorInfo.length > 0) selectInner.style.backgroundColor = options.colorInfo;
		if (options.colorNeutral.length > 0) selectCancel.style.backgroundColor = options.colorNeutral;
		if (options.colorText.length > 0) {
			selectText.style.color = options.colorText;
			selectCancel.style.color = options.colorText;
		}
		var funcs = [];
		for (var i = 0; i < arguments.length - 2; i++) {
			funcs[i] = arguments[i + 2];
		}
		
		if (funcs.length === choices.length) {
			
			blur();
        
			if (alertIsShowing) {
				// Hide notie.alert
				clearTimeout(alertTimeout1);
				clearTimeout(alertTimeout2);
				alertHide(function() {
					selectShow(title, choices, funcs);
				});
			}
			else {
				selectShow(title, choices, funcs);
			}
			
		}
		else {
			throw 'notie.select number of choices must match number of functions';
		}

    }

    function selectInit(){

        if( !selectOuter ){
            selectOuter = document.createElement('div');
            selectOuter.id = 'notie-select-outer';
            
            selectInner = document.createElement('div');
            selectInner.id = 'notie-select-inner';
            selectOuter.appendChild(selectInner);
            
            selectText = document.createElement('span');
            selectText.id = 'notie-select-text';
            selectInner.appendChild(selectText);
            
            selectBackground = document.createElement('div');
            selectBackground.id = 'notie-select-background';
            addClass(selectBackground, 'notie-transition');
            
            selectChoices = document.createElement('div');
            selectChoices.id = 'notie-select-choices';
            selectOuter.appendChild(selectChoices);
            
            selectCancel = document.createElement('div');
            selectCancel.id = 'notie-select-cancel';
            selectCancel.innerHTML = 'Cancel';
            selectOuter.appendChild(selectCancel);
            
            // Attach select elements to the body element
            document.body.appendChild(selectOuter);
            document.body.appendChild(selectBackground);
            
            // Hide input on no click and background click
            selectBackground.onclick = function() {
                if (options.backgroundClickDismiss) {
                    selectHide();
                }
            };
            
            selectCancel.onclick = function() {
                selectHide();
            }
        }

    }
	
	function selectShow(title, choices, funcs) {

        selectInit();
		
		scrollDisable();
		
		document.getElementById('notie-select-choices').innerHTML = '';
		
		var selectChoicePrevious;
		
		for (var i = 0; i < choices.length; i++) {
			
			var selectChoice = document.createElement('div');
			selectChoice.innerHTML = choices[i].title;
			addClass(selectChoice, 'notie-select-choice');
			selectChoices.appendChild(selectChoice);
			selectChoice.style.backgroundColor = window.getComputedStyle(selectChoice).backgroundColor;
			if (options.colorText.length > 0) selectChoice.style.color = options.colorText;
			
			if (choices[i].type) {
				switch(choices[i].type) {
					case 1:
						if (options.colorSuccess.length > 0) selectChoice.style.backgroundColor = options.colorSuccess;
						else addClass(selectChoice, 'notie-background-success');
						break;
					case 2:
						if (options.colorWarning.length > 0) selectChoice.style.backgroundColor = options.colorWarning;
						else addClass(selectChoice, 'notie-background-warning');
						break;
					case 3:
						if (options.colorError.length > 0) selectChoice.style.backgroundColor = options.colorError;
						else addClass(selectChoice, 'notie-background-error');
						break;
					case 4:
						if (options.colorInfo.length > 0) selectChoice.style.backgroundColor = options.colorInfo;
						else addClass(selectChoice, 'notie-background-info');
						break;
				}
			}
			else if (choices[i].color) {
				selectChoice.style.backgroundColor = choices[i].color;
			}
			
			if (i > 0) {
				if (selectChoice.style.backgroundColor === selectChoicePrevious.style.backgroundColor) {
					selectChoicePrevious.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
				}
			}
			
			// onclick for this choice
			selectChoice.onclick = (function(i) { return function() {
				selectHide();
				setTimeout(function() {
					funcs[i]();
				}, (options.animationDelay + 10));
			};})(i);
			
			selectChoicePrevious = selectChoice;
			
		}

        function selectShowInner(title) {

            // Set select text
            selectText.innerHTML = title;

            // Get select's height
            selectOuter.style.bottom = '-10000px';
            selectOuter.style.display = 'table';
            selectOuter.style.bottom = '-' + selectOuter.offsetHeight - 5 + 'px';
            selectBackground.style.display = 'block';

            setTimeout(function() {
				
                addClass(selectOuter, 'notie-transition');

                selectOuter.style.bottom = 0;
                selectBackground.style.opacity = '0.75';

                setTimeout(function() {
                    selectIsShowing = true;
                }, (options.animationDelay + 10));

            }, 20);

        }

        if (selectIsShowing) {
            selectHide();
            setTimeout(function() {
                selectShowInner(title);
            }, (options.animationDelay + 10));
        }
        else {
            selectShowInner(title);
        }
		
	}
	
	function selectHide() {

        selectInit();
		
		selectOuter.style.bottom = '-' + selectOuter.offsetHeight - 5 + 'px';
        selectBackground.style.opacity = '0';

        setTimeout(function() {
			
            removeClass(selectOuter, 'notie-transition');
			selectOuter.style.bottom = '-10000px';
            selectBackground.style.display = 'none';

            scrollEnable();

            selectIsShowing = false;

        }, (options.animationDelay + 10));
		
	}
	
	
	// Internal helper functions
	// #################
	
	function addClass(element, className) {
		if (element.classList) {
			element.classList.add(className);
		}
		else {
			element.className += ' ' + className;
		}
	}
	function removeClass(element, className) {
		if (element.classList) {
			element.classList.remove(className);
		}
		else {
			element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}
	
	function blur() {
		document.activeElement.blur();
	}
	
	var originalBodyHeight, originalBodyOverflow;
    function scrollDisable() {
        originalBodyHeight = document.body.style.height;
        originalBodyOverflow = document.body.style.overflow;
        document.body.style.height = '100%';
        document.body.style.overflow = 'hidden';
    }
    function scrollEnable() {
        document.body.style.height = originalBodyHeight;
        document.body.style.overflow = originalBodyOverflow;
    }
	
	// Event listener for keydown enter and escape keys
    window.addEventListener('keydown', function(event) {
        var enterClicked = (event.which == 13 || event.keyCode == 13);
        var escapeClicked = (event.which == 27 || event.keyCode == 27);
        if (alertIsShowing) {
            if (enterClicked || escapeClicked) {
                clearTimeout(alertTimeout1);
                clearTimeout(alertTimeout2);
                alertHide();
            }
        }
        else if (confirmIsShowing) {
            if (enterClicked) {
                confirmYes.click();
            }
            else if (escapeClicked) {
                confirmHide();
            }
        }
        else if (inputIsShowing) {
            if (enterClicked) {
                inputYes.click();
            }
            else if (escapeClicked) {
                inputHide();
            }
        }
		else if (selectIsShowing) {
			if (escapeClicked) {
                selectHide();
            }
		}
    });
	
	
	
	
    return {
		setOptions: setOptions,
        alert: alert,
        confirm: confirm,
        input: input,
		select: select
    };

}();

// Node.js
if (typeof module === 'object' && module.exports) {
    module.exports = notie;
}