document.addEventListener('DOMContentLoaded', () => {
  populateFilterOptions();
  loadCSVData();
});

const flowerTypes = ['All', 'Biennials', 'Perennials'];
const flowerColors = ['All', 'Red', 'Purple', 'Orange', 'Yellow'];
const bloomPeriods = ['All', 'Spring', 'Summer', 'Autumn', 'Winter'];

let flowerData = [];

function loadCSVData() {
  fetch('flowers.csv')
      .then(response => response.text())
      .then(data => {
          flowerData = csvToJson(data);
      });
}

function csvToJson(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
          obj[header.trim()] = values[index].trim();
          return obj;
      }, {});
  });
}

function populateFilterOptions() {
  const typeSelect = document.getElementById('flower-type');
  const colorSelect = document.getElementById('flower-color');
  const bloomPeriodSelect = document.getElementById('flower-bloom_period');

  flowerTypes.forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      typeSelect.appendChild(option);
  });

  flowerColors.forEach(color => {
      const option = document.createElement('option');
      option.value = color;
      option.textContent = color;
      colorSelect.appendChild(option);
  });

  bloomPeriods.forEach(period => {
      const option = document.createElement('option');
      option.value = period;
      option.textContent = period;
      bloomPeriodSelect.appendChild(option);
  });
}



function displayFirstFlower() {
  if (flowerData.length > 0) {
    const firstFlower = flowerData[0];
    const tableBody = document.querySelector('#flower-table tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${firstFlower['Type']}</td>
        <td>${firstFlower['Latin Name']}</td>
        <td>${firstFlower['Common Name']}</td>
        <td>${firstFlower['Color']}</td>
        <td>${firstFlower['Bloom Period']}</td>
        <td><img src="${firstFlower['Photo']}" alt="${firstFlower['Common Name']}" width="50"></td>
    `;

      tableBody.appendChild(row);
  }
}

console.log(5);
