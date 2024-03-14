//debounce function for search functionality
export const debounce = (func, delay) =>{
    let timerID;
    return function (...args){
        clearTimeout(timerID) //clear previous timer
        timerID = setTimeout(() => { //create new timer
            func(...args);
        }, delay);
    }
}