
// replace text
// $.fn.toggleText = function(t1, t2){
//   if(this.text() == t1){
//   this.text(t2);
//  }else{
//   this.text(t1);
//  }
//   return this;
// };
var bodyDir = $('body').css('direction')
console.log(bodyDir)
var dir
if(bodyDir == "rtl"){
    dir= true
}
else{
    dir = false
}
$('.profile-setting').click(function () {
    $('.setting').toggle();
});
if($(window).width()>0 && $(window).width()<578){
    $('.profile-nav-wrapper i').click(function () {
        $(this).toggleClass('bi-filter-left bi-filter-right');
        $('.profile-nav').toggle();
    });
}
// $(window).on("resize",function(){
// })
$('.profile-search .bi-search').click(function () {
    $('.search').toggle();
});
$('.cartOptions-btn').click(function () {
    $('.cartOptions-btn .arrow' ).toggleClass('bi-chevron-down bi-chevron-up');
    $('.cartOptions').toggle();
});
$('.projectOptions-btn').click(function () {
    $('.projectOptions-btn .arrow' ).toggleClass('bi-chevron-down bi-chevron-up');
    $('.projectOptions').toggle();
});
$('.profile-nav').mouseout(function () {
    if($('.profile-nav li span').css('display') == 'none'){
        if($('.cartOptions').css('display') == 'block'){
            $('.cartOptions').css('display','none');
            $('.cartOptions-btn .arrow').toggleClass('bi-chevron-up bi-chevron-down');
        }
        if($('.projectOptions').css('display') == 'block'){
            $('.projectOptions').css('display','none');
            $('.projectOptions-btn .arrow').toggleClass('bi-chevron-up bi-chevron-down');
        }
    }
});
$(document).ready(function () {
    $(".package-slider.owl-carousel").owlCarousel({
        stagePadding: 50,
        loop:false,
        autoWidth:true,
        margin:10,
        nav:false,
        dots:false,
        rtl: dir,
    });
})
// function $(e) {return document.querySelector(e)}
if($('.drag').length > 0){
    const drag = document.querySelector('.drag')
    let startY
    let startX
    let scrollLeft
    let scrollTop
    let isDown

    drag.addEventListener('mousedown', e => mouseIsDown(e));
    document.body.addEventListener('mouseup', e => mouseUp(e))
    document.body.addEventListener('mousemove', e=> mouseMove(e))

    function mouseIsDown(e){
        isDown = true
        startY = e.pageY - drag.offsetTop
        startX = e.pageX - drag.offsetLeft
        scrollLeft = drag.scrollLeft
        scrollTop = drag.scrollTop
    }
    function mouseUp(e){
        isDown = false
    }
    function mouseMove(e){
        if(isDown){
            e.preventDefault()
            //Move vertcally
            const y = e.pageY - drag.offsetTop
            const walkY = y - startY
            drag.scrollTop = scrollTop - walkY

            //Move Horizontally
            const x = e.pageX - drag.offsetLeft
            const walkX = x - startX
            drag.scrollLeft = scrollLeft - walkX

        }
    }
}
$('#installment').change(function(){
    if ($('#installment').is(':checked')) $('.installment-avilable').slideDown()
    else $('.installment-avilable').slideUp()
})
var sideNavHeight = $('.profile-body').outerHeight();
console.log(sideNavHeight)
if( sideNavHeight > 390.375){
    $('.profile-nav').height(sideNavHeight)
}
if($('#file-upload').length > 0){
    function ekUpload(){
        function Init() {

            console.log("Upload Initialised");

            var fileSelect    = document.getElementById('file-upload'),
                fileDrag      = document.getElementById('file-drag'),
                submitButton  = document.getElementById('submit-button');

            fileSelect.addEventListener('change', fileSelectHandler, false);

            // Is XHR2 available?
            var xhr = new XMLHttpRequest();
            if (xhr.upload) {
                // File Drop
                fileDrag.addEventListener('dragover', fileDragHover, false);
                fileDrag.addEventListener('dragleave', fileDragHover, false);
                fileDrag.addEventListener('drop', fileSelectHandler, false);
            }
        }

        function fileDragHover(e) {
            var fileDrag = document.getElementById('file-drag');

            e.stopPropagation();
            e.preventDefault();

            fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
        }

        function fileSelectHandler(e) {
            // Fetch FileList object
            var files = e.target.files || e.dataTransfer.files;

            // Cancel event and hover styling
            fileDragHover(e);

            // Process all File objects
            for (var i = 0, f; f = files[i]; i++) {
                parseFile(f);
                uploadFile(f);
            }
        }

        // Output
        function output(msg) {
            // Response
            var m = document.getElementById('messages');
            m.innerHTML = msg;
        }

        function parseFile(file) {

            console.log(file.name);
            output(
                '<strong>' + encodeURI(file.name) + '</strong>'
            );

            // var fileType = file.type;
            // console.log(fileType);
            var imageName = file.name;

            var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
            if (isGood) {
                document.getElementById('start').classList.add("hidden");
                document.getElementById('response').classList.remove("hidden");
                document.getElementById('notimage').classList.add("hidden");
                // Thumbnail Preview
                document.getElementById('file-image').classList.remove("hidden");
                document.getElementById('file-image').src = URL.createObjectURL(file);
            }
            else {
                document.getElementById('file-image').classList.add("hidden");
                document.getElementById('notimage').classList.remove("hidden");
                document.getElementById('start').classList.remove("hidden");
                document.getElementById('response').classList.add("hidden");
                document.getElementById("file-upload-form").reset();
            }
        }

        function setProgressMaxValue(e) {
            var pBar = document.getElementById('file-progress');

            if (e.lengthComputable) {
                pBar.max = e.total;
            }
        }

        function updateFileProgress(e) {
            var pBar = document.getElementById('file-progress');

            if (e.lengthComputable) {
                pBar.value = e.loaded;
            }
        }

        function uploadFile(file) {

            var xhr = new XMLHttpRequest(),
                fileInput = document.getElementById('class-roster-file'),
                pBar = document.getElementById('file-progress'),
                fileSizeLimit = 1024; // In MB
            if (xhr.upload) {
                // Check if file is less than x MB
                if (file.size <= fileSizeLimit * 1024 * 1024) {
                    // Progress bar
                    pBar.style.display = 'inline';
                    xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
                    xhr.upload.addEventListener('progress', updateFileProgress, false);

                    // File received / failed
                    xhr.onreadystatechange = function(e) {
                        if (xhr.readyState == 4) {
                            // Everything is good!

                            // progress.className = (xhr.status == 200 ? "success" : "failure");
                            // document.location.reload(true);
                        }
                    };

                    // Start upload
                    xhr.open('POST', document.getElementById('file-upload-form').action, true);
                    xhr.setRequestHeader('X-File-Name', file.name);
                    xhr.setRequestHeader('X-File-Size', file.size);
                    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                    xhr.send(file);
                } else {
                    output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
                }
            }
        }

        // Check for the various File API support.
        if (window.File && window.FileList && window.FileReader) {
            Init();
        } else {
            document.getElementById('file-drag').style.display = 'none';
        }
    }
    ekUpload();
}
if($('#file-upload-2').length > 0){
    function ekUpload(){
        function Init() {

            console.log("Upload Initialised");

            var fileSelect    = document.getElementById('file-upload-2'),
                fileDrag      = document.getElementById('file-drag-2'),
                submitButton  = document.getElementById('submit-button');

            fileSelect.addEventListener('change', fileSelectHandler, false);

            // Is XHR2 available?
            var xhr = new XMLHttpRequest();
            if (xhr.upload) {
                // File Drop
                fileDrag.addEventListener('dragover', fileDragHover, false);
                fileDrag.addEventListener('dragleave', fileDragHover, false);
                fileDrag.addEventListener('drop', fileSelectHandler, false);
            }
        }

        function fileDragHover(e) {
            var fileDrag = document.getElementById('file-drag-2');

            e.stopPropagation();
            e.preventDefault();

            fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload-2');
        }

        function fileSelectHandler(e) {
            // Fetch FileList object
            var files = e.target.files || e.dataTransfer.files;

            // Cancel event and hover styling
            fileDragHover(e);

            // Process all File objects
            for (var i = 0, f; f = files[i]; i++) {
                parseFile(f);
                uploadFile(f);
            }
        }

        // Output
        function output(msg) {
            // Response
            var m = document.getElementById('messages-2');
            m.innerHTML = msg;
        }

        function parseFile(file) {

            console.log(file.name);
            output(
                '<strong>' + encodeURI(file.name) + '</strong>'
            );

            // var fileType = file.type;
            // console.log(fileType);
            var imageName = file.name;

            var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
            if (isGood) {
                document.getElementById('start-2').classList.add("hidden");
                document.getElementById('response-2').classList.remove("hidden");
                document.getElementById('notimage-2').classList.add("hidden");
                // Thumbnail Preview
                document.getElementById('file-image-2').classList.remove("hidden");
                document.getElementById('file-image-2').src = URL.createObjectURL(file);
            }
            else {
                document.getElementById('file-image-2').classList.add("hidden");
                document.getElementById('notimage-2').classList.remove("hidden");
                document.getElementById('start-2').classList.remove("hidden");
                document.getElementById('response-2').classList.add("hidden");
                document.getElementById("file-upload-2-form").reset();
            }
        }

        function setProgressMaxValue(e) {
            var pBar = document.getElementById('file-progress-2');

            if (e.lengthComputable) {
                pBar.max = e.total;
            }
        }

        function updateFileProgress(e) {
            var pBar = document.getElementById('file-progress-2');

            if (e.lengthComputable) {
                pBar.value = e.loaded;
            }
        }

        function uploadFile(file) {

            var xhr = new XMLHttpRequest(),
                fileInput = document.getElementById('class-roster-file'),
                pBar = document.getElementById('file-progress-2'),
                fileSizeLimit = 1024; // In MB
            if (xhr.upload) {
                // Check if file is less than x MB
                if (file.size <= fileSizeLimit * 1024 * 1024) {
                    // Progress bar
                    pBar.style.display = 'inline';
                    xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
                    xhr.upload.addEventListener('progress', updateFileProgress, false);

                    // File received / failed
                    xhr.onreadystatechange = function(e) {
                        if (xhr.readyState == 4) {
                            // Everything is good!

                            // progress.className = (xhr.status == 200 ? "success" : "failure");
                            // document.location.reload(true);
                        }
                    };

                    // Start upload
                    xhr.open('POST', document.getElementById('file-upload-2-form').action, true);
                    xhr.setRequestHeader('X-File-Name', file.name);
                    xhr.setRequestHeader('X-File-Size', file.size);
                    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                    xhr.send(file);
                } else {
                    output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
                }
            }
        }

        // Check for the various File API support.
        if (window.File && window.FileList && window.FileReader) {
            Init();
        } else {
            document.getElementById('file-drag-2').style.display = 'none';
        }
    }
    ekUpload();
}
$('#addPhone input').click(function () {
    $('#addPhone').hide()
    $('#addedPhone').show();
    $('#addedPhone').css('display','flex')
});
$('#delPhone input').click(function () {
    $('#addPhone').show()
    $('#addedPhone').hide();
});
$('#addVideo').click(function () {
    $('#videos-link').show()
    $('#addVideo2').show()
    $(this).hide()
});
$('.deleteLink').click(function () {
    $('#videos-link').hide()
    $('#addVideo').show()
    $('#addVideo2').hide()
});


