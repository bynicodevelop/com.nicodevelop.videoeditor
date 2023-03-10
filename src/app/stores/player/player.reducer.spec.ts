import { initialState, playerReducer } from './player.reducer';

describe('Player Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = playerReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
