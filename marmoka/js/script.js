function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector(".cart-icon");
    const cartWindow = document.querySelector(".cart-window");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const quantityButtons = document.querySelectorAll(".increase, .decrease");
    const sizeButtons = document.querySelectorAll(".size-option");
    let cart = [];

    // Toggle cart window
    cartIcon.addEventListener("click", function () {
        cartWindow.style.display = cartWindow.style.display === "none" || cartWindow.style.display === "" ? "block" : "none";
    });

    // Handle size selection
    sizeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const sizeContainer = this.closest(".size-selector");
            sizeContainer.querySelectorAll(".size-option").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Handle quantity change
    quantityButtons.forEach(button => {
        button.addEventListener("click", function () {
            const quantityElement = this.parentNode.querySelector(".quantity");
            let quantity = parseInt(quantityElement.textContent);

            if (this.classList.contains("increase")) {
                quantity++;
            } else if (this.classList.contains("decrease") && quantity > 1) {
                quantity--;
            }

            quantityElement.textContent = quantity;
        });
    });

    // Add item to cart
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const item = this.closest(".item");
            const itemName = item.querySelector(".name").textContent;
            const itemPrice = parseFloat(item.querySelector(".price").textContent.replace("€", ""));
            const selectedSizeElement = item.querySelector(".size-option.active");
            const selectedSize = selectedSizeElement ? selectedSizeElement.textContent : "One Size";
            const quantityElement = item.querySelector(".quantity");
            const quantity = parseInt(quantityElement.textContent);

            const existingItem = cart.find(cartItem => cartItem.name === itemName && cartItem.size === selectedSize);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name: itemName, price: itemPrice, size: selectedSize, quantity: quantity });
            }

            updateCart();
        });
    });

    // Update cart
    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((cartItem, index) => {
            const cartItemElement = document.createElement("li");
            cartItemElement.innerHTML = `
                ${cartItem.name} (${cartItem.size}) - €${cartItem.price} x ${cartItem.quantity}
                <button class="remove-item" data-index="${index}">❌</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            total += cartItem.price * cartItem.quantity;
        });

        totalPriceElement.textContent = `€${total.toFixed(2)}`;

        // Remove item
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
});

/* ABOUT US */
document.addEventListener("DOMContentLoaded", () => {

    if (document.querySelector(".about-body")) {
        
        const bloques = gsap.utils.toArray(".about-body > *");

        bloques.forEach((bloque) => {
            
            gsap.from(bloque, {
                opacity: 0,
                y: 60,
                duration: 0.8,
                ease: "power2.out",
                
                scrollTrigger: {
                    trigger: bloque,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
            
        });

    }

});