$('#addVideo2').click(function () {
    $('#videos-link2').show()
    $('#addVideo3').show()
    $(this).hide()
});
$('.deleteLink2').click(function () {
    $('#videos-link2').hide()
    $('#addVideo2').show()
    $('#addVideo3').hide()
});


$('#addVideo3').click(function () {
    $('#videos-link3').show()
    $('#addVideo4').show()
    $(this).hide()
});
$('.deleteLink3').click(function () {
    $('#videos-link3').hide()
    $('#addVideo3').show()
    $('#addVideo4').hide()
});


$('#addVideo4').click(function () {
    $('#videos-link4').show()
    $(this).hide()
});
$('.deleteLink4').click(function () {
    $('#videos-link4').hide()
    $('#addVideo4').show()
});

$('.cart').click(function () {
    $(this).css('display','none')
    $(this).next('.product-quantity').css('display','block');
    // var ans = $(this).parents().find('.product').clone()
    // var pp = ans.find('h5')
    // console.log(pp);
})
$('.quantity.plus').click(function(e) {
    let $input = $(this).next('input.qty');
    let val = parseInt($input.val());
    $input.val( val+1 ).change();
});

$('.quantity.minus').click(function(e) {
    let $input = $(this).prev('input.qty');
    var val = parseInt($input.val());
    if (val > 1) {
        $input.val( val-1 ).change();
    }
});
$('.product .quantity.plus').mouseover(function(){
    $(this).parent(".product-quantity").addClass("active");
})
$(".product .product-quantity").mouseleave(function(){
    $(this).removeClass("active");
})


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.image-upload-wrap').hide();
            $('.file-upload-content').show();
            $('.file-title').html(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});


