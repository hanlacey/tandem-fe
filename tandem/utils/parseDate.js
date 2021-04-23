const parseDate = (ride_date) => {
    const weirdDate = new Date(ride_date);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    const normalDate = weirdDate.toLocaleString("default", options);
    return normalDate;
};

export default parseDate