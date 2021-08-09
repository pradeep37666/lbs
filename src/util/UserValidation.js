import Instance from './axios';


export const handleFullName = (e, setName, setValidation) => {
    let nameInput = e.target.value;

    if (nameInput.length === 0) {
        setName("")
        setValidation("Full name is required")
    } else if (nameInput.length >= 4) {
        setName(nameInput)
        setValidation("")
    } else {
        setValidation("Full name must be at least 4 characters")
        setName("")
    }
}

export const handleEmail = (e, setEmail, setValidation) => {
    let emailInput = e.target.value;

    if (emailInput.length === 0) {
        setEmail("")
        setValidation("Email is required")
    } else if (/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailInput)) {
        // Check if email is already in use
        Instance.get(`/user/checkExist/?email=${emailInput}`).then((response) => {
            if (response.status === 204) {
                setEmail(emailInput)
                setValidation("")
            } else {
                setEmail("")
                setValidation("This user already exists, please use another email address")
            }
          })
          .catch((error) => {
            setValidation("Sorry something went wrong, please try again")
          })
    } else {
        setEmail("")
        setValidation("Incorrect email format, should be in format: example@example.com")
    }
}

export const handlePhoneNumber = (e, setPhone, setValidation) => {
    let phoneInput = e.target.value;
    if (phoneInput.length === 0) {
        setPhone("")
        setValidation("Phone number is required")
    } else if (/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/.test(phoneInput)) {
        Instance.get(`/user/checkExist/?mobile=${phoneInput}`).then((response) => {
            if (response.status === 204) {
                setPhone(phoneInput)
                setValidation("")
            } else {
                setPhone("")
                setValidation("This mobile number is already registered to another user, please use a different number")
            }
          })
          .catch((error) => {
            setValidation("Sorry something went wrong, please try again")
          })
    } else {
        setPhone("")
        setValidation("Incorrect phone number format")
    }
}