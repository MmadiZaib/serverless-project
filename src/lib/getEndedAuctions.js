const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function getEndedAuctions() {
    const now = new Date();


    const params = {
        TableName: process.env.AUCTIONS_TABLE_NAME,
        IndexName: 'statusAndEndDate',
        KeyConditionExpression: '#status = :status AND endingAt <= :now',
        ExpressionAttributeNames: {
            '#status': 'status',
        },
        ExpressionAttributeValues: {
            ':status': 'OPEN',
            ':now': now.toISOString(),
        },
    };


    const result = await dynamoDb.query(params).promise();

    return result.Items;
}