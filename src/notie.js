// ====================
// options
// ====================

const positions = {
  top: 'top',
  bottom: 'bottom'
}

let options = {
  alertTime: 3,
  dateMonths: ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'],
  overlayClickDismiss: true,
  overlayOpacity: 0.75,
  transitionCurve: 'ease',
  transitionDuration: 0.3,
  transitionSelector: 'all',
  classes: {
    container: 'notie-container',
    textbox: 'notie-textbox',
    textboxInner: 'notie-textbox-inner',
    button: 'notie-button',
    element: 'notie-element',
    elementHalf: 'notie-element-half',
    elementThird: 'notie-element-third',
    overlay: 'notie-overlay',
    backgroundSuccess: 'notie-background-success',
    backgroundWarning: 'notie-background-warning',
    backgroundError: 'notie-background-error',
    backgroundInfo: 'notie-background-info',
    backgroundNeutral: 'notie-background-neutral',
    backgroundOverlay: 'notie-background-overlay',
    alert: 'notie-alert',
    inputField: 'notie-input-field',
    selectChoiceRepeated: 'notie-select-choice-repeated',
    dateSelectorInner: 'notie-date-selector-inner',
    dateSelectorUp: 'notie-date-selector-up'
  },
  ids: {
    overlay: 'notie-overlay'
  },
  positions: {
    alert: positions.top,
    force: positions.top,
    confirm: positions.top,
    input: positions.top,
    select: positions.bottom,
    date: positions.top
  }
}

export const setOptions = newOptions => {
  options = {
    ...options,
    ...newOptions,
    classes: { ...options.classes, ...newOptions.classes },
    ids: { ...options.ids, ...newOptions.ids },
    positions: { ...options.positions, ...newOptions.positions }
  }
}

// ====================
// helpers
// ====================

const tick = () => new Promise(resolve => setTimeout(resolve, 0))
const wait = time => new Promise(resolve => setTimeout(resolve, time * 1000))

const blur = () => {
  document.activeElement && document.activeElement.blur()
}

const generateRandomId = () => {
  // RFC4122 version 4 compliant UUID
  const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
  return `notie-${id}`
}

const typeToClassLookup = {
  1: options.classes.backgroundSuccess,
  success: options.classes.backgroundSuccess,
  2: options.classes.backgroundWarning,
  warning: options.classes.backgroundWarning,
  3: options.classes.backgroundError,
  error: options.classes.backgroundError,
  4: options.classes.backgroundInfo,
  info: options.classes.backgroundInfo,
  5: options.classes.backgroundNeutral,
  neutral: options.classes.backgroundNeutral
}

const getTransition = () => (
  `${options.transitionSelector} ${options.transitionDuration}s ${options.transitionCurve}`
)

const enterClicked = event => event.keyCode === 13
const escapeClicked = event => event.keyCode === 27

const makeElement = (elemType, classes) => {
  const element = document.createElement(elemType)
  if (classes) {
    classes.forEach(c => element.classList.add(c))
  }
  return element
}

const addToDocument = (element, position) => {
  element.classList.add(options.classes.container)
  element.style[position] = '-10000px'
  document.body.appendChild(element)
  element.style[position] = `-${element.offsetHeight}px`

  if (element.listener) window.addEventListener('keydown', element.listener)

  tick().then(() => {
    element.style.transition = getTransition()
    element.style[position] = 0
  })
}

const removeFromDocument = (id, position) => {
  const element = document.getElementById(id)
  if (!element) return
  element.style[position] = `-${element.offsetHeight}px`

  if (element.listener) window.removeEventListener('keydown', element.listener)

  wait(options.transitionDuration).then(() => {
    if (element.parentNode) element.parentNode.removeChild(element)
  })
}

const addOverlayToDocument = (owner, position) => {
  const element = makeElement('div', [
    options.classes.overlay,
    options.classes.backgroundOverlay
  ])
  element.id = options.ids.overlay
  element.style.opacity = 0
  if (owner && options.overlayClickDismiss) {
    element.onclick = () => {
      removeFromDocument(owner.id, position)
      removeOverlayFromDocument()
    }
  }

  document.body.appendChild(element)

  tick().then(() => {
    element.style.transition = getTransition()
    element.style.opacity = options.overlayOpacity
  })
}

const removeOverlayFromDocument = () => {
  const element = document.getElementById(options.ids.overlay)
  element.style.opacity = 0
  wait(options.transitionDuration).then(() => {
    if (element.parentNode) element.parentNode.removeChild(element)
  })
}

