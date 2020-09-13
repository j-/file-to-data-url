import rootReducer from '.';

describe('REMOVE_FILES', () => {
  it('removes a single file', () => {
    const previousState = {
      files: [
        {
          name: 'Screen Shot 2020-08-21 at 14.21.35 .png',
          size: 613365,
          type: 'image/png',
          last: '2020-08-21T04:21:36.509Z',
          blob: 'blob:https://ihmqf.csb.app/f3d0d4f3-2432-4a71-9bed-14859a5099f2',
        },
      ],
      latest: 'blob:https://ihmqf.csb.app/f3d0d4f3-2432-4a71-9bed-14859a5099f2'
    };
    const action = {
      type: 'REMOVE_FILES',
      payload: {
        blobs: ['blob:https://ihmqf.csb.app/f3d0d4f3-2432-4a71-9bed-14859a5099f2'],
      },
    };
    const state = rootReducer(previousState, action);
    expect(state).toEqual({
      files: [],
      latest: null,
    });
  });
});
