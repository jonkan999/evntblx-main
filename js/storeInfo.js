const continueButton = document.getElementById("continueButton");
continueButton.addEventListener("click", function () {
  localStorage.removeItem("venueInfo");
  let venueInfo;
  if (document.querySelector("#soundF")) {
    /* party */
    venueInfo = {
      name: document.querySelector("#name").value.replace(/\//g, "-"),
      description: document
        .querySelector("#description")
        .value.replace(/\n/g, "\\n"), // Replace line breaks with "\\n"
      address: document.querySelector("#address").value,
      size: document.querySelector("#size").value,
      seated: document.querySelector("#seated").value,
      standing: document.querySelector("#standing").value,
      checkout: document.querySelector("#checkout").value,
      ownFoodF: document.querySelector("#ownFoodF").checked,
      ownDrinkF: document.querySelector("#ownDrinkF").checked,
      soundF: document.querySelector("#soundF").checked,
      micsF: document.querySelector("#micsF").checked,
      projectorF: document.querySelector("#projectorF").checked,
      discoLightsF: document.querySelector("#discoLightsF").checked,
      contactName: document.querySelector("#contactName").value,
      contactPhone: document.querySelector("#contactPhone").value,
      contactMail: document.querySelector("#contactMail").value,
      startingPrice: document.querySelector("#startingPrice").value,
    };
  } else if (document.querySelector("#yogamattsF")) {
    console.log("yoga");
    /* yoga */
    venueInfo = {
      venueType: "yoga",
      name: document.querySelector("#name").value.replace(/\//g, "-"),
      description: document
        .querySelector("#description")
        .value.replace(/\n/g, "\\n"), // Replace line breaks with "\\n"
      address: document.querySelector("#address").value,
      size: document.querySelector("#size").value,
      seated: document.querySelector("#seated").value,
      ownFoodF: document.querySelector("#ownFoodF").checked,
      ownDrinkF: document.querySelector("#ownDrinkF").checked,
      yogamattsF: document.querySelector("#yogamattsF").checked,
      showerF: document.querySelector("#showerF").checked,
      kitchenF: document.querySelector("#kitchenF").checked,
      dressingroomF: document.querySelector("#dressingroomF").checked,
      contactName: document.querySelector("#contactName").value,
      contactPhone: document.querySelector("#contactPhone").value,
      contactMail: document.querySelector("#contactMail").value,
      startingPrice: document.querySelector("#startingPrice").value,
    };
  }
  // Convert venueInfo object to JSON
  const venueInfoJSON = JSON.stringify(venueInfo);

  // Store venueInfoJSON in local storage
  localStorage.setItem("venueInfo", venueInfoJSON);
});
