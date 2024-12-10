// jest.setup.ts
import "@testing-library/jest-dom"; // For better DOM assertions

// Mock localStorage globally for all tests
beforeAll(() => {
  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
    length: 0,
    key: jest.fn(),
  };
});

afterAll(() => {
  jest.restoreAllMocks(); 
});
