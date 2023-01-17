const passwordConstraints = {
  presence: {
      allowEmpty: false,
      message: "^Required"
    },
    length: {
      minimum: 8,
      maximum: 20,
      message: "^Must be at least 8 characters"
    },
    format: {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[!@#$%^&*()_\-+={[}\]:;"'<,>.?/|\\A-Za-z\d]{8,20}$/,
      flags: "i",
      message: "^Must have at least 1 letter and 1 number"
    }
}

const validationConstraints = {
  firstName: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
  },
  email: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    email: {
      message: '^Must be a valid email address',
    },
  },
  phoneNumber: {
    presence: {
      allowEmpty: false,
      message: '^Required',
    },
    format: {
      pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      message: '^Must be a valid phone number',
    },
  },
  password: passwordConstraints,
  confirmPassword: {
    equality: 'password',
  },
  currentPassword: passwordConstraints,
  postItemDiscount: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      lessThanOrEqualTo: 99,
      message: 'Must be less than or equal to 99%',
    },
  },
}

const createValidationObject = (fields) => {
    const validationObj = {}
    fields.forEach(field => {
        validationObj[field] = validationConstraints[field]
    })
    return validationObj
}

export const loginConstraints = createValidationObject(['email', 'password'])
export const registrationConstraints = createValidationObject([ 'firstName', 'lastName', 'email', 'phoneNumber', 'password', 'confirmPassword', ])
export const newPasswordConstraints = createValidationObject([ 'password', 'confirmPassword' ])
export const updateUserDetailsConstraints = createValidationObject(['firstName', 'lastName', 'email', 'phoneNumber',])
export const discountConstraints = createValidationObject(['postItemDiscount'])