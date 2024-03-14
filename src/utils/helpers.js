export const formatTime = (str) =>{
    if(str){
        return new Date(str).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
    } else {
        return "Unknown"
    }
}