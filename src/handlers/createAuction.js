import { v4 as uuid} from 'uuid';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';


const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();


async function createAuction(event, context) {

  const {title} = event.body;
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(), //standard way to store date in database
    highestBid: {
      amount: 0,
    }
  };

  try {
    await dynamoDb.put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auction,
    }).promise();
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify({ auction }),
  };
}

export const handler = commonMiddleware(createAuction);

