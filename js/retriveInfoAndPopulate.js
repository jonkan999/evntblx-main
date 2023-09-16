document.addEventListener("DOMContentLoaded", function () {
  const venueInfoJSON = localStorage.getItem("venueInfo");

  if (venueInfoJSON) {
    const venueInfo = JSON.parse(venueInfoJSON);

    document.querySelector("#name").value = venueInfo.name;
    document.querySelector("#description").value =
      venueInfo.description.replace(/\\n/g, "\n"); // Replace "\\n" with actual line breaks
    document.querySelector("#address").value = venueInfo.address;
    document.querySelector("#size").value = venueInfo.size;
    document.querySelector("#seated").value = venueInfo.seated;
    document.querySelector("#standing").value = venueInfo.standing;
    document.querySelector("#checkout").value = venueInfo.checkout;
    document.querySelector("#ownFoodF").checked = venueInfo.ownFoodF;
    document.querySelector("#ownDrinkF").checked = venueInfo.ownDrinkF;
    document.querySelector("#soundF").checked = venueInfo.soundF;
    document.querySelector("#micsF").checked = venueInfo.micsF;
    document.querySelector("#projectorF").checked = venueInfo.projectorF;
    document.querySelector("#discoLightsF").checked = venueInfo.discoLightsF;
    document.querySelector("#contactName").value = venueInfo.contactName;
    document.querySelector("#contactPhone").value = venueInfo.contactPhone;
    document.querySelector("#contactMail").value = venueInfo.contactMail;
    document.querySelector("#startingPrice").value = venueInfo.startingPrice;
  }
});
