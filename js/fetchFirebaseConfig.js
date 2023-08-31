export async function fetchBotResponse(userInput) {
  let url;

  if (window.location.host === "evntblx.netlify.app") {
    url = "https://evntblx.netlify.app/.netlify/functions/getBotResponse";
  } else if (window.location.host === "combis.se") {
    url = "https://evntblx.se/.netlify/functions/getBotResponse";
  } else {
    throw new Error("Unsupported domain");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userInput }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.text();
}
