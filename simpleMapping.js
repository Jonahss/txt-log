//json file where the key is a prefix regex. nested keys allow for nested objects

var mapping = {
  "timestamp" : {
    regex: /\d+/,
    separator: " ",
    parse: function (data) {
      return {
        timestamp: data,
        date: new Date(parseInt(data)).toString()
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
