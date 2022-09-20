import './style.css';

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const LISTA_INICIAL_ID = 'lista-inicial';
const LISTA_COM_NOISE_ID = 'lista-com-noise';
const RESULTADO_ID = 'resultado';
let documento: string = `

  <h1>Teste de Hamming code</h1> 
  <div>
    <input id="input"></input>
  </div>

  <h3>Lista inicial com bit de paridade: 
    <span id="${LISTA_INICIAL_ID}"></span>
  </h3>
  
  <h3>Lista com noise: 
    <span id="${LISTA_COM_NOISE_ID}"></span>
  </h3>

  <h3>Lista tem Paridade: 
    <span id="${RESULTADO_ID}"></span>
  </h3>
`;
appDiv.innerHTML = documento;

document.querySelector('#input').onkeyup = () => {
  let input = document.querySelector('#input').value;
  let listaBits = obterListaBits(input);
  renderizarLista(listaBits, LISTA_INICIAL_ID);

  let listaBitsComNoise = obterListaComNoise(listaBits);
  renderizarLista(listaBitsComNoise, LISTA_COM_NOISE_ID);

  renderizaResultadoParidade(listaBitsComNoise);
};

function renderizaResultadoParidade(listaBits: number[]) {
  let numeroDeUns = 0;
  listaBits.map((bit) => {
    if (bit === 1) numeroDeUns++;
  });

  let temParidade = numeroDeUns % 2 === 0;
  console.log(numeroDeUns);

  let resultadoElemento = document.querySelector('#' + RESULTADO_ID);
  if (temParidade) resultadoElemento.innerHTML = 'Sim, lista de bits é valida';
  else resultadoElemento.innerHTML = 'Não, houve um bitflip';
}

function obterListaComNoise(listaBits: Array<number>): Array<number> {
  var introduziuNoise = false;
  var listaComNoise = [];
  listaBits.map((p) => {
    var deveIntroduzirNoise =
      !introduziuNoise && new Date().getMilliseconds() % 2 == 0;

    if (deveIntroduzirNoise) {
      introduziuNoise = true;

      var xBitFlipado = p === 0 ? 1 : 0;
      listaComNoise.push(xBitFlipado);

      return;
    }

    listaComNoise.push(p);
  });

  return listaComNoise;
}

function obterListaBits(valor: string): Array<number> {
  let listaBits = [];

  var numeroUns = 0;
  for (var i = 0; i <= valor.length - 1; i++) {
    var char = valor[i];
    var bitEhUm = Number(char) == 1;

    if (bitEhUm) {
      listaBits.push(1);
      numeroUns += 1;
    } else {
      listaBits.push(0);
    }
  }

  var bitsTemParidade = numeroUns % 2 == 0;
  var bitParidade = bitsTemParidade ? 0 : 1;

  listaBits = [bitParidade, ...listaBits];

  return listaBits;
}

function renderizarLista(valor: Array<number>, seletor: string) {
  let listaBitsHtml = [];

  for (var i = 0; i <= valor.length - 1; i++) {
    var char = valor[i];
    var bitEhUm = Number(char) === 1;

    if (i === 0) {
      listaBitsHtml.push(bitParidade(char));
    } else if (bitEhUm) {
      listaBitsHtml.push(um());
    } else {
      listaBitsHtml.push(zero());
    }

    renderizaLista(listaBitsHtml, seletor);
  }
}

function renderizaLista(bits: Array<string>, seletor: string): void {
  let resultado = bits.join('');

  document.querySelector('#' + seletor).innerHTML = `<h1>${resultado}</h1>`;
}

function bitParidade(bit: number): string {
  return `<span style="border: 2px solid green">${bit}</span>`;
}

function um(): string {
  return `<span style="border: 1px solid blue">1</span>`;
}

function zero(): string {
  return `<span style="border: 1px solid black">0</span>`;
}
