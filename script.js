// Function to load CSV and convert to JSON
async function loadCSV() {
  try {
    const response = await fetch('flowers.csv');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const csvText = await response.text();
    return csvToJSON(csvText);
  } catch (error) {
    console.error('Error loading CSV:', error);
    return [];
  }
}

// Function to convert CSV to JSON
function csvToJSON(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  const jsonData = lines.slice(1).map(line => {
    const data = line.split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = data[index].trim();
    });
    return obj;
  });
  return jsonData;
}

// Function to filter flowers and update the table
async function filterFlowers() {
  const type = document.getElementById('flower-type').value;
  const color = document.getElementById('flower-color').value;
  const flowers = await loadCSV();

  console.log('Loaded flowers:', flowers);

  const filteredFlowers = flowers.filter(flower => {
    return (type === 'all' || flower.Type.toLowerCase() === type) &&
           (color === 'all' || flower.Color.toLowerCase() === color);
  });

  console.log('Filtered flowers:', filteredFlowers);

  const tableBody = document.getElementById('flower-table').querySelector('tbody');
  tableBody.innerHTML = '';

  filteredFlowers.forEach(flower => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${flower.Type}</td>
      <td>${flower['Latin Name']}</td>
      <td>${flower['Common Name']}</td>
      <td>${flower.Color}</td>
      <td>${flower['Bloom Period']}</td>
      <td><img src="${flower.Photo}" alt="${flower['Common Name']}" style="max-width: 100px;"></td>
    `;
    row.addEventListener('click', () => displayFlowerInfo(flower));
    tableBody.appendChild(row);
  });
}

// Function to display flower information
function displayFlowerInfo(flower) {
  const flowerInfo = document.getElementById('flower-info');
  flowerInfo.innerHTML = `
    <h3>Type: ${flower.Type}</h3>
    <p>Latin Name: ${flower['Latin Name']}</p>
    <p>Common Name: ${flower['Common Name']}</p>
    <p>Color: ${flower.Color}</p>
    <p>Bloom Period: ${flower['Bloom Period']}</p>
    <img src="${flower.Photo}" alt="${flower['Common Name']}" style="max-width: 100%;">
  `;
}

// Initial load of flowers
filterFlowers();