// jQuery(document).ready(function () {
//   ImgUpload();
// });

function ImgUpload() {
    var imgWrap = "";
    var imgArray = [];

    $('.upload__inputfile').each(function () {
        $(this).on('change', function (e) {
            imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
            var maxLength = $(this).attr('data-max_length');

            var files = e.target.files;
            var filesArr = Array.prototype.slice.call(files);
            var iterator = 0;
            filesArr.forEach(function (f, index) {

                if (!f.type.match('image.*')) {
                    return;
                }

                if (imgArray.length > maxLength) {
                    return false
                } else {
                    var len = 0;
                    for (var i = 0; i < imgArray.length; i++) {
                        if (imgArray[i] !== undefined) {
                            len++;
                        }
                    }
                    if (len > maxLength) {
                        return false;
                    } else {
                        imgArray.push(f);

                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                            imgWrap.append(html);
                            iterator++;
                        }
                        reader.readAsDataURL(f);
                    }
                }
            });
        });
    });

    $('body').on('click', ".upload__img-close", function (e) {
        var file = $(this).parent().data("file");
        for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i].name === file) {
                imgArray.splice(i, 1);
                break;
            }
        }
        $(this).parent().parent().remove();
    });
}

$(document).ready(function () {
    ImgUpload();

    // loading

    $("body").css('overflow-y', 'auto');
    $('#loading').fadeOut(500);


    // show sub menu

    $("nav .has-menu").click(function(){
        $(this).children(".sub-menu").toggleClass("d-flex");
    });
    // $("nav .has-menu").mouseover(function(){
    //   $(this).children(".sub-menu").addClass("d-flex");
    // });
    // $("nav .has-menu").mouseover(function(){
    //   $(this).children(".sub-menu").addClass("d-flex");
    // });

    // $("nav .has-menu").mouseleave(function(){
    //   $(this).children(".sub-menu").removeClass("d-flex");
    // });
    $(".bottom-nav .virtical-sub-menu a").mouseover(function(){
        $(this).parents(".virtical-sub-menu").addClass("active");
    });
    $(".bottom-nav .virtical-sub-menu").mouseleave(function(){
        $(this).removeClass("active");
    });
    $(".side-menu-nav .has-menu").click(function(){
        $(this).children(".sub-menu").slideToggle(300);
    });

    $(".heart").click(function() {
        $(this).toggleClass("fav");
        console.log(this)
    })

    $("nav .hav-user").click(function () {
        $(".hov-menu").toggleClass("d-flex")
    })


    // ----- scroll top button ------

    var btn_top = $('#scroll-top');
    var btn_bottom = $('.scroll-bottom');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            btn_top.addClass('show');
        } else {
            btn_top.removeClass('show');
        }
    });

    $(".play-icon").click(function(){
        document.querySelector(".video-container video").play();
        $(this).addClass("d-none");
        $(".pause-icon").removeClass("d-none");
    })

    $(".pause-icon").click(function(){
        document.querySelector(".video-container video").pause();
        $(this).addClass("d-none");
        $(".play-icon").removeClass("d-none");
    })



    btn_top.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
    });

    btn_bottom.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:730}, '300');
    });



