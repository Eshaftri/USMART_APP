const { client, index, type } = require('./connection')

module.exports = {
  /** Query ES index for the provided term */
  queryTerm (offset = 0) {
    const body = {
      from: offset,
      highlight: { fields: { text: {} } }
    }

    return client.search({ index, type, body })
  }
}