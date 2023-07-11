export default function timestampConvert(date) {
    let hours = new Date(date).getHours();
    let minutes = new Date(date).getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let result = hours + ":" + minutes + " " + ampm;
    return result;
}
