export function sayHi(user) {
  alert(`Hello ${user}`)
}

export function downloadExcel() {
  const data = [
    ['col1', 'col2', 'col3'],
    [1, 2, 'a'],
    [3, 4, 'b']
  ]
  // Create a new Excel workbook
  const workbook = XLSX.utils.book_new();
  // Convert data to a worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  // Add worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  // Generate Excel file as a Blob
  const excelBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  // Create and click download link.
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([excelBlob], { type: 'application/octet-stream' }));
  a.download = 'file.xlsx';
  a.click();
  // remove the element
  a.remove();
}

export function downloadCSV() {
  var data = [
    ["Col1", "Col2", "Col3"],
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"]
  ]
  // create a new excel workbook
  const workbook = XLSX.utils.book_new()
  // create worksheet that contains the data
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  // Add worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  // Generate Excel file as a Blob
  const excelBlob = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
  // Create and click download link.
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([excelBlob], { type: 'application/octet-stream' }));
  a.download = 'file.csv';
  a.click();
  // remove the element
  a.remove();
}

/**
 * This function converts a list of elements to options with proper html tags 
 * @param {Array} list_of_elements The list of elements to be converted into options
 * @returns {string} the list with <option value> tags attached
 */
export function jslist_to_html(list_of_elements) {
  html_to_add = ""
  for (let i = 0; i < list_of_elements.length; i++) {
    temp = `<option value='${list_of_elements[i]}'>${list_of_elements[i]}</option>`
    html_to_add += temp
  }
  return html_to_add
}

export function movePopup(event) {
  var customPopup = document.getElementById('customPopup');
  // move the customPopup
  customPopup.style.top = window.scrollY + event.clientY + "px";
  customPopup.style.left = window.scrollX + event.clientX + "px";
}

var clickCounter = 0
export function disappearPopup(event) {
  var customPopup = document.getElementById('customPopup');
  // move the customPopup
  customPopup.style.top = window.scrollY + event.clientY + "px";
  customPopup.style.left = window.scrollX + event.clientX + "px";
  // make it disappear
  if (clickCounter % 2 === 0) {
    customPopup.style.zIndex = -1
    customPopup.style.visibility = "hidden"
  }
  else {
    customPopup.style.zIndex = 1
    customPopup.style.visibility = "visible"
  }
  // increase clickCounter
  clickCounter += 1
}