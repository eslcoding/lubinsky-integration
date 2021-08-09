const initMondayClient = require('monday-sdk-js');
const PREFIX_KEY = 'prefixKey'
// const dbService = require('./mongo-service')
const dbService = require('../../services/db.service');


// const fs = require('fs');

// var prefixMap = require('../data/prefixMap.json')


const ObjectId = require('mongodb').ObjectId;




// const getColumnValue = async (token, itemId, columnId) => {
//   try {
//     const mondayClient = initMondayClient();
//     mondayClient.setToken(token);
//     // mondayClient.s
//     const query = `query {
//         items (ids: ${itemId}) {
//           column_values(ids:${columnId}) {
//             value
//           }
//         }
//       }`;

//     const response = await mondayClient.api(query);
//     return response.data.items[0].column_values[0].value;
//   } catch (err) {
//     console.error(err);
//   }
// };


// const changeColumnValue = async (token, boardId, itemId, columnId, value) => {
//   try {
//     const mondayClient = initMondayClient({ token });

//     // const query = `mutation change_column_value($boardId: Int!, $itemId: Int!, $columnId: String!, $value: JSON!) {
//     //     change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
//     //       id
//     //     }
//     //   }
//     //   `;

//     const query = `mutation {
//         change_column_value(board_id: ${boardId}, item_id: ${itemId}, column_id: ${columnId}, value: ${JSON.stringify(value)}) {
//           id
//         }
//       }
//       `;
//     // const variables = { boardId, columnId, itemId, value };

//     const response = await mondayClient.api(query);
//     return response;
//   } catch (err) {
//     console.error(err);
//   }
// };



const storeBoardNum = (token) => {
  const mondayClient = initMondayClient({ token });

  // const boardKey = KEY + boardId
  mondayClient.storage.instance.getItem('boardKey').then(res => {
    const nextNum = res.data.value ? +res.data.value + 1 : 1
    console.log('monday.storage.instance.getItem -> nextNum', nextNum)
    // const 
    monday.storage.instance.setItem('boardKey', nextNum).then(res => {
      console.log(res);
    })
  })
}

async function getPrefixMap() {
  const collection = await dbService.getCollection('prefix')
  try {
    const prefix = await collection.find().toArray();

    return prefix
  } catch (err) {
    console.log('ERROR: cannot find prefix')
    throw err;
  }
  // return mongoService.connect()
  //       .then(async db => {
  //           const collection = await db.collection('prefix');


  //           // console.log('getPrefixMap -> collection', collection)
  //           return collection.find({}).toArray()
  //       })
}

async function getPrefixMapByBoardId(boardId) {
  // boardId = '123'
  console.log('hey get prefix mapppppppp');
  const collection = await dbService.getCollection('prefix')
  try {
    // const prefix = await collection.find().toArray();
    const prefix = await collection.findOne({ boardId })


    return prefix
  } catch (err) {
    console.log('ERROR: cannot find prefix')
    throw err;
  }
  // return mongoService.connect()
  //       .then(async db => {
  //           const collection = await db.collection('prefix');


  //           // console.log('getPrefixMap -> collection', collection)
  //           return collection.find({}).toArray()
  //       })
}


function getNextPrefixCount(prefix, prefixMap) {
  // if ()
  prefixMap.map[prefix] = (prefixMap.map[prefix]) ? prefixMap.map[prefix] + 1 : 1
  return prefix + '-' + prefixMap.map[prefix]
}


async function addPrefixMap(prefixMap) {
  const collection = await dbService.getCollection('prefix')
  try {
    await collection.insertOne(prefixMap);

    return prefixMap
  } catch (err) {
    console.log('ERROR: cannot ADD prefix')
    throw err;
  }

}


// async function updatePrefixMap(prefixMap) {
//   const collection = await dbService.getCollection('prefix')
//   try {
//     const prefix = await collection.updateOne({ name: "prefix" }, { $set: { prefixMap } })
//     return prefix
//   } catch (err) {
//     console.log('ERROR: cannot update prefix')
//     throw err;
//   }
//   // return mongoService.connect()
//   // .then(db => {
//   //   const collection = db.collection('prefix');
//   //   return collection.updateOne({ name: "prefix" }, { $set: {prefixMap} })
//   //             .then(result => {
//   //               console.log('result: ', result);

//   //                 return prefixMap;
//   //             })
//   //     })
// }

async function updatePrefixMap(prefixMap) {
  const collection = await dbService.getCollection('prefix')
  try {
    const prefix = await collection.updateOne({ boardId: prefixMap.boardId }, { $set: { map: prefixMap.map, targetColId: prefixMap.targetColId } })
    return prefix
  } catch (err) {
    console.log('ERROR: cannot update prefix')
    throw err;
  }

  // return mongoService.connect()
  // .then(db => {
  //   const collection = db.collection('prefix');
  //   return collection.updateOne({ name: "prefix" }, { $set: {prefixMap} })
  //             .then(result => {
  //               console.log('result: ', result);

  //                 return prefixMap;
  //             })
  //     })
}





module.exports = {
  // getColumnValue,
  // changeColumnValue,
  getPrefixMap,
  updatePrefixMap,
  getPrefixMapByBoardId,
  addPrefixMap,
  getNextPrefixCount
};












// const dbService = require('../../services/db.service');
// const fetch = require('node-fetch');
// const logger = require('../../services/logger.service');
// var nodemailer = require('nodemailer');
// // const { monday } = require('../../config')
// // const { getUserByEmail } = require('../user/user.controller');
// const mondaySdk = require("monday-sdk-js")
// const monday = mondaySdk();

// monday.setToken(process.env.MONDAY_API);


// // apiCalls()


// async function apiCalls() {
//     // const { data: { users, boards } } = await monday.api('query { users { name, id } boards {id} }')
//     // const { id: boardId } = boards[0]
//     // const { id: userId } = users[0]
//     // console.log('apiCalls -> userId', userId)
//     // console.log('apiCalls -> boardId', boardId)
//     // // const {data} =  await monday.api(`query { boards (ids: ${boardId})`)
//     // let { data } = await monday.api(`query {boards (ids: ${boardId}) {items {id}}}`)
//     // let { items } = data.boards[0]


//     //     let to = await monday.api(`
//     //     mutation {
//     //       create_notification(
//     //         text: "I've got a notification for you!",
//     //         user_id: ${userId},
//     //         target_id: 1070970443,
//     //         target_type: Project,
//     //       ) { 
//     //         id 
//     //       }
//     //     }
//     //   `);
//     //     console.log('apiCalls -> to', to)



//     // const callback = res => console.log(res);
//     // const unsubscribe = monday.listen("events", callback);


// }



// // let query = '{boards(limit:1) { name id description items { name column_values{title id type text } } } }';

// // fetch ("https://api.monday.com/v2", {
// //   method: 'post',
// //   headers: {
// //     'Content-Type': 'application/json',
// //     'Authorization' : process.env.MONDAY_API
// //   },
// //   body: JSON.stringify({
// //     'query' : query
// //   })
// // })
// //   .then(res => res.json())
// //   .then(res => console.log(JSON.stringify(res, null, 2)));

// // emailTest()






