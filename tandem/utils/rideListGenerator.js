const rideMaker = (rideId, rideCreator, rideDate, rideTime, rideDifficulty, rideBikeType, rideLength, rideRoute, attendeeCount) => {
    const ride = {
        rideId, rideCreator, rideDate, rideTime, rideDifficulty, rideBikeType, rideLength, rideRoute, attendeeCount
    }
    return ride
}

const rideListGenerator = () => {
    const rideList = []

    rideList.push(rideMaker(1, 'hannah1234', 'May 2', '12:00PM', 'casual', 'mountain', '10 miles', '234543', 3))
    rideList.push(rideMaker(2, 'nadia123123', 'May 1', '2:00PM', 'hardcore', 'mountain', '60 miles', '123123', 8))
    rideList.push(rideMaker(3, 'dan2342', 'June 1', '8:00AM', 'challenging', 'road', '30 miles', '1112333', 2))
    rideList.push(rideMaker(4, 'tom327', 'May 11', '10:00AM', 'casual', 'mountain', '31 miles', '123343', 5))
    rideList.push(rideMaker(5, 'raof', 'May 11', '10:00AM', 'hardcore', 'mountain', '60 miles', '123553', 4))

    return rideList
}

const sampleRides = rideListGenerator()

module.exports = sampleRides