// upload profile pic
    if ($(".form-addbuilder .profile-pic").length > 0) {
        const imgDiv = document.querySelector('.profile-pic');
        const img = document.querySelector('#photo');
        const file = document.querySelector('#file');
        const uploadBtn = document.querySelector('#uploadBtn');

        //if user hover on img div

        imgDiv.addEventListener('mouseenter', function(){
            uploadBtn.style.display = "block";
        });

        //if we hover out from img div

        imgDiv.addEventListener('mouseleave', function(){
            uploadBtn.style.display = "none";
        });

        //when we choose a pic to upload

        file.addEventListener('change', function(){
            const choosedFile = this.files[0];
            if (choosedFile) {
                const reader = new FileReader();
                reader.addEventListener('load', function(){
                    img.setAttribute('src', reader.result);
                });
                reader.readAsDataURL(choosedFile);
            }
        });
    }


    var currency = "BTC";
    var url = "https://api.coinbase.com/v2/exchange-rates?currency=" + currency;

    function makeRequest() {
        xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var response = JSON.parse(this.responseText);

        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader("CB-VERSION", "2018-01-01");
        xhr.send();
    }
    makeRequest();


    // upload profile pic
    if ($(".profile-pic").length > 0) {
        const imgDiv = document.querySelector('.profile-pic');
        const img = document.querySelector('#photo');
        const file = document.querySelector('#file');
        const uploadBtn = document.querySelector('#uploadBtn');
        //if user hover on img div
        imgDiv.addEventListener('mouseenter', function(){
            uploadBtn.style.display = "block";
        });
        //if we hover out from img div
        imgDiv.addEventListener('mouseleave', function(){
            uploadBtn.style.display = "none";
        });
        //when we choose a pic to upload
        file.addEventListener('change', function(){
            const choosedFile = this.files[0];
            if (choosedFile) {
                const reader = new FileReader();
                reader.addEventListener('load', function(){
                    img.setAttribute('src', reader.result);
                });
                reader.readAsDataURL(choosedFile);
            }
        });
    }







    $(".register-as").change(function() {
        let x = $(this).val();
        if ( x.includes("3")) {
            $(".if-agent").slideDown(500);
        }else{
            $(".if-agent").slideUp(500);
        }
    })







    if ($("#logo-img").length > 0) {
        document.getElementById('logo-img').onchange = function () {
            $(".file-name").text(this.value)
        };

    }

    new WOW().init();

    function ImgUpload() {
        var imgWrap = "";
        var imgArray = [];
        $('.upload__inputfile').each(function () {
            $('#photo').css('display', 'none')
            $(this).on('change', function (e) {
                imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
                var maxLength = $(this).attr('data-max_length');

                var files = e.target.files;
                var filesArr = Array.prototype.slice.call(files);
                var iterator = 0;
                filesArr.forEach(function (f, index) {

                    if (!f.type.match('image.*')) {
                        return;
                    }

                    if (imgArray.length > maxLength) {
                        return false
                    } else {
                        var len = 0;
                        for (var i = 0; i < imgArray.length; i++) {
                            if (imgArray[i] !== undefined) {
                                len++;
                            }
                        }
                        if (len > maxLength) {
                            return false;
                        } else {
                            imgArray.push(f);

                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                                imgWrap.append(html);
                                iterator++;
                            }
                            reader.readAsDataURL(f);
                        }
                    }
                });
            });
        });

        $('body').on('click', ".upload__img-close", function (e) {
            var file = $(this).parent().data("file");
            for (var i = 0; i < imgArray.length; i++) {
                if (imgArray[i].name === file) {
                    imgArray.splice(i, 1);
                    break;
                }
            }
            $(this).parent().parent().remove();
        });
    }

