class EmptyStringError extends Error {
  constructor (message = 'Empty string') {
    super(message)
  }
}

/*
 * @param {string} str
 * @param {function} callback
 * */
const upperCase = (str, callback) => {
  if (!str) {
    callback(new EmptyStringError())
  } else {
    callback(null, str.toUpperCase())
  }
}

it.each(['hello', 'world'])('should return an upper case of %s', param => {
  expect.assertions(1)
  function callback (err, str) {
    if (err) throw err
    expect(str).toEqual(param.toUpperCase())
  }
  upperCase(param, callback)
})

it.each([null, undefined])('should throw an error', param => {
  expect.assertions(2)
  function callback (err) {
    expect(err).toMatchObject(new EmptyStringError())
    expect(err).toBeInstanceOf(EmptyStringError)
  }
  upperCase(param, callback)
})
