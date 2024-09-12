import { cart, calculateCartQuantity } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let totalBeforeTax = 0;
    let totalCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const shipping = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += shipping.priceCents;
    });

    totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    totalCents = totalBeforeTax + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div class="js-items"></div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;

    const paymentSummaryContainer = document.querySelector('.js-payment-summary');
        paymentSummaryContainer.innerHTML = paymentSummaryHTML;
        updateCartQuantity1();

}

function updateCartQuantity1() {
    const cartQuantity = calculateCartQuantity(); 
    const itemsElement = document.querySelector('.js-items'); 

    if (itemsElement) {
        itemsElement.innerHTML = `Items (${cartQuantity}):`;
    }
}

renderPaymentSummary();