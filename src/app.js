import './sass/main.scss';
import { tns } from '../node_modules/tiny-slider/src/tiny-slider';

document.addEventListener('DOMContentLoaded', () => {
    //------------------------------------------------------------------------//
    // Anchor smooth scroll
    let anchorlinks = document.querySelectorAll('a[href^="#"]');

    for (let item of anchorlinks) {
        // relitere
        item.addEventListener('click', e => {
            let hashval = item.getAttribute('href');
            let target = document.querySelector(hashval);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.pushState(null, null, hashval);
            }
            e.preventDefault();
        });
    }
    //------------------------------------------------------------------------//

    //------------------------------------------------------------------------//
    // Navbar menu
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
    //------------------------------------------------------------------------//

    //------------------------------------------------------------------------//
    // Text slider
    var slider = tns({
        container: '.text-slider',
        mode: 'gallery',
        controls: false,
        nav: false,
        autoplay: true,
        autoplayButtonOutput: false,
        autoHeight: false
    });
    //------------------------------------------------------------------------//

    //------------------------------------------------------------------------//
    // Modal
    var modals = document.querySelectorAll('.modal'),
        modalButtons = document.querySelectorAll('.modal-button'),
        modalBackgrounds = document.querySelectorAll('.modal-background');

    function closeModals() {
        modals.forEach(function(element) {
            element.classList.remove('is-active');
        });
    }

    modalButtons.forEach(function(element) {
        element.addEventListener('click', function() {
            var modalId = this.getAttribute('href');

            closeModals();
            document.querySelector(modalId).classList.add('is-active');
        });
    });

    modalBackgrounds.forEach(function(element) {
        element.addEventListener('click', function() {
            closeModals();
        });
    });

    document.querySelector('.modal-button-3').addEventListener('click', function() {
        closeModals();
        document.getElementById('modal-3').classList.add('is-active');
    });
    //------------------------------------------------------------------------//

    //------------------------------------------------------------------------//
    // File
    var file = document.getElementById('file');

    if (file) {
        file.onchange = function() {
            if (file.files.length > 0) {
                document.getElementById('filename').innerHTML = file.files[0].name;
            }
        };
    }
    //------------------------------------------------------------------------//
});
