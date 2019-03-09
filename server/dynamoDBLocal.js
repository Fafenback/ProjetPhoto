const dynamoose = require('dynamoose');
const dynalite = require('dynalite');

const createDynamooseInstance = () => {
  dynamoose.AWS.config.update({
    region: process.env.AWS_REGION,
  });
};


const setupAndStartDynamoLocal = async () => {
  const dynaliteServer = dynalite();
  await dynaliteServer.listen(8000);
  dynamoose.local();
};

setupAndStartDynamoLocal();
