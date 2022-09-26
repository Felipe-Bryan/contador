let listaLinhaProduto = document.querySelectorAll('.produto');
let listaInputsEntrada = document.querySelectorAll('.iptEntrada');
let listaInputsSaida = document.querySelectorAll('.iptSaida');
let listaInputsTotal = document.querySelectorAll('.totalIpt');
let produtos = JSON.parse(localStorage.getItem('produtos'));

let doritosFlag = false;
let doritosItems = document.querySelectorAll('.doritos');

if (!produtos) {
  produtos = [];
  listaLinhaProduto.forEach((element, index) => {
    element = {
      id: index,
      qt: 0,
    };
    produtos.push(element);
  });
}

listaInputsTotal.forEach((element, index) => {
  element.innerHTML = produtos[index].qt;
});

listaInputsEntrada.forEach((element, index) => {
  element.addEventListener('blur', () => {
    calc(index);
  });
});

listaInputsSaida.forEach((element, index) => {
  element.addEventListener('blur', () => {
    calc(index);
  });
});

function calc(i) {
  let atual = Number(listaInputsTotal[i].innerHTML);
  let entrada = Number(listaInputsEntrada[i].value);
  let saida = Number(listaInputsSaida[i].value);

  let total = atual + entrada - saida;

  listaInputsTotal[i].innerHTML = total;

  produtos[i].qt = total;

  listaInputsEntrada[i].value = '';
  listaInputsSaida[i].value = '';

  saveStorage();
}

function saveStorage() {
  localStorage.setItem('produtos', JSON.stringify(produtos));
}

function limpar() {
  const confirmation = Boolean(confirm('Deseja limpar todos os itens?'));
  if (!confirmation) {
    return;
  }
  localStorage.removeItem('produtos');
  location.href = '/index.html';
}

function showDoritos() {
  if (!doritosFlag) {
    doritosFlag = true;

    doritosItems.forEach((element, index) => {
      element.style = '';
    });
  } else {
    doritosFlag = false;

    doritosItems.forEach((element, index) => {
      element.style = 'display: none';
    });
  }
}
