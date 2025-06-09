const container = document.querySelector(".container");
const categories = document.getElementById("categories");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const errorContainer = document.getElementById("error-container");

const getUser = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userNameElement = document.getElementById("userName");
  if (user && user.name) {
    userNameElement.textContent = `Welcome back ${user.name}`;
  } else {
    console.log("Något gick fel och vi hittade användarnamnet");
    alert(
      "Vi hittade tyvärr inte ditt användarnamn idag, du är fortfarande lika välkommen tillbaka dock!"
    );
  }
};
const getCategories = async () => {
  try {
    console.log("Nu startar API-anropet");

    const categoriesResponse = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    if (!categoriesResponse.ok) {
      throw new Error("Kategorierna kunde inte laddas");
    }

    const categoriesList = await categoriesResponse.json();
    categories.innerHTML = "";

    const chooseCategory = document.createElement("option");
    chooseCategory.value = "";
    chooseCategory.textContent = "Alla kategorier";
    categories.appendChild(chooseCategory);

    categoriesList.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categories.appendChild(option);
    });

    const allProducts = await getProducts();
    displayProducts(allProducts);
  } catch (error) {
    console.error(error);
    displayErrorMessage(
      "Tyvärr gick något fel när vi försökte hämta produkterna. Försök igen senare"
    );
    return [];
  }
};

const getProductsByCategory = async (category) => {
  try {
    console.log("Nu startar API-anropet");
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    if (!response.ok) {
      alert(
        "Kunde inte hämta prudukterna i vald kategori, vänligen försök igen om ett tag"
      );
      throw new Error(
        "Kunde inte hämta prudukterna i vald kategori, vänligen försök igen om ett tag."
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Något gick på tok: ", error);
    displayErrorMessage(
      "Kunde inte hämta prudukterna i vald kategori, vänligen försök igen om ett tag."
    );
    return [];
  }
};

const getProducts = async () => {
  try {
    console.log("Nu startar API-anropet");
    const productResponse = await fetch("https://fakestoreapi.com/products");
    if (!productResponse.ok) {
      throw new Error("Något gick fel vid hämtningen av produkter.");
    }

    const products = await productResponse.json();
    return products;
  } catch (error) {
    console.error("Något gick fel vid hämtningen av produkter.", error);
    displayErrorMessage(
      "Tyvärr gick något fel när vi försökte hämta produkterna. Försök igen senare"
    );
    return [];
  }
};

const getProductsByName = async () => {
  try {
    console.log("Nu startar API-anropet");
    const response = await fetch("https://fakestoreapi.com/products");

    if (response.ok) {
      const data = await response.json();

      const searchProduct = searchInput.value.trim();
      const filteredProducts = data.filter((product) =>
        product.title.toLowerCase().includes(searchProduct.toLowerCase())
      );
      if (filteredProducts.length > 0) {
        displayProducts(filteredProducts);
        if (!response.ok) {
          throw new Error("Kunde inte hitta produkten.");
        }
      } else {
        alert(
          "Tyvärr finns det inga produkter som matchar din sökning, vänligen försök igen."
        );
        container.innerHTML = "";
      }
    } else {
      throw new Error(`Något gick fel vid API-anropet: ${response.status}`);
    }
  } catch (error) {
    console.error("Något gick fel: ", error);
    displayErrorMessage(
      "Tyvärr gick något fel när vi försökte sökte efter produkterna. Försök igen senare."
    );
  }
};

const displayProducts = (products) => {
  container.innerHTML = "";

  if (!products || products.length === 0) {
    displayErrorMessage("Det finns tyvärr inga produkter att visa.");
    return;
  }
  products.forEach((product) => {
    const card = document.createElement("section");
    card.classList.add("card");

    const title = document.createElement("h2");
    title.textContent = product.title;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.textContent = `Pris: $${product.price}`;

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;
    image.style.maxWidth = "200px";

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(image);

    container.appendChild(card);
  });
};

const displayErrorMessage = (message) => {
  errorContainer.textContent = message;
  errorContainer.style.color = "red";
};

searchButton.addEventListener("click", async () => {
  try {
    console.clear();
    await getProductsByName();
  } catch (error) {
    console.error("Något gick fel vid sökningen: ", error);
    displayErrorMessage(
      "Något gick fel när vi försökte söka efter produkter. Försök igen om ett tag."
    );
  }
});

searchInput.addEventListener("input", async () => {
  try {
    if (searchInput.value.trim() === "") {
      const allProducts = await getProducts();
      displayProducts(allProducts);
    }
  } catch (error) {
    console.error("Något gick fel vid sökningen: ", error);
    displayErrorMessage(
      "Något gick fel när vi försökte söka efter produkter. Försök igen om ett tag."
    );
  }
});

categories.addEventListener("change", async (e) => {
  const selectedCategory = e.target.value;
  try {
    if (selectedCategory) {
      const products = await getProductsByCategory(selectedCategory);
      displayProducts(products);
    } else {
      const allProducts = await getProducts();
      displayProducts(allProducts);
    }
  } catch (error) {
    console.error("Något gick fel vid sökningen: ", error);
    displayErrorMessage(
      "Något gick fel när vi försökte söka efter produkter. Försök igen om ett tag."
    );
  }
});

getCategories();
getUser();
