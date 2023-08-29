const continueButton = document.getElementById("continueButton");
continueButton.addEventListener("click", function () {
  localStorage.removeItem("venueInfo");
  const venueInfo = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    address: document.querySelector("#address").value,
    size: document.querySelector("#size").value,
    seated: document.querySelector("#seated").value,
    standing: document.querySelector("#standing").value,
    checkout: document.querySelector("#checkout").value,
    ownFoodF: document.querySelector("#ownFoodF").value,
    ownDrinkF: document.querySelector("#ownDrinkF").value,
    soundF: document.querySelector("#soundF").value,
    micsF: document.querySelector("#micsF").value,
    projectorF: document.querySelector("#projectorF").value,
    discoLightsF: document.querySelector("#discoLightsF").value,
    contactName: document.querySelector("#contactName").value,
    contactPhone: document.querySelector("#contactPhone").value,
    contactMail: document.querySelector("#contactMail").value,
    startingPrice: document.querySelector("#startingPrice").value,
  };

  // Convert venueInfo object to JSON
  const venueInfoJSON = JSON.stringify(venueInfo);

  // Store venueInfoJSON in local storage
  localStorage.setItem("venueInfo", venueInfoJSON);
});