export const hideAlerts = callback => {
  const alertsShowing = document.getElementsByClassName(options.classes.alert)
  if (alertsShowing.length) {
    for (let i = 0; i < alertsShowing.length; i++) {
      const alert = alertsShowing[i]
      removeFromDocument(alert.id, alert.position)
    }
    if (callback) wait(options.transitionDuration).then(() => callback())
  }
}

// ====================
// shared elements
// ====================

const div = classes => {
  const element = makeElement('div', classes)
  element.id = generateRandomId()
  return element
}

const button = (innerHTML, classes, onclick) => {
  const element = makeElement('div', classes)
  element.innerHTML = innerHTML
  element.onclick = onclick
  return element
}

const textbox = (text, classes) => {
  const element = div(classes)
  element.innerHTML = `<div class="${options.classes.textboxInner}">${text}</div>`
  return element
}

// ====================
// exports
// ====================

export const alert = ({
  type = 4,
  text,
  time = options.alertTime,
  stay = false,
  position = options.positions.alert || position.top
}) => {
  blur()
  hideAlerts()

  const element = textbox(text, [
    options.classes.textbox,
    typeToClassLookup[type],
    options.classes.alert
  ])
  element.position = position
  element.onclick = () => removeFromDocument(element.id, position)

  element.listener = event => {
    if (enterClicked(event) || escapeClicked(event)) hideAlerts()
  }

  addToDocument(element, position)

  if (time && time < 1) time = 1
  if (!stay && time) wait(time).then(() => removeFromDocument(element.id, position))
}

export const force = ({
  type = 5,
  text,
  buttonText = 'OK',
  callback,
  position = options.positions.force || position.top
}, callbackArg) => {
  blur()
  hideAlerts()

  const element = div()

  const elementText = textbox(text, [
    options.classes.textbox,
    options.classes.backgroundInfo
  ])

  const elementButton = button(buttonText, [
    options.classes.button,
    typeToClassLookup[type]
  ], () => {
    removeFromDocument(element.id, position)
    removeOverlayFromDocument()
    if (callback) callback()
    else if (callbackArg) callbackArg()
  })

  element.appendChild(elementText)
  element.appendChild(elementButton)

  element.listener = event => {
    if (enterClicked(event)) elementButton.click()
  }

  addToDocument(element, position)

  addOverlayToDocument()
}

export const confirm = ({
  text,
  submitText = 'Yes',
  cancelText = 'Cancel',
  submitCallback,
  cancelCallback,
  position = options.positions.confirm || position.top
}, submitCallbackArg, cancelCallbackArg) => {
  blur()
  hideAlerts()

  const element = div()

  const elementText = textbox(text, [
    options.classes.textbox,
    options.classes.backgroundInfo
  ])

  const elementButtonLeft = button(submitText, [
    options.classes.button,
    options.classes.elementHalf,
    options.classes.backgroundSuccess
  ], () => {
    removeFromDocument(element.id, position)
    removeOverlayFromDocument()
    if (submitCallback) submitCallback()
    else if (submitCallbackArg) submitCallbackArg()
  })

  const elementButtonRight = button(cancelText, [
    options.classes.button,
    options.classes.elementHalf,
    options.classes.backgroundError
  ], () => {
    removeFromDocument(element.id, position)
    removeOverlayFromDocument()
    if (cancelCallback) cancelCallback()
    else if (cancelCallbackArg) cancelCallbackArg()
  })

  element.appendChild(elementText)
  element.appendChild(elementButtonLeft)
  element.appendChild(elementButtonRight)

  element.listener = event => {
    if (enterClicked(event)) elementButtonLeft.click()
    else if (escapeClicked(event)) elementButtonRight.click()
  }

  addToDocument(element, position)

  addOverlayToDocument(element, position)
}

