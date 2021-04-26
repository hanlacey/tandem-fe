const parseDate = (ride_date) => {
    const weirdDate = new Date(ride_date);

    const dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit"
    }
    const normalDate = weirdDate.toLocaleString("default", dateOptions);
    const time = weirdDate.toLocaleString("default", timeOptions)
    return `${normalDate} at ${time}`
}
export default parseDate