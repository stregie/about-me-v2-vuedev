export const formatSize = (bytes) => {
  if(!bytes) {
    return "";
  }
  if (bytes < 2 ** 10){
    return bytes.toString() + " B";
  }
  if (2 ** 10 <= bytes && bytes < 2 ** 20){
    return Math.floor(bytes / 2 ** 10).toString() + " KB";
  }
  if (2 ** 20 <= bytes && bytes < 2 ** 30){
    return Math.floor(bytes / 2 ** 20).toString() + " MB";   
  }
  if (2 ** 30 <= bytes){
    return Math.floor(bytes / 2 ** 30).toString() + " GB";
  }
};

export const formatDate = (date) => {
  if (!(date instanceof Date)){
    date = new Date(date);
  } if(!isNaN(date)){
    let YYYY = date.getFullYear();

    let MM = date.getMonth() + 1;
    if (MM < 10){MM = "0" + MM};
    
    let DD = date.getDate();
    if (DD < 10){DD = "0" + DD};

//     let hh = date.getHours();
//     if (hh < 10){hh = "0" + hh};
// 
//     let mm = date.getMinutes();
//     if (mm < 10){mm = "0" + mm};
// 
//     let ss = date.getSeconds();
//     if (ss < 10){ss = "0" + ss};

    return YYYY + "-" + MM + "-" + DD;    
    // return YYYY + "-" + MM + "-" + DD + ", " + hh + ":" + mm + ":" + ss;    
  } else {
    return "Date";
  }
};

export const highlightRow = (element) => {
  if (element.className.includes("folder-action") || element.className.includes("file-action")){
    element.classList.add("highlight");
    element.nextElementSibling.classList.add("highlight");
    element.nextElementSibling.nextElementSibling.classList.add("highlight");
    element.nextElementSibling.nextElementSibling.nextElementSibling.classList.add("highlight");
    element.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.add("highlight");
  }
  if (element.className.includes("folder-name") || element.className.includes("file-name")){
    element.previousElementSibling.classList.add("highlight");
    element.classList.add("highlight");
    element.nextElementSibling.classList.add("highlight");
    element.nextElementSibling.nextElementSibling.classList.add("highlight");
    element.nextElementSibling.nextElementSibling.nextElementSibling.classList.add("highlight");
  }
  if (element.className.includes("folder-ext") || element.className.includes("file-ext")){
    element.previousElementSibling.previousElementSibling.classList.add("highlight");
    element.previousElementSibling.classList.add("highlight");
    element.classList.add("highlight");
    element.nextElementSibling.classList.add("highlight");
    element.nextElementSibling.nextElementSibling.classList.add("highlight");
  }
  if (element.className.includes("folder-size") || element.className.includes("file-size")){
    element.previousElementSibling.previousElementSibling.previousElementSibling.classList.add("highlight");
    element.previousElementSibling.previousElementSibling.classList.add("highlight");
    element.previousElementSibling.classList.add("highlight");
    element.classList.add("highlight");
    element.nextElementSibling.classList.add("highlight");
  }
  if (element.className.includes("folder-date") || element.className.includes("file-date")){
    element.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList.add("highlight");
    element.previousElementSibling.previousElementSibling.previousElementSibling.classList.add("highlight");
    element.previousElementSibling.previousElementSibling.classList.add("highlight");
    element.previousElementSibling.classList.add("highlight");
    element.classList.add("highlight");
  }
}

export const removeHighlight = (element) => {
  if (element.className.includes("folder-action") || element.className.includes("file-action")){
    element.classList.remove("highlight");
    element.nextElementSibling.classList.remove("highlight");
    element.nextElementSibling.nextElementSibling.classList.remove("highlight");
    element.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove("highlight");
    element.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove("highlight");
  }
  if (element.className.includes("folder-name") || element.className.includes("file-name")){
    element.previousElementSibling.classList.remove("highlight");
    element.classList.remove("highlight");
    element.nextElementSibling.classList.remove("highlight");
    element.nextElementSibling.nextElementSibling.classList.remove("highlight");
    element.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove("highlight");
  }
  if (element.className.includes("folder-ext") || element.className.includes("file-ext")){
    element.previousElementSibling.previousElementSibling.classList.remove("highlight");
    element.previousElementSibling.classList.remove("highlight");
    element.classList.remove("highlight");
    element.nextElementSibling.classList.remove("highlight");
    element.nextElementSibling.nextElementSibling.classList.remove("highlight");
  }
  if (element.className.includes("folder-size") || element.className.includes("file-size")){
    element.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove("highlight");
    element.previousElementSibling.previousElementSibling.classList.remove("highlight");
    element.previousElementSibling.classList.remove("highlight");
    element.classList.remove("highlight");
    element.nextElementSibling.classList.remove("highlight");
  }
  if (element.className.includes("folder-date") || element.className.includes("file-date")){
    element.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove("highlight");
    element.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove("highlight");
    element.previousElementSibling.previousElementSibling.classList.remove("highlight");
    element.previousElementSibling.classList.remove("highlight");
    element.classList.remove("highlight");
  }

}