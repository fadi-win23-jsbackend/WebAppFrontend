﻿const formErrorHandler = (element, validationResult) => {

    let spanElement = document.querySelector(`[data-valmsg-for="${element.name}"]`)

    if (validationResult) {
        element.classList.remove('input-validation-error')
        spanElement.classList.remove('field-validation-error')
        spanElement.classList.add('field-validation-valid')
        spanElement.innerHTML = ''

    }
    else {
        element.classList.add('input-validation-error')
        spanElement.classList.add('field-validation-error')
        spanElement.classList.remove('field-validation-valid')
        spanElement.innerHTML = element.dataset.valRequired

    }

}


const textValidator = (element, minLength = 2) => {
    if (element.value.length >= minLength) {
        formErrorHandler(element, true)

    }
    else {
        formErrorHandler(element, false)

    }

}


const emailValidator = (element) => {
    const regEx = /^([-!# - '*+/-9=?A-Z^-~]+(\.[-!#-' * +/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])$/
    formErrorHandler(element, regEx.test(element.value))
}


const passwordValidator = (element) => {
    if (element.dataset.valEqualtoOther !== undefined) {

        //let password = document.getElementsByName(element.dataset.valEqualtoOther.replace('*', 'Form'))[0].value
        const passwordField = document.getElementsByName("password")[0]
        const confirmPasswordField = element;

        const password = passwordField.value
        const confirmPassword = confirmPasswordField.value

        if (password === confirmPassword) {
            formErrorHandler(element, true)
        }
        else {
            formErrorHandler(element, false)
        }

    }
    else {

        const regEx = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

        formErrorHandler(element, regEx.test(element.value))
    }
}


const checkboxValidator = (element) => {

    if (element.checked) {
        formErrorHandler(element, true)
    }
    else {
        formErrorHandler(element, false)
    }

}


let forms = document.querySelectorAll('form')
let inputs = forms[0].querySelectorAll('input')

inputs.forEach(input => {
    if (input.dataset.val === 'true') {

        if (input.type === 'checkbox') {
            input.addEventListener('change', (e) => {
                checkboxValidator(e.target)
            })

        }
        else {
            input.addEventListener('keyup', (e) => {

                switch (e.target.type) {

                    case 'text':
                        textValidator(e.target)
                        break;

                    case 'email':
                        emailValidator(e.target)
                        break;

                    case 'password':
                        passwordValidator(e.target)

                }
            })
        }
    }
})
