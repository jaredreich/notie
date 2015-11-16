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
 * Version:  2.0.1
 *
*/

var notie = function(){

    // SETTINGS
    // *********************************************
    
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
    
    // *********************************************
    
    
    
    // NOTIE.ALERT
    // *********************************************

    // notie elements and styling
    var alertOuter = document.createElement('div');
    alertOuter.id = alertOuterID;
    alertOuter.style.position = 'fixed';
    alertOuter.style.top = '0';
    alertOuter.style.left = '0';
    alertOuter.style.zIndex = '999999999';
    alertOuter.style.height = 'auto';
    alertOuter.style.width = '100%';
    alertOuter.style.display = 'none';
    alertOuter.style.textAlign = 'center';
    alertOuter.style.cursor = 'default';
    alertOuter.style.MozTransition = '';
    alertOuter.style.WebkitTransition = '';
    alertOuter.style.transition = '';
    alertOuter.style.cursor = 'pointer';
    alertOuter.addEventListener('click', function() {
        clearTimeout(alertTimeout1);
        clearTimeout(alertTimeout2);
        alertHide();
    });
    var alertInner = document.createElement('div');
    alertInner.id = alertInnerID;
    alertInner.style.padding = '20px';
    alertInner.style.display = 'table-cell';
    alertInner.style.verticalAlign = 'middle';
    alertOuter.appendChild(alertInner);

    // Initialize notie text
    var alertText = document.createElement('span');
    alertText.id = alertTextID;
    alertText.style.color = alertColorText;
    if (window.innerWidth <= fontChangeScreenWidth) { alertText.style.fontSize = fontSizeSmall; }
    else { alertText.style.fontSize = fontSizeBig; }
    window.addEventListener('resize', function(){
        if (window.innerWidth <= fontChangeScreenWidth) { alertText.style.fontSize = fontSizeSmall; }
        else { alertText.style.fontSize = fontSizeBig; }
    }, true);
    alertInner.appendChild(alertText);

    // Attach notie to the body element
    document.body.appendChild(alertOuter);

    // Declare variables
    var height = 0;
    var alertIsShowing = false;
    var alertTimeout1;
    var alertTimeout2;
    var wasClickedCounter = 0;

    function alert(type, message, seconds) {

        wasClickedCounter++;

        setTimeout(function() {
            wasClickedCounter--;
        }, (animationDelay * 1000 + 10));

        if (wasClickedCounter == 1) {

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

    function alertShow(type, message, seconds) {

        alertIsShowing = true;

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
                alertOuter.style.backgroundColor = alertColorSuccessBackground;
                break;
            case 2:
                alertOuter.style.backgroundColor = alertColorWarningBackground;
                break;
            case 3:
                alertOuter.style.backgroundColor = alertColorErrorBackground;
                break;
            case 4:
                alertOuter.style.backgroundColor = alertColorInfoBackground;
                break;
        }

        // Set notie text
        alertText.innerHTML = message;

        // Get notie's height
        alertOuter.style.top = '-10000px';
        alertOuter.style.display = 'table';
        alertOuter.style.top = '-' + alertOuter.offsetHeight - 5 + 'px';

        alertTimeout1 = setTimeout(function() {

            if (shadow) { alertOuter.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)'; }
            alertOuter.style.MozTransition = 'all ' + animationDelay + 's ease';
            alertOuter.style.WebkitTransition = 'all ' + animationDelay + 's ease';
            alertOuter.style.transition = 'all ' + animationDelay + 's ease';

            alertOuter.style.top = 0;

            alertTimeout2 = setTimeout(function() {

                alertHide(function() {
                    // Nothing
                });

            }, duration);

        }, 20);

    }

    function alertHide(callback) {

        alertOuter.style.top = '-' + alertOuter.offsetHeight - 5 + 'px';

        setTimeout(function() {

            if (shadow) { alertOuter.style.boxShadow = ''; }
            alertOuter.style.MozTransition = '';
            alertOuter.style.WebkitTransition = '';
            alertOuter.style.transition = '';
            
            alertOuter.style.top = '-10000px';

            alertIsShowing = false;

            if (callback) { callback(); }

        }, (animationDelay * 1000 + 10));

    }



    // NOTIE.CONFIRM
    // *********************************************

    // confirm elements and styling
    var confirmOuter = document.createElement('div');
    confirmOuter.id = confirmOuterID;
    confirmOuter.style.position = 'fixed';
    confirmOuter.style.top = '0';
    confirmOuter.style.left = '0';
    confirmOuter.style.zIndex = '999999998';
    confirmOuter.style.height = 'auto';
    confirmOuter.style.width = '100%';
    confirmOuter.style.display = 'none';
    confirmOuter.style.textAlign = 'center';
    confirmOuter.style.MozTransition = '';
    confirmOuter.style.WebkitTransition = '';
    confirmOuter.style.transition = '';

    var confirmBackdrop = document.createElement('div');
    confirmBackdrop.id = confirmBackdropID;
    confirmBackdrop.style.position = 'fixed';
    confirmBackdrop.style.top = '0';
    confirmBackdrop.style.left = '0';
    confirmBackdrop.style.zIndex = '999999997';
    confirmBackdrop.style.height = '100%';
    confirmBackdrop.style.width = '100%';
    confirmBackdrop.style.display = 'none';
    confirmBackdrop.style.backgroundColor = 'white';
    confirmBackdrop.style.MozTransition = 'all ' + animationDelay + 's ease';
    confirmBackdrop.style.WebkitTransition = 'all ' + animationDelay + 's ease';
    confirmBackdrop.style.transition = 'all ' + animationDelay + 's ease';
    confirmBackdrop.style.opacity = '0';
    confirmBackdrop.onclick = function() { confirmHide(); }

    var confirmInner = document.createElement('div');
    confirmInner.id = confirmInnerID;
    confirmInner.style.boxSizing = 'border-box';
    confirmInner.style.width = '100%';
    confirmInner.style.padding = '20px';
    confirmInner.style.display = 'block';
    confirmInner.style.cursor = 'default';
    confirmInner.style.backgroundColor = confirmAndInputColorBackground;
    confirmOuter.appendChild(confirmInner);

    var confirmYes = document.createElement('div');
    confirmYes.id = confirmYesID;
    confirmYes.style.cssFloat = 'left';
    confirmYes.style.height = '50px';
    confirmYes.style.lineHeight = '50px';
    confirmYes.style.width = '50%';
    confirmYes.style.cursor = 'pointer';
    confirmYes.style.backgroundColor = confirmAndInputColorYesBackground;
    confirmOuter.appendChild(confirmYes);

    var confirmNo = document.createElement('div');
    confirmNo.id = confirmNoID;
    confirmNo.style.cssFloat = 'right';
    confirmNo.style.height = '50px';
    confirmNo.style.lineHeight = '50px';
    confirmNo.style.width = '50%';
    confirmNo.style.cursor = 'pointer';
    confirmNo.style.backgroundColor = confirmAndInputColorNoBackground;
    confirmNo.onclick = function() { confirmHide(); }
    confirmOuter.appendChild(confirmNo);

    // Initialize confirm text
    var confirmText = document.createElement('span');
    confirmText.id = confirmTextID;
    confirmText.style.color = confirmAndInputColorText;
    if (window.innerWidth <= fontChangeScreenWidth) { confirmText.style.fontSize = fontSizeSmall; }
    else { confirmText.style.fontSize = fontSizeBig; }
    window.addEventListener('resize', function(){
        if (window.innerWidth <= fontChangeScreenWidth) { confirmText.style.fontSize = fontSizeSmall; }
        else { confirmText.style.fontSize = fontSizeBig; }
    }, true);
    confirmInner.appendChild(confirmText);

    var confirmYesText = document.createElement('span');
    confirmYesText.id = confirmYesTextID;
    confirmYesText.style.color = confirmAndInputColorYesText;
    if (window.innerWidth <= fontChangeScreenWidth) { confirmYesText.style.fontSize = fontSizeSmall; }
    else { confirmYesText.style.fontSize = fontSizeBig; }
    window.addEventListener('resize', function(){
        if (window.innerWidth <= fontChangeScreenWidth) { confirmYesText.style.fontSize = fontSizeSmall; }
        else { confirmYesText.style.fontSize = fontSizeBig; }
    }, true);
    confirmYes.appendChild(confirmYesText);

    var confirmNoText = document.createElement('span');
    confirmNoText.id = confirmNoTextID;
    confirmNoText.style.color = confirmAndInputColorNoText;
    if (window.innerWidth <= fontChangeScreenWidth) { confirmNoText.style.fontSize = fontSizeSmall; }
    else { confirmNoText.style.fontSize = fontSizeBig; }
    window.addEventListener('resize', function(){
        if (window.innerWidth <= fontChangeScreenWidth) { confirmNoText.style.fontSize = fontSizeSmall; }
        else { confirmNoText.style.fontSize = fontSizeBig; }
    }, true);
    confirmNo.appendChild(confirmNoText);

    // Attach confirm elements to the body element
    document.body.appendChild(confirmOuter);
    document.body.appendChild(confirmBackdrop);

    // Declare variables
    var confirmHeight = 0;
    var confirmIsShowing = false;

    function confirm(title, yesText, noText, yesCallback, noCallback) {
        
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
    function confirmShow(title, yesText, noText, yesCallback, noCallback) {

        scrollDisable();

        // Yes callback function
        confirmYes.onclick = function() {
            confirmHide();
            setTimeout(function() {
                yesCallback();
            }, (animationDelay * 1000 + 10));
        }

        // No callback function
        confirmNo.onclick = function() {
            confirmHide();
            setTimeout(function() {
                noCallback();
            }, (animationDelay * 1000 + 10));
        }

        function confirmShowInner() {

            // Set confirm text
            confirmText.innerHTML = title;
            confirmYesText.innerHTML = yesText;
            confirmNoText.innerHTML = noText;

            // Get confirm's height
            confirmOuter.style.top = '-10000px';
            confirmOuter.style.display = 'table';
            confirmOuter.style.top = '-' + confirmOuter.offsetHeight - 5 + 'px';
            confirmBackdrop.style.display = 'block';

            setTimeout(function() {

                if (shadow) { confirmOuter.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)'; }
                confirmOuter.style.MozTransition = 'all ' + animationDelay + 's ease';
                confirmOuter.style.WebkitTransition = 'all ' + animationDelay + 's ease';
                confirmOuter.style.transition = 'all ' + animationDelay + 's ease';

                confirmOuter.style.top = 0;
                confirmBackdrop.style.opacity = '0.75';

                setTimeout(function() {
                    confirmIsShowing = true;
                }, (animationDelay * 1000 + 10));

            }, 20);

        }

        if (confirmIsShowing) {
            confirmHide();
            setTimeout(function() {
                confirmShowInner();
            }, (animationDelay * 1000 + 10));
        }
        else {
            confirmShowInner();
        }

    }

    function confirmHide() {

        confirmOuter.style.top = '-' + confirmOuter.offsetHeight - 5 + 'px';
        confirmBackdrop.style.opacity = '0';

        setTimeout(function() {

            if (shadow) { confirmOuter.style.boxShadow = ''; }
            confirmOuter.style.MozTransition = '';
            confirmOuter.style.WebkitTransition = '';
            confirmOuter.style.transition = '';
            confirmBackdrop.style.display = 'none';
            
            confirmOuter.style.top = '-10000px';

            scrollEnable();

            confirmIsShowing = false;

        }, (animationDelay * 1000 + 10));

    }
    
    
    
    
    // NOTIE.INPUT
    // *********************************************

    // input elements and styling
    var inputOuter = document.createElement('div');
    inputOuter.id = inputOuterID;
    inputOuter.style.position = 'fixed';
    inputOuter.style.top = '0';
    inputOuter.style.left = '0';
    inputOuter.style.zIndex = '999999998';
    inputOuter.style.height = 'auto';
    inputOuter.style.width = '100%';
    inputOuter.style.display = 'none';
    inputOuter.style.textAlign = 'center';
    inputOuter.style.MozTransition = '';
    inputOuter.style.WebkitTransition = '';
    inputOuter.style.transition = '';

    var inputBackdrop = document.createElement('div');
    inputBackdrop.id = inputBackdropID;
    inputBackdrop.style.position = 'fixed';
    inputBackdrop.style.top = '0';
    inputBackdrop.style.left = '0';
    inputBackdrop.style.zIndex = '999999997';
    inputBackdrop.style.height = '100%';
    inputBackdrop.style.width = '100%';
    inputBackdrop.style.display = 'none';
    inputBackdrop.style.backgroundColor = 'white';
    inputBackdrop.style.MozTransition = 'all ' + animationDelay + 's ease';
    inputBackdrop.style.WebkitTransition = 'all ' + animationDelay + 's ease';
    inputBackdrop.style.transition = 'all ' + animationDelay + 's ease';
    inputBackdrop.style.opacity = '0';
    inputBackdrop.onclick = function() { inputHide(); }

    var inputInner = document.createElement('div');
    inputInner.id = inputInnerID;
    inputInner.style.boxSizing = 'border-box';
    inputInner.style.width = '100%';
    inputInner.style.padding = '20px';
    inputInner.style.display = 'block';
    inputInner.style.cursor = 'default';
    inputInner.style.backgroundColor = confirmAndInputColorBackground;
    inputOuter.appendChild(inputInner);
    
    var inputDiv = document.createElement('div');
    inputDiv.id = inputDivID;
    inputDiv.style.boxSizing = 'border-box';
    inputDiv.style.height = '55px';
    inputDiv.style.width = '100%';
    inputDiv.style.display = 'block';
    inputDiv.style.cursor = 'default';
    inputDiv.style.backgroundColor = '#FFF';
    inputOuter.appendChild(inputDiv);
    
    var inputField = document.createElement('input');
    inputField.id = inputFieldID;    
    inputField.setAttribute('autocomplete', 'off');
    inputField.setAttribute('autocorrect', 'off');
    inputField.setAttribute('autocapitalize', 'off');
    inputField.setAttribute('spellcheck', 'false');
    inputField.style.boxSizing = 'border-box';
    inputField.style.height = '55px';
    inputField.style.width = '100%';
    inputField.style.textAlign = 'center';
    inputField.style.textIndent = '10px';
    inputField.style.paddingRight = '10px';
    inputField.style.outline = '0';
    inputField.style.border = '0';
    inputField.style.fontFamily = 'inherit';
    inputField.style.fontSize = fontSizeBig;
    if (window.innerWidth <= fontChangeScreenWidth) { inputField.style.fontSize = fontSizeSmall; }
    else { inputField.style.fontSize = fontSizeBig; }
    window.addEventListener('resize', function(){
        if (window.innerWidth <= fontChangeScreenWidth) { inputField.style.fontSize = fontSizeSmall; }
        else { inputField.style.fontSize = fontSizeBig; }
    }, true);
    inputDiv.appendChild(inputField);

    var inputYes = document.createElement('div');
    inputYes.id = inputYesID;
    inputYes.style.cssFloat = 'left';
    inputYes.style.height = '50px';
    inputYes.style.lineHeight = '50px';
    inputYes.style.width = '50%';
    inputYes.style.cursor = 'pointer';
    inputYes.style.backgroundColor = confirmAndInputColorYesBackground;
    inputOuter.appendChild(inputYes);

    var inputNo = document.createElement('div');
    inputNo.id = inputNoID;
    inputNo.style.cssFloat = 'right';
    inputNo.style.height = '50px';
    inputNo.style.lineHeight = '50px';
    inputNo.style.width = '50%';
    inputNo.style.cursor = 'pointer';
    inputNo.style.backgroundColor = confirmAndInputColorNoBackground;
    inputNo.onclick = function() { inputHide(); }
    inputOuter.appendChild(inputNo);

    // Initialize input text
    var inputText = document.createElement('span');
    inputText.id = inputTextID;
    inputText.style.color = confirmAndInputColorText;
    if (window.innerWidth <= fontChangeScreenWidth) { inputText.style.fontSize = fontSizeSmall; }
    else { inputText.style.fontSize = fontSizeBig; }
    window.addEventListener('resize', function(){
        if (window.innerWidth <= fontChangeScreenWidth) { inputText.style.fontSize = fontSizeSmall; }
        else { inputText.style.fontSize = fontSizeBig; }
    }, true);
    inputInner.appendChild(inputText);

    var inputYesText = document.createElement('span');
    inputYesText.id = inputYesTextID;
    inputYesText.style.color = confirmAndInputColorYesText;
    if (window.innerWidth <= fontChangeScreenWidth) { inputYesText.style.fontSize = fontSizeSmall; }
    else { inputYesText.style.fontSize = fontSizeBig; }
    window.addEventListener('resize', function(){
        if (window.innerWidth <= fontChangeScreenWidth) { inputYesText.style.fontSize = fontSizeSmall; }
        else { inputYesText.style.fontSize = fontSizeBig; }
    }, true);
    inputYes.appendChild(inputYesText);

    var inputNoText = document.createElement('span');
    inputNoText.id = inputNoTextID;
    inputNoText.style.color = confirmAndInputColorNoText;
    if (window.innerWidth <= fontChangeScreenWidth) { inputNoText.style.fontSize = fontSizeSmall; }
    else { inputNoText.style.fontSize = fontSizeBig; }
    window.addEventListener('resize', function(){
        if (window.innerWidth <= fontChangeScreenWidth) { inputNoText.style.fontSize = fontSizeSmall; }
        else { inputNoText.style.fontSize = fontSizeBig; }
    }, true);
    inputNo.appendChild(inputNoText);

    // Attach input elements to the body element
    document.body.appendChild(inputOuter);
    document.body.appendChild(inputBackdrop);

    // Declare variables
    var inputHeight = 0;
    var inputIsShowing = false;

    function input(title, submitText, cancelText, type, placeholder, submitCallback, prefilledValueOptional) {
        
        inputField.setAttribute('type', type);
        inputField.setAttribute('placeholder', placeholder);
        inputField.value = '';
        if (typeof prefilledValueOptional !== 'undefined' && prefilledValueOptional.length > 0) { inputField.value = prefilledValueOptional }
        
        if (alertIsShowing) {
            // Hide notie.alert
            clearTimeout(alertTimeout1);
            clearTimeout(alertTimeout2);
            alertHide(function() {
                inputShow(title, submitText, cancelText, submitCallback);
            });
        }
        else {
            inputShow(title, submitText, cancelText, submitCallback);
        }

    }
    function inputShow(title, submitText, cancelText, submitCallback) {

        scrollDisable();

        // Yes callback function
        inputYes.onclick = function() {
            inputHide();
            setTimeout(function() {
                submitCallback(inputField.value);
            }, (animationDelay * 1000 + 10));
        }

        function inputShowInner() {

            // Set input text
            inputText.innerHTML = title;
            inputYesText.innerHTML = submitText;
            inputNoText.innerHTML = cancelText;

            // Get input's height
            inputOuter.style.top = '-10000px';
            inputOuter.style.display = 'table';
            inputOuter.style.top = '-' + inputOuter.offsetHeight - 5 + 'px';
            inputBackdrop.style.display = 'block';

            setTimeout(function() {

                if (shadow) { inputOuter.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)'; }
                inputOuter.style.MozTransition = 'all ' + animationDelay + 's ease';
                inputOuter.style.WebkitTransition = 'all ' + animationDelay + 's ease';
                inputOuter.style.transition = 'all ' + animationDelay + 's ease';

                inputOuter.style.top = 0;
                inputBackdrop.style.opacity = '0.75';

                setTimeout(function() {
                    inputIsShowing = true;
                }, (animationDelay * 1000 + 10));

            }, 20);

        }

        if (inputIsShowing) {
            inputHide();
            setTimeout(function() {
                inputShowInner();
            }, (animationDelay * 1000 + 10));
        }
        else {
            inputShowInner();
        }

    }

    function inputHide() {

        inputOuter.style.top = '-' + inputOuter.offsetHeight - 5 + 'px';
        inputBackdrop.style.opacity = '0';

        setTimeout(function() {

            if (shadow) { inputOuter.style.boxShadow = ''; }
            inputOuter.style.MozTransition = '';
            inputOuter.style.WebkitTransition = '';
            inputOuter.style.transition = '';
            inputBackdrop.style.display = 'none';
            
            inputOuter.style.top = '-10000px';

            scrollEnable();

            inputIsShowing = false;

        }, (animationDelay * 1000 + 10));

    }
    
    


    // SCROLL DISABLE AND ENABLE FOR NOTIE.CONFIRM and NOTIE.INPUT
    // *********************************************
    var originalBodyHeight, originalBodyOverflow;
    function scrollDisable() {
        originalBodyHeight = document.body.style.height;
        originalBodyOverflow = document.body.style.overflow;
        document.body.style.height = '100%;';
        document.body.style.overflow = 'hidden';
    }
    function scrollEnable() {
        document.body.style.height = originalBodyHeight;
        document.body.style.overflow = originalBodyOverflow;
    }
    
    
    
    
    return {
        alert: alert,
        confirm: confirm,
        input: input
    };

}();

if (typeof module !== 'undefined' && module) {
    module.exports = notie;
}