export const input = ({
  text,
  submitText = 'Submit',
  cancelText = 'Cancel',
  submitCallback,
  cancelCallback,
  position = options.positions.input || position.top,
  ...settings
}, submitCallbackArg, cancelCallbackArg) => {
  blur()
  hideAlerts()

  const element = div()

  const elementText = textbox(text, [
    options.classes.textbox,
    options.classes.backgroundInfo
  ])

  const elementInput = makeElement('input', [
    options.classes.inputField
  ])

  elementInput.setAttribute('autocapitalize', settings.autocapitalize || 'none')
  elementInput.setAttribute('autocomplete', settings.autocomplete || 'off')
  elementInput.setAttribute('autocorrect', settings.autocorrect || 'off')
  elementInput.setAttribute('autofocus', settings.autofocus || 'true')
  elementInput.setAttribute('inputmode', settings.inputmode || 'verbatim')
  elementInput.setAttribute('max', settings.max || '')
  elementInput.setAttribute('maxlength', settings.maxlength || '')
  elementInput.setAttribute('min', settings.min || '')
  elementInput.setAttribute('minlength', settings.minlength || '')
  elementInput.setAttribute('placeholder', settings.placeholder || '')
  elementInput.setAttribute('spellcheck', settings.spellcheck || 'default')
  elementInput.setAttribute('step', settings.step || 'any')
  elementInput.setAttribute('type', settings.type || 'text')

  elementInput.value = settings.value || ''

  // As-you-type input restrictions
  if (settings.allowed) {
    elementInput.oninput = () => {
      let regex
      if (Array.isArray(settings.allowed)) {
        let regexString = ''
        const allowed = settings.allowed
        for (let i = 0; i < allowed.length; i++) {
          if (allowed[i] === 'an') regexString += '0-9a-zA-Z'
          else if (allowed[i] === 'a') regexString += 'a-zA-Z'
          else if (allowed[i] === 'n') regexString += '0-9'
          if (allowed[i] === 's') regexString += ' '
        }
        regex = new RegExp(`[^${regexString}]`, 'g')
      } else if (typeof settings.allowed === 'object') {
        regex = settings.allowed
      }
      elementInput.value = elementInput.value.replace(regex, '')
    }
  }

  const elementButtonLeft = button(submitText, [
    options.classes.button,
    options.classes.elementHalf,
    options.classes.backgroundSuccess
  ], () => {
    removeFromDocument(element.id, position)
    removeOverlayFromDocument()
    if (submitCallback) submitCallback(elementInput.value)
    else if (submitCallbackArg) submitCallbackArg(elementInput.value)
  })

  const elementButtonRight = button(cancelText, [
    options.classes.button,
    options.classes.elementHalf,
    options.classes.backgroundError
  ], () => {
    removeFromDocument(element.id, position)
    removeOverlayFromDocument()
    if (cancelCallback) cancelCallback(elementInput.value)
    else if (cancelCallbackArg) cancelCallbackArg(elementInput.value)
  })

  element.appendChild(elementText)
  element.appendChild(elementInput)
  element.appendChild(elementButtonLeft)
  element.appendChild(elementButtonRight)

  element.listener = event => {
    if (enterClicked(event)) elementButtonLeft.click()
    else if (escapeClicked(event)) elementButtonRight.click()
  }

  addToDocument(element, position)

  elementInput.focus()

  addOverlayToDocument(element, position)
}

export const select = ({
  text,
  cancelText = 'Cancel',
  cancelCallback,
  choices,
  position = options.positions.select || position.top
}, cancelCallbackArg) => {
  blur()
  hideAlerts()

  const element = div()

  const elementText = textbox(text, [
    options.classes.textbox,
    options.classes.backgroundInfo
  ])

  element.appendChild(elementText)

  choices.forEach(({ type = 1, text, handler }, index) => {
    const elementChoice = div([
      typeToClassLookup[type],
      options.classes.button,
      options.classes.selectChoice
    ])

    const nextChoice = choices[index + 1]
    if (nextChoice && !nextChoice.type) nextChoice.type = 1
    if (nextChoice && nextChoice.type === type) {
      elementChoice.classList.add(options.classes.selectChoiceRepeated)
    }

    elementChoice.innerHTML = text
    elementChoice.onclick = () => {
      removeFromDocument(element.id, position)
      removeOverlayFromDocument()
      handler()
    }

    element.appendChild(elementChoice)
  })

  const elementCancel = button(cancelText, [
    options.classes.backgroundNeutral,
    options.classes.button
  ], () => {
    removeFromDocument(element.id, position)
    removeOverlayFromDocument()
    if (cancelCallback) cancelCallback()
    else if (cancelCallbackArg) cancelCallbackArg()
  })

  element.appendChild(elementCancel)

  element.listener = event => {
    if (escapeClicked(event)) elementCancel.click()
  }

  addToDocument(element, position)

  addOverlayToDocument(element, position)
}

