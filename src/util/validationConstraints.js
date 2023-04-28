const passwordConstraints = {
  presence: {
    allowEmpty: false,
    message: '^Required',
  },
  length: {
    minimum: 8,
    message: '^Must be at least 8 characters',
  },
  format: {
    pattern:
      /^(?=.*[A-Za-z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_\-+={[}\]:;"'<,>.?/|\\])[A-Za-z\d!@#$%^&*()_\-+={[}\]:;"'<,>.?/|\\]{8,}$/,
    flags: 'i',
    message: '^Must have at least 2 numbers and 1 special character',
  },
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
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: 99,
      message: 'Must be less than or equal to 99%',
    },
  },
  streetNumber: {
    presence: {
      allowEmpty: false,
      message: '^Street Number is required',
    },
  },
  streetName: {
    presence: {
      allowEmpty: false,
      message: '^Street Name is required',
    },
  },
  suburb: {
    presence: {
      allowEmpty: false,
      message: '^Suburb is required',
    },
  },
  state: {
    presence: {
      allowEmpty: false,
      message: '^State is required',
    },
  },
  postCode: {
    presence: {
      allowEmpty: false,
      message: '^Post Code is required',
    },
  },
  country: {
    presence: {
      allowEmpty: false,
      message: '^Country is required',
    },
    inclusion: {
      within: ['NZ', 'AU'],
      message: '^Country must be either NZ or AU',
    },
  },
  city: {
    presence: {
      allowEmpty: false,
      message: '^City is required',
    },
  },
}

const createValidationObject = fields => {
  const validationObj = {}
  fields.forEach(field => {
    validationObj[field] = validationConstraints[field]
  })
  return validationObj
}

export const loginConstraints = createValidationObject(['email', 'password'])
export const registrationConstraints = createValidationObject([
  'firstName',
  'lastName',
  'email',
  'phoneNumber',
  'password',
  'confirmPassword',
])
export const newPasswordConstraints = createValidationObject([
  'password',
  'confirmPassword',
])
export const updateUserDetailsConstraints = createValidationObject([
  'firstName',
  'lastName',
  'email',
  'phoneNumber',
])
export const discountConstraints = createValidationObject(['postItemDiscount'])

export const userAddressConstraints = createValidationObject([
  'streetNumber',
  'streetName',
  'suburb',
  'state',
  'postCode',
  'country',
  'city',
])
