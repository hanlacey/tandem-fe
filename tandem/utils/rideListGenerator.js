const rideMaker = (rideCreator, rideDate, rideTime, rideDifficulty, rideBikeType, rideLength, rideRoute) => {
    const ride = {
        rideCreator, rideDate, rideTime, rideDifficulty, rideBikeType, rideLength, rideRoute
    }
    return ride
}

const rideListGenerator = () => {
    const rideList = []

    rideList.push(rideMaker('hannah1234', 'May 2', '12:00PM', 'casual', 'mountain', '10 miles', '234543'))
    rideList.push(rideMaker('nadia123123', 'May 1', '2:00PM', 'hardcore', 'mountain', '60 miles', '123123'))
    rideList.push(rideMaker('dan2342', 'June 1', '8:00AM', 'challenging', 'road', '30 miles', '1112333'))
    rideList.push(rideMaker('tom327', 'May 11', '10:00AM', 'casual', 'mountain', '31 miles', '123343'))
    rideList.push(rideMaker('raof', 'May 11', '10:00AM', 'hardcore', 'mountain', '60 miles', '123553'))

    return rideList
}

const sampleRides = rideListGenerator()

module.exports = sampleRides