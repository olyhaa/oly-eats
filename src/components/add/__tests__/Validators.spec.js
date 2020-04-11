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
      // 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1528394829%2FGenTsoChickenAirFry.jpg',
      // 'https://lh3.googleusercontent.com/SpnD7wKgr1-UZ5wmbdR_ge72VYQiPxrQf7IcuQJdQ7fi7CFN7Y5pZ2qac_BfHk-zeOIsXjN8RDy-xdrCMRC8KwXix3jKdwrpfcZL-EI=w600-l68'
    ];

    testCases.forEach((name) => {
      it(`${name} IS a valid photo url`, () => {
        expect(isValidPhotoUrl(name)).toBeTruthy();
      });
    });
  });
});
