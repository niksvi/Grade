const orderPopup = document.querySelector('.popup--order');
const orderForm = orderPopup.querySelector('.order');
const closeButton = orderPopup.querySelector('.popup__close');
const phoneInput = orderPopup.querySelector('.order__input--phone');
const emailInput = orderPopup.querySelector('.order__input--email');
const submitButton = document.querySelector('.popup__submit');

const form = document.querySelector('.additional__form');
const additionalPhoneInput = form.querySelector('.order__input--phone');
const additionalPopup = document.querySelector('.popup--success');
const modalCloseButton = additionalPopup.querySelector('.popup__close');

let isStorageSupport = true;
let storage = {};

try {
  storage.phone = localStorage.getItem('phone');
  storage.email = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
};

const popupKeydownHandler = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    orderPopup.classList.remove('popup--show');
    additionalPopup.classList.remove('popup--show');
    document.removeEventListener('keydown', popupKeydownHandler);
  }
};

const openPopup = () => {
  orderPopup.classList.add('popup--show');
  phoneInput.focus();
  document.addEventListener('keydown', popupKeydownHandler);

  if (storage) {
    phoneInput.value = storage.phone;
    emailInput.value = storage.email;
  }
};

document.querySelectorAll('.details__button').forEach((button) => {
  button.addEventListener('click' , (evt) => {
    evt.preventDefault();
    openPopup();

    const detailsButtonCLickHandler = (evt) => {
      if (!orderPopup.contains(evt.target) && evt.target !== button && orderPopup.classList.contains('popup--show')) {
        orderPopup.classList.remove('popup--show');
        document.removeEventListener('click', detailsButtonCLickHandler);
      }
      if (!additionalPopup.contains(evt.target) && additionalPopup.classList.contains('popup--show')) {
        additionalPopup.classList.remove('popup--show');
        document.removeEventListener('click', detailsButtonCLickHandler);
      }
    }

    document.addEventListener('click', detailsButtonCLickHandler);
  })
});

document.querySelectorAll('.price__button').forEach((button) => {
  button.addEventListener('click' , (evt) => {
    evt.preventDefault();
    openPopup();

    const priceButtonCLickHandler = (evt) => {
      if (!orderPopup.contains(evt.target) && evt.target !== button && orderPopup.classList.contains('popup--show')) {
        orderPopup.classList.remove('popup--show');
        document.removeEventListener('click', priceButtonCLickHandler);
      }
      if (!additionalPopup.contains(evt.target) && additionalPopup.classList.contains('popup--show')) {
        additionalPopup.classList.remove('popup--show');
        document.removeEventListener('click', priceButtonCLickHandler);
      }
    }

    document.addEventListener('click', priceButtonCLickHandler);
  })
});

closeButton.addEventListener('click', () => {
  orderPopup.classList.remove('popup--show');
});

const formSubmitHandler = () => {
  if (!phoneInput.value) {
    phoneInput.style.border = '1px solid #fe7865';
  } else {
    additionalPopup.classList.add('popup--show');

    if (isStorageSupport) {
      orderPopup.classList.remove('popup--show');
      localStorage.setItem('phone', phoneInput.value);

      if (emailInput.value) {
        localStorage.setItem('email', emailInput.value);
      }
    }
  }
};

const popupCloseHandler = () => {
  additionalPopup.classList.remove('popup--show');
};

form.addEventListener('submit', (evt) => {
  if (!additionalPhoneInput.value) {
    evt.preventDefault();
    additionalPhoneInput.style.border = '1px solid #fe7865';
  } else {
    additionalPhoneInput.style.border = '1px solid rgba(44, 46, 63, 0.3)';
    additionalPopup.classList.add('popup--show');
    document.addEventListener('keydown', popupKeydownHandler);
    document.addEventListener('click', (evt) => {
      if (!additionalPopup.contains(evt.target)) {
        additionalPopup.classList.remove('popup--show');
      }
    })
  }
});

modalCloseButton.addEventListener('click', popupCloseHandler);

orderForm.addEventListener('submit', formSubmitHandler);