export const date = ({
  value = new Date(),
  submitText = 'OK',
  cancelText = 'Cancel',
  submitCallback,
  cancelCallback,
  position = options.positions.date || position.top
}, submitCallbackArg, cancelCallbackArg) => {
  blur()
  hideAlerts()

  const arrow = '&#9662'

  const elementDateThird = () => div([
    options.classes.element,
    options.classes.elementThird
  ])

  const elementDateMonth = elementDateThird()
  const elementDateDay = elementDateThird()
  const elementDateYear = elementDateThird()

  const setValueHTML = date => {
    elementDateMonth.innerHTML = options.dateMonths[date.getMonth()]
    elementDateDay.innerHTML = date.getDate()
    elementDateYear.innerHTML = date.getFullYear()
  }

  const handleDayInput = event => {
    const daysInMonth = new Date(
      value.getFullYear(),
      value.getMonth() + 1,
      0
    ).getDate()
    let day = event.target.textContent
      .replace(/^0+/, '')
      .replace(/[^\d]/g, '')
      .slice(0, 2)
    if (Number(day) > daysInMonth) day = daysInMonth.toString()
    event.target.textContent = day
    if (Number(day) < 1) day = '1'
    value.setDate(Number(day))
  }

  const handleYearInput = event => {
    const year = event.target.textContent
      .replace(/^0+/, '')
      .replace(/[^\d]/g, '')
      .slice(0, 4)
    event.target.textContent = year
    value.setFullYear(Number(year))
  }

  const handleBlur = event => {
    setValueHTML(value)
  }

  const updateMonth = amount => {
    const daysInNextMonth = new Date(
      value.getFullYear(),
      value.getMonth() + amount + 1,
      0
    ).getDate()
    if (value.getDate() > daysInNextMonth) value.setDate(daysInNextMonth)
    value.setMonth(value.getMonth() + amount)
    setValueHTML(value)
  }

  const updateDay = amount => {
    value.setDate(value.getDate() + amount)
    setValueHTML(value)
  }

  const updateYear = amount => {
    const nextYear = value.getFullYear() + amount
    if (nextYear < 0) value.setFullYear(0)
    else value.setFullYear(value.getFullYear() + amount)
    setValueHTML(value)
  }

  const element = div()
  const elementDateSelector = div([options.classes.backgroundInfo])
  const elementDateSelectorInner = div([options.classes.dateSelectorInner])

  const downButton = onclick => button(arrow, [
    options.classes.button,
    options.classes.elementThird
  ], onclick)

  const upButton = onclick => {
    const element = downButton(onclick)
    element.classList.add(options.classes.dateSelectorUp)
    return element
  }

  const elementDateUpMonth = upButton(() => updateMonth(1))
  const elementDateUpDay = upButton(() => updateDay(1))
  const elementDateUpYear = upButton(() => updateYear(1))

  elementDateMonth.innerHTML = options.dateMonths[value.getMonth()]

  elementDateDay.setAttribute('contentEditable', true)
  elementDateDay.addEventListener('input', handleDayInput)
  elementDateDay.addEventListener('blur', handleBlur)
  elementDateDay.innerHTML = value.getDate()

  elementDateYear.setAttribute('contentEditable', true)
  elementDateYear.addEventListener('input', handleYearInput)
  elementDateYear.addEventListener('blur', handleBlur)
  elementDateYear.innerHTML = value.getFullYear()

  const elementDateDownMonth = downButton(() => updateMonth(-1))
  const elementDateDownDay = downButton(() => updateDay(-1))
  const elementDateDownYear = downButton(() => updateYear(-1))

  const elementButtonLeft = button(submitText, [
    options.classes.button,
    options.classes.elementHalf,
    options.classes.backgroundSuccess
  ], () => {
    removeFromDocument(element.id, position)
    removeOverlayFromDocument()
    if (submitCallback) submitCallback(value)
    else if (submitCallbackArg) submitCallbackArg(value)
  })

  const elementButtonRight = button(cancelText, [
    options.classes.button,
    options.classes.elementHalf,
    options.classes.backgroundError
  ], () => {
    removeFromDocument(element.id, position)
    removeOverlayFromDocument()
    if (cancelCallback) cancelCallback(value)
    else if (cancelCallbackArg) cancelCallbackArg(value)
  })

  elementDateSelectorInner.appendChild(elementDateUpMonth)
  elementDateSelectorInner.appendChild(elementDateUpDay)
  elementDateSelectorInner.appendChild(elementDateUpYear)
  elementDateSelectorInner.appendChild(elementDateMonth)
  elementDateSelectorInner.appendChild(elementDateDay)
  elementDateSelectorInner.appendChild(elementDateYear)
  elementDateSelectorInner.appendChild(elementDateDownMonth)
  elementDateSelectorInner.appendChild(elementDateDownDay)
  elementDateSelectorInner.appendChild(elementDateDownYear)
  elementDateSelector.appendChild(elementDateSelectorInner)
  element.appendChild(elementDateSelector)
  element.appendChild(elementButtonLeft)
  element.appendChild(elementButtonRight)

  element.listener = event => {
    if (enterClicked(event)) elementButtonLeft.click()
    else if (escapeClicked(event)) elementButtonRight.click()
  }

  addToDocument(element, position)

  addOverlayToDocument(element, position)
}

export default {
  alert,
  force,
  confirm,
  input,
  select,
  date,
  setOptions,
  hideAlerts
}
