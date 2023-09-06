document.getElementById("showAll").addEventListener("click", function () {
  // Show overlay
  document.getElementById("showAllOverlay").style.display = "block";
  document.getElementById("hideGrid").style.display = "flex";

  // Hide 'imageSection'
  /*  document.getElementById("imageSection").style.display = "none"; */

  // Show 'showAllGrid'
  document.getElementById("showAllGrid").style.display = "grid";
});

document.getElementById("hideGrid").addEventListener("click", function () {
  // Show overlay
  document.getElementById("showAllOverlay").style.display = "none";
  document.getElementById("hideGrid").style.display = "none";

  // Hide 'imageSection'
  /*  document.getElementById("imageSection").style.display = "none"; */

  // Show 'showAllGrid'
  document.getElementById("showAllGrid").style.display = "none";
});
