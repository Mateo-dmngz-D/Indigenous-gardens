document.addEventListener('DOMContentLoaded', () => {
  populateFilterOptions();
  loadCSVData();
});

const flowerTypes = ['All', 'Biennials', 'Perennials'];
const flowerColors = ['All', 'Red', 'Purple', 'Orange', 'Yellow'];
const bloomPeriods = ['All', 'Spring', 'Summer', 'Autumn', 'Winter'];

let flowersData = [];

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

function loadCSVData() {
  fetch('flowers.csv')
      .then(response => response.text())
      .then(data => {
          flowersData = csvToJson(data);
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

function filterFlowers() {
  const type = document.getElementById('flower-type').value;
  const color = document.getElementById('flower-color').value;
  const bloomPeriod = document.getElementById('flower-bloom_period').value;

  const filteredFlowers = flowersData.filter(flower => 
      flower.Type === type && 
      flower.Color === color && 
      flower.BloomPeriod === bloomPeriod
  );

  displayFilteredFlowers(filteredFlowers);
}

function displayFilteredFlowers(flowers) {
  const tableBody = document.getElementById('flower-table').querySelector('tbody');
  tableBody.innerHTML = '';

  flowers.forEach(flower => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${flower.Type}</td>
          <td>${flower.LatinName}</td>
          <td>${flower.CommonName}</td>
          <td>${flower.Color}</td>
          <td>${flower.BloomPeriod}</td>
          <td><button onclick="displayFlowerInfo('${flower.LatinName}')">Select</button></td>
      `;
      tableBody.appendChild(row);
  });
}

function displayFlowerInfo(latinName) {
  const flower = flowersData.find(flower => flower.LatinName === latinName);
  const flowerInfoDiv = document.getElementById('flower-info');
  flowerInfoDiv.innerHTML = `
      <h3>Type: ${flower.Type}</h3>
      <p>Latin Name: ${flower.LatinName}</p>
      <p>Common Name: ${flower.CommonName}</p>
      <p>Color: ${flower.Color}</p>
      <p>Bloom Period: ${flower.BloomPeriod}</p>
      <img src="${flower.Photo}" alt="${flower.CommonName}">
  `;
}
