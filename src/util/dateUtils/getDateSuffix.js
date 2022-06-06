
const getDateSuffix = (dateObj) => {
    const date = dateObj.getDate()
    const dateString = date.toString()
    const lastChar = dateString.charAt(dateString.length - 1)

    switch(lastChar){
    case '1' : {
        if(date > 10 && date < 20){
            return date + 'th'
        }
        return date + 'st'
    }
    case '2' : {
        if(date > 10 && date < 20){
            return date + 'th'
        }
        return date + 'nd'
    }
    case '3' : {
        if(date > 10 && date < 20){
            return date + 'th'
        }
        return date + 'rd'
    }
    default : return date + 'th'
    }
}

export default getDateSuffix