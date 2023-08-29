let rightSplit = document.querySelector(".subsection-right-split-container");
function initiateCalendar() {
  // Get the calendar container
  console.log("Calendar container found");
  const calendarContainer = document.querySelector(".calendar-container");

  // HTML structure for the calendar
  calendarContainer.innerHTML = `
<div class="calendar">
  <div class="calendar-header">
    <button id="prevMonth">&lt;</button>
    <h2 id="currentMonth">Month Year</h2>
    <button id="nextMonth">&gt;</button>
  </div>
  <div class="calendar-days">
    <div class="day">Mån</div>
    <div class="day">Tis</div>
    <div class="day">Ons</div>
    <div class="day">Tor</div>
    <div class="day">Fre</div>
    <div class="day">Lör</div>
    <div class="day">Sön</div>
  </div>
  <div class="calendar-grid" id="calendarGrid"></div>
  <input
    type="text"
    id="selectedDate"
    placeholder="Selected Date"
    readonly
  />
</div>
`;

  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");
  const currentMonthHeader = document.getElementById("currentMonth");
  const calendarGrid = document.getElementById("calendarGrid");
  const selectedDateInput = document.getElementById("selectedDate");

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let currentDate = new Date();

  function updateCalendar() {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    currentMonthHeader.textContent = new Intl.DateTimeFormat("sv-SE", {
      year: "numeric",
      month: "long",
    }).format(currentDate);
    calendarGrid.innerHTML = "";

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      const emptyCell = document.createElement("div");
      calendarGrid.appendChild(emptyCell);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const dayCell = document.createElement("div");
      dayCell.classList.add("day-cell");
      dayCell.textContent = i;

      dayCell.addEventListener("click", () => {
        const selectedDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          i
        );
        selectedDateInput.value = selectedDate.toLocaleDateString("sv-SE");
        resetSelectedDate();

        // Remove the existing mail template container if it exists
        const existingMailTemplateContainer = rightSplit.querySelector(
          ".mail-template-container"
        );
        if (existingMailTemplateContainer) {
          rightSplit.removeChild(existingMailTemplateContainer);
        }
        dayCell.classList.add("selected");

        const template = `Hej!

Jag är intresserad av att hyra lokalen den ${selectedDate.toLocaleDateString(
          "sv-SE"
        )}, och enligt nedan specifikationer:
        
Deltagarantal: 
Tid:
Beskrivning: 
Särskilda önskemål: 

Tack på förhand!`;

        // Create the mail template container
        const mailTemplateContainer = document.createElement("div");
        mailTemplateContainer.classList.add("mail-template-container");

        // Create the mail template text input
        const mailTemplateInput = document.createElement("textarea");
        mailTemplateInput.value = template;

        // Append the mail template input to the mail template container
        mailTemplateContainer.appendChild(mailTemplateInput);

        // Create the "Uppgifter till kontaktperson" (Contact person information) box
        const addInfoBox = document.createElement("div");
        addInfoBox.classList.add("add-info-box");

        // Create input fields for Namn, Telefon, and Mail
        const namnInput = document.createElement("input");
        namnInput.id = "contactName";
        namnInput.type = "text";
        namnInput.placeholder = "Kontaktpersonens namn";

        const telefonInput = document.createElement("input");
        telefonInput.id = "contactPhone";
        telefonInput.type = "tel";
        telefonInput.placeholder = "Kontaktpersonens telefonnummer";

        const mailInput = document.createElement("input");
        mailInput.id = "contactMail";
        mailInput.type = "email";
        mailInput.placeholder = "Kontaktpersonens e-postadress";

        // Create input headers for Namn, Telefon, and Mail
        const namnInputHeader = document.createElement("p");
        namnInputHeader.classList.add("input-header");
        namnInputHeader.textContent = "Namn:";

        const telefonInputHeader = document.createElement("p");
        telefonInputHeader.classList.add("input-header");
        telefonInputHeader.textContent = "Telefon:";

        const mailInputHeader = document.createElement("p");
        mailInputHeader.classList.add("input-header");
        mailInputHeader.textContent = "Mail:";

        // Append input fields and headers to the addInfoBox
        addInfoBox.appendChild(namnInputHeader);
        addInfoBox.appendChild(namnInput);
        addInfoBox.appendChild(telefonInputHeader);
        addInfoBox.appendChild(telefonInput);
        addInfoBox.appendChild(mailInputHeader);
        addInfoBox.appendChild(mailInput);
        mailTemplateContainer.appendChild(addInfoBox);

        // Create the "Skicka förfrågan" (Send Inquiry) button
        const sendButton = document.createElement("button");
        sendButton.textContent = "Skicka förfrågan";
        sendButton.classList.add("search-button");
        sendButton.classList.add("continue-button");
        mailTemplateContainer.appendChild(sendButton);

        // Append the mail template container to the right split
        rightSplit.appendChild(mailTemplateContainer);
      });

      calendarGrid.appendChild(dayCell);
    }
  }

  function resetSelectedDate() {
    const selectedCells = document.querySelectorAll(".day-cell.selected");
    selectedCells.forEach((cell) => {
      cell.classList.remove("selected");
    });
  }

  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
  });

  updateCalendar();
}

initiateCalendar();
