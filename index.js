function getCarBrands() {
    const url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';
  
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => resolve(data))  // Successfully resolved promise with data
        .catch(error => reject(error));  // Reject promise in case of an error
    });
  }
  
  // Example usage: Display car brands on page load
  document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.getElementById('result');
  
    getCarBrands()
      .then(data => {
        // Clear the result div and create a Bootstrap-styled list
        const brandList = document.createElement('ul');
        brandList.classList.add('list-group');
        
        data.forEach(brand => {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item', 'list-group-item-primary');
          listItem.textContent = brand.nome;
          brandList.appendChild(listItem);
        });
  
        resultDiv.innerHTML = '';  // Clear loading text
        resultDiv.appendChild(brandList);  // Append the list to the result div
      })
      .catch(error => {
        resultDiv.textContent = `Error: ${error.message}`;
        resultDiv.classList.remove('alert-info');
        resultDiv.classList.add('alert-danger');
      });
  });
  