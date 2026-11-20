document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var RECIPIENT = 'hello@examplewebsite142.com';
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');

    if (!form) {
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        function value(id) {
            return document.getElementById(id).value.trim();
        }

        var body =
            'Name: ' + value('name') + '\n' +
            'Email: ' + value('email') + '\n' +
            'Phone: ' + value('phone') + '\n\n' +
            'Message:\n' + value('message');

        window.location.href =
            'mailto:' + RECIPIENT +
            '?subject=' + encodeURIComponent(value('subject')) +
            '&body=' + encodeURIComponent(body);

        if (status) {
            status.textContent = 'Opening your email app with your message. Please press Send there to finish.';
        }
    });
});
