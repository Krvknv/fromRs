/**
 * @jest-environment jsdom
 */

function resetAll() {
    global.localStorage.clear();
    global.location.reload();
}

test('reset test', () => {
    expect(resetAll()).toBeUndefined();
});
