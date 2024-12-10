import { GlobalStateManager } from "../GlobalState";

// C-O-M-M-E-N-T  O-U-T  A-L-L  L-O-C-A-L-S-T-O-R-A-G-E  U-S-A-G-E  I-N  T-H-E  G-L-O-B-A-L-S-T-A-T-E-M-A-N-A-G-E-R  C-L-A-S-S  B-E-F-O-R-E  R-U-N-N-I-N-G T-H-I-S T-E-S-T

describe('GlobalStateManager', () => {

  it('should initialize with an empty state if no data is in localStorage', () => {
    const globalState = GlobalStateManager.getInstance();

    expect(globalState.getState('someKey')).toBeUndefined();
  });

  it('should initialize with stored data from localStorage if available', () => {
    const globalState = GlobalStateManager.getInstance();
    expect(globalState.getState('someKey')).toBe('storedValue'); // This should Fail
  });

  it('should set and get state correctly', () => {
    const globalState = GlobalStateManager.getInstance();

    globalState.setState('someKey', 'storedValue');
    expect(globalState.getState('someKey')).toBe('storedValue');
  });

  it('should clear the state correctly', () => {
    const globalState = GlobalStateManager.getInstance();

    globalState.setState('someKey', 'storedValue');
    globalState.clearState();
    expect(globalState.getState('someKey')).toBeUndefined();
  });

});
