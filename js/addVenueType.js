document.getElementById("onboardingButton").onclick = function () {
  var eventType = document.getElementById("eventType").value;

  if (eventType === "fest") {
    window.location.href = "/add-space/add-info.html";
  } else if (eventType === "yoga") {
    window.location.href = "/add-space/add-info-" + eventType + ".html";
  }
};
