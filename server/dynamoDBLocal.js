const dynamoose = require('dynamoose');
const dynalite = require('dynalite');

const createDynamooseInstance = () => {
  dynamoose.AWS.config.update({
    region: process.env.AWS_REGION,
  });
};


const setupAndStartDynamoLocal = async () => {
  const dynaliteServer = dynalite({ path: `${__dirname}/DB` });
  await dynaliteServer.listen(7500);
  dynamoose.local();
};

setupAndStartDynamoLocal();
