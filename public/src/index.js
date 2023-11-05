const unsplashAccessKey = '9aDqqrnpcnli8Bt1gvOWNSu6k5IOpfzKtHDIKggIfZw';
const menuContainer = document.getElementById('menuContainer');

fetch('http://localhost:3000/menu')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');

      // Fetch images from Unsplash API based on the dish name
      fetch(`https://api.unsplash.com/search/photos?query=${item.dish_name}&client_id=${unsplashAccessKey}`)
        .then(response => response.json())
        .then(imagesData => {
          const image = document.createElement('img');
          image.src = imagesData.results[0].urls.small;
          image.alt = item.dish_name;
          menuItem.appendChild(image);

          const dishName = document.createElement('h2');
          dishName.textContent = item.dish_name;
          menuItem.appendChild(dishName);

          const description = document.createElement('p');
          description.textContent = item.description;
          menuItem.appendChild(description);

          const price = document.createElement('p');
          price.textContent = `Price: $${item.price}`;
          menuItem.appendChild(price);

          const cuisine = document.createElement('p');
          cuisine.textContent = `Cuisine: ${item.cuisine}`;
          menuItem.appendChild(cuisine);

          menuContainer.appendChild(menuItem);
        })
        .catch(error => {
          console.error('Error fetching images:', error);
        });
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
