const mondayService = require('./monday.service');
// const transformationService = require('../services/transformation-service');
// const { TRANSFORMATION_TYPES } = require('../constants/transformation');
const axios = require('axios')
const initMondayClient = require('monday-sdk-js');
const token = process.env.MONDAY_API






async function getInter(req, res) {
  const body = req.body
  try {
    const { shortLivedToken } = req.session
    const monday = initMondayClient()
    monday.setToken(shortLivedToken)
    const { boardId, itemId, columnId, statusColumnValue } = body.payload?.inputFields
    // console.log('getInter -> statusColumnValue', statusColumnValue)

    var query = `query {
      boards(ids: ${boardId}) {
        items(ids: ${itemId}) {
          column_values {
            title
            text
            value
            id
            type
            title
          }
        }
      }
    }`

    var result = await monday.api(query)
    const { items } = result.data.boards[0]
    const { column_values } = items[0]
    const originColTitle = column_values.find(colVal => colVal.id === columnId).title
    // console.log('getInter -> column_values', column_values)

    const connectedCol = column_values.find(colVal => colVal.type === 'board-relation')
    if (!connectedCol?.value) return res.end()
    const parsedValue = JSON.parse(connectedCol.value)
    const targetItemId = parsedValue.linkedPulseIds[0].linkedPulseId

    query = `query {
      boards (limit: 2000) {
        id
        name
        items(ids: ${targetItemId}) {
          name 
          id
          column_values {
            title
            text
            value
            id
            type
            title
          }
        }
      }
    }`

    result = await monday.api(query)
    console.log('getInter -> result', result)
    const correlateBoard = result.data.boards.find(board => board.items.length)
    console.log('getInter -> correlateBoard', correlateBoard)
    const targetBoardId = correlateBoard.id
    const targetColId = correlateBoard.items[0].column_values.find(colVal => colVal.title === originColTitle).id


    const newVal = `{\"index\": ${statusColumnValue.label.index}}`
    console.log('getInter -> newVal', newVal)

    query = `mutation {
      change_column_value (board_id: ${targetBoardId}, item_id: ${targetItemId}, column_id: ${targetColId}, value: ${JSON.stringify(newVal)}) {
        id
      }
    }`

    const check = await monday.api(query)
    console.log('getInter -> check', check)
  } catch (err) {
    console.log('err: ', err);

  } finally {
    res.end()

  }
}








module.exports = {
  //   executeAction,
  //   getRemoteListOptions,

  getInter,
};
