exports.handler = async function (event, context) {
  const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

  return {
    statusCode: 200,
    body: JSON.stringify(firebaseConfig),
  };
};
