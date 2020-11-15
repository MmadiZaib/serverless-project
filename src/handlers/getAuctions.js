import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';


const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();


async function getAuctions(event, context) {
  let auctions;

  try {
    const result = await dynamoDb.scan({ 
      TableName: process.env.AUCTIONS_TABLE_NAME
    }).promise();

    auctions = result.Items;
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ auctions }),
  };
}

export const handler = commonMiddleware(getAuctions);

