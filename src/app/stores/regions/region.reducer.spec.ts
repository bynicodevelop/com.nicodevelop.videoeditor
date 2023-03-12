import { initialState, regionReducer } from './region.reducer';

describe('Region Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = regionReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
