export const throttle = (func, delay) =>{
    let alreadyThrottled = false;
    return async function (...args){
        if(!alreadyThrottled){
            //call the function if not called before within time
            alreadyThrottled = true;
            const result = await func(...args);

            //reset the throttle after time has elapsed
            setTimeout(() => {
                alreadyThrottled = false;
            }, delay);

            return result;
        }
    }
}