// Fetch car data from the local database
async function fetchCarData() {
  try {
    const response = await fetch('db.json');
    const data = await response.json();
    return data.cars;
  } catch (error) {
    console.log('Error fetching car data:', error);
    return [];
  }
}

// Calculate rental price
function calculateRentalPrice(car, days) {
  return car.pricePerDay * days;
}

// Populate car options
async function populateCarOptions() {
  const cars = await fetchCarData();
  const carSelect = document.getElementById("car");
  cars.forEach(car => {
    const option = document.createElement("option");
    option.value = car.id;
    option.text = car.name;
    carSelect.appendChild(option);
  });
}

// Handle form submission
const rentalForm = document.getElementById("rentalForm");
rentalForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const carId = document.getElementById("car").value;
  const days = document.getElementById("days").value;

  // Perform validation
  const errorContainer = document.getElementById("error");
  errorContainer.textContent = "";
  if (!name || !carId || !days) {
    errorContainer.textContent = "Please fill in all fields.";
    return;
  }

  // Fetch car details
  const cars = await fetchCarData();
  const selectedCar = cars.find(car => car.id === Number(carId));
  if (!selectedCar) {
    errorContainer.textContent = "Invalid car selection.";
    return;
  }

  // Process rental
  const totalPrice = calculateRentalPrice(selectedCar, days);

  // Display rental information
  const rentalInfo = `Dear ${name}, you have rented ${selectedCar.name} for ${days} days. The total price is $${totalPrice}.`;
  alert(rentalInfo);

  // Reset form
  rentalForm.reset();
});

// Call the function to populate car options
populateCarOptions();
