const getSuburb = (terms) => {
    const i = terms.length - 1
    let string = terms[i - 2].value + ' ' + terms[i - 1].value + ' ' + terms[i].value
    return string
}

export default getSuburb