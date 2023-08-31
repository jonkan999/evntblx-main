exports.handler = async function (event, context) {
  const firebaseConfig = process.env.FIREBASE_CONFIG;

  return {
    statusCode: 200,
    body: firebaseConfig,
  };
};
