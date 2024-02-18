export function formatDate(inputDate) {
    const dateParts = inputDate.split('/');
    const month = parseInt(dateParts[0]);
    const day = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);
  
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const formattedDate = `${months[month - 1]} ${day}, ${year}`;
    return formattedDate;
  }