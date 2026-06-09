const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const productContainer =
    document.getElementById("product-detail");

async function loadProduct() {

    try {

        const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
        );

        const product = await response.json();

        productContainer.innerHTML = `
        
            <img
                src="${product.image}"
                alt="${product.title}"
            >

            <div class="product-detail-info">

                <h2>${product.title}</h2>

                <p class="product-detail-price">
                    $${product.price}
                </p>

                <p>
                    ${product.description}
                </p>

                <button
                    class="add-cart-btn"
                    id="add-cart-btn"
                >
                    Add to Cart
                </button>

            </div>
        
        `;

        const addCartBtn =
            document.getElementById("add-cart-btn");

        addCartBtn.addEventListener("click", () => {

            let cart =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];

            cart.push(product);

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            updateCartCount();

            alert("Product added to cart!");

        });

    }

    catch(error) {

        console.error(error);

    }

}

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

loadProduct();

updateCartCount();