// ТАБЫ

const tab = document.querySelectorAll(".tab");
const toggleTab = function (element) {
  const tabBtn = element.querySelectorAll(".tab-btn");
  const tabContent = element.querySelectorAll(".tab-content");
  tabBtn[0].classList.add("tab-open");
  tabContent[0].classList.add("tab-open");

  const removeTab = function (element) {
    for (const i of element) {
      i.classList.remove("tab-open");
    }
  };
  const openTab = function (index) {
    removeTab(tabBtn);
    removeTab(tabContent);
    tabBtn[index].classList.add("tab-open");
    tabContent[index].classList.add("tab-open");
  };
  tabBtn.forEach((el, i) => (el.onclick = () => openTab(i)));
};
[...tab].forEach((el) => toggleTab(el));



// БУРГЕР


const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const body = document.body;

// Клонируем меню, чтобы задать свои стили для мобильной версии
const menu = document.querySelector("#menu").cloneNode(1);

// При клике на иконку hamb вызываем ф-ию hambHandler
hamb.addEventListener("click", hambHandler);

// Выполняем действия при клике ..
function hambHandler(e) {
  e.preventDefault();
  // Переключаем стили элементов при клике
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();


  // ?????????????????????????????????????????????????????????????????????/
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  window.openModalBtn = document.querySelectorAll(".btn-open");
  const closeModalBtn = document.querySelector(".btn-close");

  // close modal function
  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  // close the modal when the close button and overlay is clicked
  closeModalBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // close modal when the Esc key is pressed
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  openModalBtn.forEach(function(item) {
    item.addEventListener('click', function(e) {
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    })
  })
  // ?????????????????????????????????????????????????????????????????????????????
}

// Здесь мы рендерим элементы в наш попап
function renderPopup() {
  popup.appendChild(menu);
}

// Код для закрытия меню при нажатии на ссылку
const links = Array.from(menu.children);

// Для каждого элемента меню при клике вызываем ф-ию
links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

// Закрытие попапа при клике на меню
function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
}


// СЛАЙДЕР ОТЗЫВЫ

window.onload = function() {
  const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView:1,
    loopedSlides: 1,
    spaceBetween: 50,
    centeredSlides: true,

     // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

  // Navigation arrows
    navigation: {
      nextEl: '.slider_button_next',
      prevEl: '.slider_button_prev',
    },
  });

  const swiperCard = new Swiper('.swiperCard', {
    loop: true,
    // slidesPerView:1,
    // loopedSlides: 1,
    // spaceBetween: 50,
    // centeredSlides: true,
    effect: "cards",
    slideShadows: false,
    perSlideOffset: 99,
    perSlideRotate: 1,
    rotate: false,
    grabCursor: true,

    //  // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },

  // Navigation arrows
    navigation: {
      nextEl: '.master_btn_next',
      prevEl: '.master_btn_prev',
    },
  });

}



// POPUP


const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
window.openModalBtn = document.querySelectorAll(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

// close modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

openModalBtn.forEach(function(item) {
  item.addEventListener('click', function(e) {
    let masterName = $(e.target).attr('data-master')
    let popupBtn = $(modal).find('.main_popup_wrap_norm .send_order')

    $(popupBtn).attr('data-master',masterName)
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  })
})

$('.order_input_tel').mask("+7 (999) 999 99 99"); 
      

$('.send_order').on( "click", function(e) {
  toggleLoader() 

  let formName = $(e.target).attr('data-master')
  let siteName = $('.super_main_container').attr('data-site')

  let parentWrap = $(e.target).parent('.validatedForm')
  let name = $(parentWrap).find('.order_input_name')
  let tel = $(parentWrap).find('.order_input_tel')
  let isValidName = isValidate(name)
  let isValidTel = isValidate(tel)

  let text = `<b>Оставили заявку на сайте </b>\nСайт: ${siteName}\nФорма: ${formName}\nИмя: ${name.val()}\nТелефон <code>${tel.val()}</code>`
  
  if(isValidName && isValidTel){
    send_tg(text)
    // toggleLoader()
  }
} );

function toggleLoader() {
  $('.loader_popup').toggleClass('d-none');
}

function openSuccessBlock(){
  $('.main_popup_wrap_valid').toggleClass('d-none');
  $('.main_popup_wrap_norm').toggleClass('d-none');
  $('.order_wrap_valid').toggleClass('d-none');
  $('.order_wrap_norm').toggleClass('d-none');
}

function isValidate(jqInp){
  $(jqInp).removeClass('invalidInput')
  let val = jqInp.val()

  if(val == ''){
    $(jqInp).addClass('invalidInput')
    return false
  }
  return true
}
function showError(jqXHR){
  let errorText = `Ошибка №${jqXHR.responseJSON.error_code}. Обратитесь к менеджеру или попробуйте позднее` 
  $('.error_popup span').text(errorText)
  $('.error_popup').toggleClass('d-none');
  
  setTimeout(hideError,5000)  
}

function hideError(){
  $('.error_popup').toggleClass('d-none');
}


function send_tg(text,successFunc, errorFunc){

  let chatid = '-4074106998',
    token = '6321491562:AAGRqLnKc97PBx7178v6p5aqYZcKHMcdzqA',
    z = $.ajax({
      type: "POST",  
      url: "https://api.telegram.org/bot"+token+"/sendMessage?chat_id="+chatid,
      data: "parse_mode=HTML&text="+encodeURIComponent(text), 
      success: function(data){
        console.log(data)
        openSuccessBlock()
        toggleLoader()

      },
      error: function (jqXHR, exception) {
        toggleLoader()
        showError(jqXHR)
        console.log('jqXHR',jqXHR)
        console.log('exception',exception)


        // errorFunc()
      }
}); 
}


// ПЛАВНЫЙ СКРОЛЛ

$('a[href^="#"').on('click', function() {

  let href = $(this).attr('href');

  $('html, body').animate({
    scrollTop: $(href).offset().top
}, {
    duration: 600,   // по умолчанию «400» 
    easing: "linear" // по умолчанию «swing» 
});
  return false;
});