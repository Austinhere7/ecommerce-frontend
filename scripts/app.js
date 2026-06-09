const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

const productGrid = document.getElementById("product-grid");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");

async function loadProducts() {

    if (!productGrid) return;

    try {

        if (loading) {
            loading.style.display = "block";
        }

        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        if (loading) {
            loading.style.display = "none";
        }

        products.forEach(product => {

            const card = document.createElement("div");

            card.classList.add("product-card");

            card.style.cursor = "pointer";

            card.addEventListener("click", () => {
                window.location.href =
                    `products.html?id=${product.id}`;
            });

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

                    <p>
                        ${product.description.substring(0, 80)}...
                    </p>

                    <button class="add-cart-btn">
                        Add to Cart
                    </button>

                </div>
            `;

            productGrid.appendChild(card);

        });

    } catch (error) {

        if (loading) {
            loading.style.display = "none";
        }

        if (errorMessage) {
            errorMessage.textContent =
                "Unable to load products. Please try again later.";
        }

        console.error(error);
    }
}

loadProducts();

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const cartCount =
        document.querySelector(".cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

}

updateCartCount();