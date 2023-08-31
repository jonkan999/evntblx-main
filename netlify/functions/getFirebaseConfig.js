exports.handler = async function (event, context) {
  const firebaseConfig = process.env.FIREBASE_CONFIG;
  console.log(firebaseConfig);
  return {
    statusCode: 200,
    body: firebaseConfig,
  };
};
