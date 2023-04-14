const parseAddressComponent = addressComponent => {
  console.log('ADDRESS', JSON.stringify(addressComponent, null, 2))
  const subPremiseObj = addressComponent.find(obj =>
    obj.types.includes('subpremise')
  )
  const subPremise = subPremiseObj?.long_name
  const streetNumberObj = addressComponent.find(obj =>
    obj.types.includes('street_number')
  )
  let streetNumber = streetNumberObj?.long_name
  if (subPremise) {
    streetNumber = `${subPremise}/${streetNumber}`
  }
  const streetNameObj = addressComponent.find(obj =>
    obj.types.includes('route')
  )
  const streetName = streetNameObj?.long_name
  const suburbObj = addressComponent.find(obj => obj.types.includes('locality'))
  const suburb = suburbObj?.long_name
  const cityObj = addressComponent.find(obj =>
    obj.types.includes('administrative_area_level_2')
  )
  const city = cityObj?.long_name
  const stateObj = addressComponent.find(obj =>
    obj.types.includes('administrative_area_level_1')
  )
  const state = stateObj?.short_name
  const countryObj = addressComponent.find(obj => obj.types.includes('country'))
  const country = countryObj?.short_name
  const postCodeObj = addressComponent.find(obj =>
    obj.types.includes('postal_code')
  )
  const postCode = postCodeObj?.long_name
  const presentValues = [
    subPremise,
    streetNumber,
    streetName,
    suburb,
    state,
    country,
    postCode,
  ].filter(value => value !== undefined)
  const fullAddress = presentValues.join(' ')
  console.log('BLAH BLAH', {
    streetNumber,
    streetName,
    suburb,
    city,
    state,
    country,
    postCode,
    fullAddress,
  })
  // TODO - Implement less strict check to prevent issues with New Zealand addresses
  //   if (
  //     streetNumber === undefined ||
  //     streetName === undefined ||
  //     suburb === undefined ||
  //     city === undefined ||
  //     state === undefined ||
  //     country === undefined ||
  //     postCode === undefined
  //   )
  //     return
  return {
    streetNumber,
    streetName,
    suburb,
    city,
    state,
    country,
    postCode,
    fullAddress,
  }
}

export default parseAddressComponent
