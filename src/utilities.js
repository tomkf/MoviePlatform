const token = "";

const parseDate = (dateStr) => {
    let year = dateStr.slice(0, 4)
    let month = dateStr.slice(5, 7)
    let day = dateStr.slice(8, 10)
    let parseMonth = "";
  
    switch(month){
      case "01":
        parseMonth = "January";
      break;
      case "02":
          parseMonth = "Febuary";
      break;
      case "03":
          parseMonth = "March";
      break;
      case "04":
          parseMonth = "April";
      break;
      case "05":
          parseMonth = "May";
      break;
      case "06":
          parseMonth = "June";
      break;
      case "07":
          parseMonth = "July";
      break;
      case "08":
          parseMonth = "August";
      break;
      case "09":
          parseMonth = "September";
      break;
      case "10":
          parseMonth = "October";
      break;
      case "11":
          parseMonth = "November";
      break;
      case "12":
          parseMonth = "December";
      break;
    }
  
    return `${parseMonth} ${day}, ${year}`
    }

export default {token, parseDate};