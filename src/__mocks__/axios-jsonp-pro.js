export default {
  jsonp: jest.fn(() => Promise.resolve({
    success: true
  }))
}
