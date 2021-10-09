const URL = "http:localhost:3000/user";

const [form] = document.getElementsByTagName("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // ids of the inputs to get the information required
  const idsInputs = [
    "name",
    "email",
    "password",
    "birth-day",
    "birth-month",
    "birth-year",
    "card-number",
    "card-cvc",
    "card-month",
    "card-year",
  ];

  // elements of the DOM, got by ids
  const elements = idsInputs.map((id) => document.getElementById(id));

  // values from the elements of the DOM (ids)
  const values = elements.map((element) => element.value);

  const body = { birth: {}, card: {} };

  // Creation of the body dinamically
  idsInputs.forEach((id, index) => {
    const splitted = id.split("-");
    if (splitted.length > 1) {
      const [left, right] = splitted;
      body[left][right] = values[index];
    } else {
      body[id] = values[index];
    }
  });

  // Send information to the backend via fetch API
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch(URL, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      alert("Se la información en el servidor");
    })
    .catch((error) => {
      alert("No se puso nombre");
      console.error(error);
    });
});
