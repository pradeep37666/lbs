const getSuburb = (terms) => {
    const i = terms.length - 1
    console.log('terms: ', terms)
    let string = terms[i - 4].long_name + ' ' + terms[i - 2].long_name + ' ' + terms[i - 1].long_name
    return string
}

export default getSuburb