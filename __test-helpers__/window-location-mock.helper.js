exports.mockWindowLocation = () => {
  const originalWindowLocation = window.location;

  beforeEach(() => {
    delete window.location;

    // mock window.location
    window.location = Object.defineProperties(
      {},
      {
        ...Object.getOwnPropertyDescriptors(originalWindowLocation),
        assign: {
          configurable: true,
          value: jest.fn(),
        },
      },
    );
  });

  afterEach(() => {
    // restore original `jsdom` location
    window.location = originalWindowLocation;
  });
};
