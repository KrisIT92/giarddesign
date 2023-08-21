$(document).ready(function () {
    const searchToggle = document.getElementById("searchToggle");
    const searchForm = document.getElementById("searchForm");
    const ofertaToggle = document.getElementById("ofertaDropdown");
    const ofertaForm = document.getElementById("ofertaForm");
    const scrollToRealizacjeButton = document.querySelector('#scrollToRealizacjeButton');
    const realizacjeSection = document.querySelector('#realizacje');
    var isExpanded = false;

    searchToggle.addEventListener("click", function () {
        searchForm.classList.toggle("active");
        ofertaForm.classList.remove("active");
    });

    ofertaToggle.addEventListener("click", function () {
        ofertaForm.classList.toggle("active");
        searchForm.classList.remove("active");
    });

    document.addEventListener("click", function (event) {
        if (!searchForm.contains(event.target) && !searchToggle.contains(event.target) && !ofertaForm.contains(event.target) && !ofertaToggle.contains(event.target)) {
            searchForm.classList.remove("active");
            ofertaForm.classList.remove("active");
        }
    });

    if (scrollToRealizacjeButton) {
        scrollToRealizacjeButton.addEventListener('click', () => {
            realizacjeSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    $('.hero-slider').slick({
        autoplay: true,
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
    });

    var grid = $('.grid');
    grid.isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    $('.grid').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="bi bi-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="bi bi-chevron-right"></i></button>',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    var expandButton = $('#expandButton');
    var hiddenItems = $('.grid-item.hidden');
    var initialHeight = $('.grid').height();
    var targetHeight = initialHeight * 0.75;

    expandButton.click(function () {
        hiddenItems.removeClass('hidden');
        grid.isotope('layout');
        $('.grid').slick('refresh');
        isExpanded = !isExpanded;

        if (isExpanded) {
            $('.grid').animate({ height: targetHeight }, 300);
        } else {
            $('.grid').animate({ height: initialHeight }, 300, function () {
                if (!isExpanded) {
                    $('html, body').animate({ scrollTop: grid.offset().top - 100 }, 300);
                }
            });
        }

        var buttonText = isExpanded ? 'Zwiń' : 'Rozwiń';
        expandButton.text(buttonText);
    });

    var masonry = new Masonry(grid[0], {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

    imagesLoaded(grid[0]).on('progress', function () {
        masonry.layout();
    });

    function toggleSection(selector, $grid) {
        isExpanded = !isExpanded;
        var buttonText = isExpanded ? "Zwiń" : "Rozwiń";
        $("#expandButton").text(buttonText);
        $(selector).slideToggle(function () {
            if (isExpanded) {
                $grid.isotope("layout");
            }
        });
    }

    $("#expandButton").click(function () {
        toggleSection(".grid", grid);
    });

    var $galleryGrid = $(".gallery-section .grid").isotope({
        itemSelector: ".grid-item",
        layoutMode: "masonry",
        masonry: {
            columnWidth: ".grid-item"
        }
    });

    $("#expandButton").click(function () {
        toggleSection(".gallery-section .grid", $galleryGrid);
    });

    searchToggle.addEventListener("click", function () {
        $(searchForm).slideToggle();
    });
});