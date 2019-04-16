const esConnection = require('./connection')
const WebSocket = require('ws');

/** Clear ES index */
async function readAndInsertTransaction () {
    console.log("Mash")
  try {
    // Clear previous ES index
    // await esConnection.resetIndex()

    // Read data from WebSocket API 
    const ws = new WebSocket(" wss://ws.blockchain.info/inv");
    ws.onopen = function(){
        ws.send('{"op":"unconfirmed_sub"}');
    };

    // Read each message, and index each transaction in elasticsearch

    ws.onmessage = function(event) { 
        const msgData = JSON.parse(event.data);
        if (msgData.op == 'utx'){
          const txHash = msgData.x.hash;
          const outputs = msgData.x.out; 
            var totalTxValue = 0;               
            for(var j=0;j<outputs.length;j++){
                  var output = outputs[j];
              totalTxValue += output.value;
              }
            totalTxValue /= 100000000;             
          var newTx = {id:txHash, value: totalTxValue};
          insertData(txHash, totalTxValue)
          console.log(newTx)
        }
      };                
  } catch (err) {
    console.error(err)
  }
}
readAndInsertTransaction()



/** Bulk index the transaction data in Elasticsearch */
async function insertData (txHash, TxValue) {
    let bulkOps = [] // Array to store bulk operations
  
      // Describe action
      bulkOps.push({ index: { _index: esConnection.index, _type: esConnection.type } })
  
      // Add document
      bulkOps.push({
        txHash,
        TxValue
      })
  
    // Insert remainder of bulk ops array
    await esConnection.client.bulk({ body: bulkOps })
  }