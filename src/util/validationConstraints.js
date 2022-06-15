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
          message: "^Required"
        }
    },
    lastName: {
        presence: {
            allowEmpty: false,
            message: "^Required"
        }
    },
    email: {
        presence: {
          allowEmpty: false,
          message: "^Required"
        },
        email: {
          message: "^Must be a valid email address"
        }
    },
    // dateOfBirth: {
    //   // datetime: true
    //     datetime: {
    //         // dateOnly: true,
    //         latest: moment.utc().subtract(18, 'years'),
    //         message: "^You need to be at least 18 years old"
    //       }
    // },
    phoneNumber: {
        presence: {
            allowEmpty: false,
            message: "^Required a",
        }
    },
    password: passwordConstraints,
    confirmPassword: passwordConstraints,
    currentPassword: passwordConstraints
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
// export const passwordConstraints = createValidationObject(['password'])
