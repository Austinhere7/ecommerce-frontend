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
                id="product-image"
                src="${product.image}"
                alt="${product.title}"
            >

            <div class="product-detail-info">

                <h2>${product.title}</h2>

                <p
                    class="product-detail-price"
                    id="product-price"
                >
                    $${product.price}
                </p>

                <p>
                    ${product.description}
                </p>

                <div class="variation-group">

                    <label for="size-select">
                        Size:
                    </label>

                    <select id="size-select">

                        <option value="Small">
                            Small
                        </option>

                        <option value="Medium" selected>
                            Medium
                        </option>

                        <option value="Large">
                            Large
                        </option>

                    </select>

                </div>

                <div class="variation-group">

                    <label for="color-select">
                        Color:
                    </label>

                    <select id="color-select">

                        <option value="Black">
                            Black
                        </option>

                        <option value="Blue">
                            Blue
                        </option>

                        <option value="Red">
                            Red
                        </option>

                    </select>

                </div>

                <div class="quantity-selector">

                    <button id="decrease-btn">
                        -
                    </button>

                    <span id="quantity">
                        1
                    </span>

                    <button id="increase-btn">
                        +
                    </button>

                </div>

                <button
                    class="add-cart-btn"
                    id="add-cart-btn"
                >
                    Add to Cart
                </button>

                <p id="success-message"></p>

            </div>
        
        `;

        const addCartBtn =
            document.getElementById("add-cart-btn");

        const quantityDisplay =
            document.getElementById("quantity");

        const increaseBtn =
            document.getElementById("increase-btn");

        const decreaseBtn =
            document.getElementById("decrease-btn");

        const priceDisplay =
            document.getElementById("product-price");

        const sizeSelect =
            document.getElementById("size-select");

        const colorSelect =
            document.getElementById("color-select");

        const successMessage =
            document.getElementById("success-message");

        let quantity = 1;

        increaseBtn.addEventListener("click", () => {

            quantity++;

            quantityDisplay.textContent =
                quantity;

            priceDisplay.textContent =
                "$" +
                (product.price * quantity).toFixed(2);

        });

        decreaseBtn.addEventListener("click", () => {

            if (quantity > 1) {

                quantity--;

                quantityDisplay.textContent =
                    quantity;

                priceDisplay.textContent =
                    "$" +
                    (product.price * quantity).toFixed(2);

            }

        });

        addCartBtn.addEventListener("click", () => {

            let cart =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];

            const selectedSize =
                sizeSelect.value;

            const selectedColor =
                colorSelect.value;

            const existingProduct =
                cart.find(item =>

                    item.id === product.id &&
                    item.size === selectedSize &&
                    item.color === selectedColor

                );

            if (existingProduct) {

                existingProduct.quantity += quantity;

            }

            else {

                cart.push({

                    ...product,

                    size: selectedSize,

                    color: selectedColor,

                    quantity: quantity

                });

            }

            localStorage.setItem(

                "cart",

                JSON.stringify(cart)

            );

            updateCartCount();

            successMessage.textContent =
                `✓ ${quantity} item(s) added to cart`;

            successMessage.style.color =
                "green";

            successMessage.style.opacity =
                "1";

            setTimeout(() => {

                successMessage.style.opacity =
                    "0";

            }, 3000);

        });

    }

    catch (error) {

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

        const totalItems =
            cart.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            );

        cartCount.textContent =
            totalItems;

    }

}

loadProduct();

updateCartCount();