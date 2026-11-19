const whatsappNumber = '51974202077';
const heightInputs = [...document.querySelectorAll('input[name="height"]')];
const colorInputs = [...document.querySelectorAll('input[name="color"]')];
const selectedHeight = document.querySelector('#selected-height');
const selectedColor = document.querySelector('#selected-color');
const whatsappLinks = [...document.querySelectorAll('[data-whatsapp]')];
const customLink = document.querySelector('[data-custom-whatsapp]');
const productImage = document.querySelector('#product-image');
const zoomDialog = document.querySelector('#zoom-dialog');

function selectedValue(inputs) {
  return inputs.find((input) => input.checked)?.value ?? '';
}

function refreshProductSelection() {
  const height = selectedValue(heightInputs);
  const color = selectedValue(colorInputs);
  const heightInput = heightInputs.find((input) => input.checked);

  if (selectedHeight && heightInput) {
    selectedHeight.textContent = heightInput.dataset.label;
  }
  if (selectedColor) selectedColor.textContent = color;

  document.querySelectorAll('.height-option').forEach((option) => {
    option.classList.toggle('is-selected', option.querySelector('input').checked);
  });
  document.querySelectorAll('.color-option').forEach((option) => {
    option.classList.toggle('is-selected', option.querySelector('input').checked);
  });

  const message = `Hola DiegoStore, me interesa la escultura de San Francisco de Asís con Animales en altura [${height}] y color [${color}]. ¿Me podrían indicar el tiempo de impresión y el precio?`;
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  whatsappLinks.forEach((link) => {
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

[...heightInputs, ...colorInputs].forEach((input) => {
  input.addEventListener('change', refreshProductSelection);
});
refreshProductSelection();

if (customLink) {
  const customMessage = 'Hola DiegoStore, quisiera consultar por una medida personalizada (hasta 40 cm) o pintura artesanal para la escultura de San Francisco de Asís.';
  customLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customMessage)}`;
  customLink.target = '_blank';
  customLink.rel = 'noopener noreferrer';
}

document.querySelector('#zoom-button')?.addEventListener('click', () => {
  if (typeof zoomDialog?.showModal === 'function') zoomDialog.showModal();
});
document.querySelector('#close-zoom')?.addEventListener('click', () => zoomDialog?.close());
zoomDialog?.addEventListener('click', (event) => {
  if (event.target === zoomDialog) zoomDialog.close();
});

document.querySelector('#rotate-button')?.addEventListener('click', () => {
  productImage?.classList.toggle('is-turned');
});
document.querySelector('#reset-button')?.addEventListener('click', () => {
  productImage?.classList.remove('is-turned');
});
