const MongoClient = require('mongodb').MongoClient;

exports.getUsers = async (req, res) => {
    const mongoUri = process.env.MONGO_URI;
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('grip');
    const data = await db.collection('accounts').find().toArray();
    if(data){
        data.forEach((item) => {
            delete item.currentBalance;
        })
        res.status(200).json({
            status: 'success',
            message: 'Data found',
            data: data
        })
    }
    else{
        res.status(404).json({
            status: 'fail',
            message: 'No data found'
        })
    }
    client.close();
}

exports.getBalance = async (req, res) => {
    const mongoUri = process.env.MONGO_URI;
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('grip');
    const balance = await db.collection('accounts').findOne({accountNumber: req.params.accountNumber});
    if(balance){
        res.status(200).json({
            status: 'success',
            message: 'Balance found',
            balance: balance.currentBalance
        })
    }
    else{
        res.status(404).json({
            status: 'fail',
            message: 'No balance found'
        })
    }
    client.close();
}
async function TransferRecord(senderAmountBefore,senderAmountAfter, receiverAmountBefore,receiverAmountAfter, senderAccountNumber, senderAccountName, receiverAccountNumber, receiverAccountName, amount){
    const mongoUri = process.env.MONGO_URI;
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('grip');

    try{
        const session = client.startSession();
        session.startTransaction();
        db.collection('transferRecords').insertOne({
            senderAccountNumber: senderAccountNumber,
            senderAccountName: senderAccountName,
            receiverAccountNumber: receiverAccountNumber,
            receiverAccountName: receiverAccountName,
            transactionAmount: amount,
            Before:[{
                senderCurrentBalance: senderAmountBefore,
                receiverCurrentBalance: receiverAmountBefore
            }],
            After:[{
                senderCurrentBalance: senderAmountAfter,
                receiverCurrentBalance: receiverAmountAfter
            }],
            timestamp: new Date()

        });
        session.commitTransaction();

    }
    catch(err){
        session.abortTransaction();
        console.log(err);
    }



    
}

exports.transfer = async (req, res) => {
    const mongoUri = process.env.MONGO_URI;
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('grip');
    const{senderAccountNumber,senderName,receiverName, receiverAccountNumber} = req.body;
    try{
        const sender = await db.collection('accounts').findOne({accountNumber: senderAccountNumber, name: senderName});
        if(sender){
            const senderAmountBefore = sender.currentBalance;
            try{
                const receiver = await db.collection('accounts').findOne({accountNumber: receiverAccountNumber, name: receiverName});
                const receiverAmountBefore = receiver.currentBalance;
                if (receiver){
                    let amount = parseInt(req.body.amount);
                    const session = client.startSession();
                    if(sender.currentBalance>amount){                        
                        session.startTransaction();
                        await db.collection('accounts').findOneAndUpdate({accountNumber: senderAccountNumber},{$inc: {currentBalance: -amount}});
                        await db.collection('accounts').findOneAndUpdate({accountNumber: receiverAccountNumber},{$inc: {currentBalance: amount}});
                        session.commitTransaction();
                        const senderAmountAfter = senderAmountBefore - amount;
                        const receiverAmountAfter = receiverAmountBefore + amount;
                        TransferRecord(senderAmountBefore,senderAmountAfter, receiverAmountBefore,receiverAmountAfter, senderAccountNumber, senderName, receiverAccountNumber, receiverName, amount);
                        res.status(200).json({
                            status: 'success',
                            message: 'Transaction successful'
                        })
                    }
                    else{
                        return res.status(404).json({
                            status: 'fail',
                            message: 'Insufficient balance'
                        })
                    }
                }
                else{
                    return res.status(404).json({
                        status: 'fail',
                        message: 'receiver account does not exist'
                        
                    })
                }
            }
            catch(err){
                console.log(err);
                res.status(404).json({
                    status: 'fail',
                    message: 'No receiver found',
                    error: err
                })
            }

        }
        else{
            return res.status(404).json({
                status: 'fail',
                message: 'sender account does not exist'
            })
        }
    }
    catch(err){
        session.abortTransaction();
        res.status(404).json({
            status: 'fail',
            message: 'No sender found'
        })
    }


}

