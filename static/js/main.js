import { sayHi, downloadExcel, downloadCSV, movePopup, disappearPopup } from "./child.js";

$(document).ready(function() {
  // add event listener to make customPopup disappear
  sayHi('Sandipto') // user='Sandipto' will result in error. No keyworded arguments allowed
  document.addEventListener('mousemove', movePopup)
  document.addEventListener('click', disappearPopup)

})