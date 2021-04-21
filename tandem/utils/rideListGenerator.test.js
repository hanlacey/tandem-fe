import { rideMaker, rideListGenerator } from './rideListGenerator'

describe('rideMaker', () => {
    it('returns an object', () => {
        expect(typeof rideMaker('hannah1234', 'May 2', '12:00PM', 'casual', 'mountain', '10 miles', '234543')).toEqual('object')
    });
    it('returns a new ride', () => {
        expect(rideMaker('hannah1234', 'May 2', '12:00PM', 'casual', 'mountain', '10 miles', '234543')).toEqual({ rideCreator: 'hannah1234', rideLength: '10 miles', rideDate: 'May 2', rideTime: '12:00PM', rideDifficulty: "casual", rideBikeType: "mountain", rideRoute: "234543" })
    });
});