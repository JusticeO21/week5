import { GlobalStateManager } from "../GlobalState";

describe('GlobalStateManager', () => {

  it('should initialize with an empty state if no data is in localStorage', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    const globalState = GlobalStateManager.getInstance();

    expect(globalState.getState('someKey')).toBeUndefined();
  });

  it('should initialize with stored data from localStorage if available', () => {
    const mockState = { someKey: 'storedValue' };
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(mockState));

    const globalState = GlobalStateManager.getInstance();
    expect(globalState.getState('someKey')).toBe('storedValue');
  });

  it('should set and get state correctly', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    const globalState = GlobalStateManager.getInstance();

    globalState.setState('someKey', 'storedValue');
    expect(globalState.getState('someKey')).toBe('storedValue');
  });

  it('should clear the state correctly', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    const globalState = GlobalStateManager.getInstance();

    globalState.setState('someKey', 'storedValue');
    globalState.clearState();
    expect(globalState.getState('someKey')).toBeUndefined();
  });

  it('should store the state in localStorage when storeData is called', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    const globalState = GlobalStateManager.getInstance();

    globalState.setState('someKey', 'storedValue');

    const setItemMock = jest.spyOn(localStorage, 'setItem');
    globalState.storeData();

    expect(setItemMock).toHaveBeenCalledWith('state', JSON.stringify({ someKey: 'storedValue' }));
  });
});