// $(".nice-select").niceSelect();
// $(".chosen-select").chosen({rtl: true});

    $(".register-as").select2();

});

$(".offered-real-estate .items-container.owl-carousel").owlCarousel({
    nav: false,
    loop: false,
    autoplay: false,
    autoplayHoverPause: true,
    responsiveClass: true,
    margin: 20,
    rtl: dir,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
});
$(".offered-real-estate .card .owl-carousel").owlCarousel({
    nav: false,
    autoplay: false,
    autoplayHoverPause: false,
    responsiveClass: true,
    items: 1,
    dots: true,
    rtl: dir,
    mouseDrag: false
});
$(".titanium-agencies .owl-carousel").owlCarousel({
    nav: false,
    loop: false,
    autoplay: false,
    autoplayHoverPause: true,
    responsiveClass: true,
    margin: 20,
    rtl: dir,
    responsive: {
        0: {
            items: 3
        },
        600: {
            items: 4
        },
        1000: {
            items: 5
        },
        1300: {
            items: 6
        }
    }
});
$(".spicial-agencies .owl-carousel").owlCarousel({
    nav: true,
    loop: false,
    autoplay: false,
    autoplayHoverPause: true,
    responsiveClass: true,
    margin: 20,
    rtl: dir,
    responsive: {
        0: {
            items: 3
        },
        600: {
            items: 4
        },
        1000: {
            items: 5
        },
        1300: {
            items: 6
        }
    }
});
$(".our-parteners .owl-carousel").owlCarousel({
    nav: true,
    loop: false,
    autoplay: false,
    autoplayHoverPause: true,
    responsiveClass: true,
    margin: 20,
    rtl: dir,
    responsive: {
        0: {
            items: 3
        },
        600: {
            items: 4
        },
        1000: {
            items: 5
        },
        1300: {
            items: 6
        }
    }
});
$(".city.owl-carousel").owlCarousel({
    margin: 10,
    rtl: dir,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    },
});
$(".suggested-for-buy-rent .owl-carousel").owlCarousel({
    margin: 20,
    nav: true,
    rtl: dir,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        },
        1300: {
            items: 4
        }
    },
});
$(".slice .owl-carousel").owlCarousel({
    margin: 10,
    rtl: dir,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    },
});


function myFunction() {
    // Get the checkbox
    var check1 = document.getElementById("op1");
    var check2 = document.getElementById("op2");
    var home = document.getElementById("home");
    var peice = document.getElementById("peice");
    var commercial = document.getElementById("commercial");
    commercial

    // Get the output text
    var olduser = document.getElementById("data-user-old");
    var newuser = document.getElementById("data-user-new");
    var homeSelected = document.getElementById("home-selected");
    var peiceSelected = document.getElementById("peice-selected");
    var commercialSelected = document.getElementById("commercial-selected");

    // If the checkbox is checked, display the output text
    if (check1.checked == true){
        olduser.style.display = "block";
    } else {
        olduser.style.display = "none";
    }
    if (check2.checked == true){
        newuser.style.display = "block";
    } else {
        newuser.style.display = "none";
    }
    if (home.checked == true){
        homeSelected.style.display = "block";
    } else {
        homeSelected.style.display = "none";
    }
    if (peice.checked == true){
        peiceSelected.style.display = "block";
    } else {
        peiceSelected.style.display = "none";
    }
    if (commercial.checked == true){
        commercialSelected.style.display = "block";
    } else {
        commercialSelected.style.display = "none";
    }
}


