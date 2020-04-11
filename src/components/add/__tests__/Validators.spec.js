import { isValidPhotoUrl } from '../Validators';

describe('isValidPhotoUrl', () => {
  describe('Not Photos', () => {
    const testCases = [
      'https://www.allrecipes.com/recipe/51301/sarahs-applesauce/',
    ];

    testCases.forEach((name) => {
      it(`${name} is NOT a valid photo url`, () => {
        expect(isValidPhotoUrl(name)).toBeFalsy();
      });
    });
  });

  describe('Photos', () => {
    const testCases = [
      'https://images.media-allrecipes.com/userphotos/720x405/25840.jpg',
    ];

    testCases.forEach((name) => {
      it(`${name} IS a valid photo url`, () => {
        expect(isValidPhotoUrl(name)).toBeTruthy();
      });
    });
  });
});
