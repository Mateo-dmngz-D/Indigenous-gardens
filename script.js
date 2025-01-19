document.addEventListener('DOMContentLoaded', () => {
  displayDebugInfo('DOM fully loaded and parsed');
  populateFilterOptions();
  loadCSVData();
});

const flowerTypes = ['All', 'Biennial', 'Perennial', 'Anual', 'Shrubs', 'Bushes'];
const flowerColors = ['All', 'Red', 'Purple', 'Orange', 'Yellow'];
const bloomPeriods = ['All', 'Spring', 'Summer', 'Autumn', 'Winter'];

function populateFilterOptions() {
  const typeSelect = document.getElementById('flower-type');
  const colorSelect = document.getElementById('flower-color');
  const bloomPeriodSelect = document.getElementById('flower-bloom_period');

  populateSelect(typeSelect, flowerTypes);
  populateSelect(colorSelect, flowerColors);
  populateSelect(bloomPeriodSelect, bloomPeriods);
}

function populateSelect(selectElement, options) {
  for(let i = 0; i < options.length; i++) {
    const option = options[i];
    const optionElement = document.createElement('option');
    optionElement.textContent = option;
    optionElement.value = option;
    selectElement.appendChild(optionElement);
  }
}

function loadCSVData() {
  fetch('flowers.csv')
    .then(response => response.text())
    .then(data => {;
      jsonData = csvToJson(data);
      populateTable(jsonData);
    })
}

function csvToJson(csvData) {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');

  const jsonResult = lines.slice(1).map(line => {
    const values = line.split(',');
    if (values.length !== headers.length) {
      return null;
    }
    const jsonObject = {};
    headers.forEach((header, index) => {
      jsonObject[header.trim()] = values[index].trim();
    });
    return jsonObject;
  }).filter(item => item !== null);

  return jsonResult;
}

function populateTable(data) {
  const tableBody = document.querySelector('#flower-table tbody');
  tableBody.innerHTML = '';

  data.forEach(flower => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${flower['Latin Name']}</td>
      <td>${flower['Common Name']}</td>
      <td>${flower['Type']}</td>
      <td>${flower['Color']}</td>
      <td>${flower['Bloom Period']}</td>
      <td><button onclick="selectFlower('${flower['Latin Name']}')">Select</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function filterFlowers(jsonData, type, color, bloomPeriod) {
  return jsonData.filter(flower => {
    const matchesType = type === 'All' || flower['Type'] === type;
    const matchesColor = color === 'All' || flower['Color'] === color;
    const matchesBloomPeriod = bloomPeriod === 'All' || flower['Bloom Period'] === bloomPeriod;
    return matchesType && matchesColor && matchesBloomPeriod;
  });
}

function updateTableWithFilters() {
  const typeSelect = document.getElementById('flower-type').value;
  const colorSelect = document.getElementById('flower-color').value;
  const bloomPeriodSelect = document.getElementById('flower-bloom_period').value;

  const filteredData = filterFlowers(jsonData, typeSelect, colorSelect, bloomPeriodSelect);
  populateTable(filteredData);
}

function selectFlower(latinName) {
  const selectedFlower = jsonData.find(flower => flower['Latin Name'] === latinName);
  if (selectedFlower) {
    document.getElementById('flower-latin-name').textContent = selectedFlower['Latin Name'];
    document.getElementById('flower-common-name').textContent = selectedFlower['Common Name'];
    document.getElementById('flower-type-info').textContent = selectedFlower['Type'];
    document.getElementById('flower-color-info').textContent = selectedFlower['Color'];
    document.getElementById('flower-bloom-period').textContent = selectedFlower['Bloom Period'];
    document.getElementById('flower-photo').src = Image.src.replace('flower-photo', selectedFlower['Photo']); 
  }
}

function displayDebugInfo(message) {
  const debugInfoDiv = document.getElementById('title-info');
  debugInfoDiv.innerHTML += `<p>${message}</p>`;
}
