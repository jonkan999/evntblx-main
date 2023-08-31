exports.handler = async function (event, context) {
  const firebaseConfig = process.env.FIREBASE_CONFIG;

  return {
    statusCode: 200,
    body: JSON.stringify(firebaseConfig), // Convert to JSON string
  };
};
