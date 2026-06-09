// Mobile Navigation

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Product Grid

const productGrid = document.getElementById("product-grid");

async function loadProducts() {

    try {

        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        const products = await response.json();

        products.forEach(product => {

            const card = document.createElement("div");

            card.classList.add("product-card");

            card.innerHTML = `
                <img 
                    src="${product.image}" 
                    alt="${product.title}"
                    loading="lazy"
                >

                <div class="product-info">

                    <h3>${product.title}</h3>

                    <p class="product-price">
                        $${product.price}
                    </p>

                    <button class="add-cart-btn">
                        Add to Cart
                    </button>

                </div>
            `;

            productGrid.appendChild(card);

        });

    }

    catch(error) {

        console.error(
            "Error loading products:",
            error
        );

    }

}

loadProducts();