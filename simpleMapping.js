//json file where the key is a prefix regex. nested keys allow for nested objects


var mapping = {
  "major" : {
    regex: /1/,
    separator: " ",
    parse: function (data) {
      return {
        foo: "bar",
        tag: data
      }
    },
    children : {
      "minorA" : {
        regex: /A/,
        separator: " ",
        parse: function (data) {
          return {
            missA: "hi"
          }
        }
      },
      "minorB" : {
        regex: /B/,
        separator: " ",
        parse: function (data) {
          return {
            missB: "bye"
          }
        }
      }
    }
  }
}

module.exports = mapping;
