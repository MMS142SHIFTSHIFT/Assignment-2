(function () {
    'use strict';

    var ORDER_EMAIL = 'orders@examplewebsite142.com';

    var sizeButtons = document.querySelectorAll('.size');
    var qtyInput = document.getElementById('qty');
    var msg = document.getElementById('msg');
    var mainImg = document.getElementById('main-img');
    var thumbButtons = document.querySelectorAll('#thumbs button');
    var selectedSize = '';

    /* Size selection */
    sizeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            sizeButtons.forEach(function (item) {
                item.setAttribute('aria-pressed', 'false');
            });
            button.setAttribute('aria-pressed', 'true');
            selectedSize = button.textContent.trim();
            msg.textContent = '';
        });
    });

    /* Quantity (minimum 1) */
    function setQty(value) {
        qtyInput.value = Math.max(1, parseInt(value, 10) || 1);
    }

    document.getElementById('minus').addEventListener('click', function () {
        setQty(Number(qtyInput.value) - 1);
    });
    document.getElementById('plus').addEventListener('click', function () {
        setQty(Number(qtyInput.value) + 1);
    });
    qtyInput.addEventListener('change', function () {
        setQty(qtyInput.value);
    });

    /* Gallery: clicking a thumbnail swaps the main image */
    thumbButtons.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
            mainImg.src = thumb.dataset.hires;
            mainImg.alt = thumb.querySelector('img').alt;

            thumbButtons.forEach(function (item) {
                item.removeAttribute('aria-current');
            });
            thumb.setAttribute('aria-current', 'true');
        });
    });

    /* Order now: opens a pre-filled email */
    document.getElementById('order-btn').addEventListener('click', function () {
        if (!selectedSize) {
            msg.textContent = 'Please choose a size before ordering.';
            if (sizeButtons.length) {
                sizeButtons[0].focus();
            }
            return;
        }

        setQty(qtyInput.value);

        var name = document.getElementById('product-name').textContent.trim();
        var price = document.getElementById('product-price').textContent.trim();

        var body =
            'Hi Serein,\n\n' +
            'I would like to order this t-shirt:\n\n' +
            'Product: ' + name + '\n' +
            'Price: ' + price + '\n' +
            'Size: ' + selectedSize + '\n' +
            'Quantity: ' + qtyInput.value + '\n\n' +
            'Name: \n' +
            'Contact number: \n' +
            'Shipping address: \n\n' +
            'Thank you!';

        window.location.href =
            'mailto:' + ORDER_EMAIL +
            '?subject=' + encodeURIComponent('Order: ' + name) +
            '&body=' + encodeURIComponent(body);
    });
})();
