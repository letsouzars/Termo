//selecionando os elementos HTML
const divisao = document.querySelector(".divisao")
const apagaEnter = document.querySelector("#apagar-e-enter")
const primeiraLinha = document.querySelector("#primeira-linha")
const segundaLinha = document.querySelector("#segunda-linha")
const terceiraLinha = document.querySelector("#terceira-linha")

//definindo as teclas
const teclaPrimeiraLinha = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const teclaSegundaLinha = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const teclaTerceiraLinha = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

//definindo as variaveis do jogo
const linha = 6
const coluna = 5
let linhaAtual = 0
let colunaAtual = 0

//definindo o array de palavras
let palavras = ['SENAI', 'NOITE', 'MILHO', 'LETRA', 'MOUSE']

//seleciona uma palavra aleatolria dentro do array palavras e guarda na variavel palavra
let palavra = palavras[Math.floor(Math.random() * palavras.length)]

let palavraMapa = {}
for (let i = 0; i < palavra.length; i++) {
    //separa as letras da palavra
    palavraMapa[palavra[i]] //separa cada letra em uma posiçao do palavraMapa -- palavraMapa['S', 'E', 'N', 'A', 'I']
}
const tentativas = []

//criando a grade de caixas de texto
for (let linhaIndex = 0; linhaIndex < linha; linhaIndex++) {
    //vai montar as linhas
    tentativas[linhaIndex] = new Array(coluna) //cria um novo array com o numero total de colunas
    const divisaoLinha = document.createElement('div') //cria uma nova div
    divisaoLinha.setAttribute('id', 'linha' + linhaIndex) //define o atributo ID
    divisaoLinha.setAttribute('class', 'div-linha')
    for (let colunaIndex = 0; colunaIndex < coluna; colunaIndex++) {
        //vai montar as colunas
        const divisaoColuna = document.createElement('div')
        divisaoColuna.setAttribute('id', 'linha' + linhaIndex + 'coluna' + colunaIndex)
        let classColuna;
        if (linhaIndex === 0) {
            classColuna = 'div-coluna digitando'
        } else {
            classColuna = 'div-coluna desativado'
        }
        divisaoColuna.setAttribute('class', classColuna)
        divisaoLinha.append(divisaoColuna) //adiciona a coluna como filho da linha
        tentativas[linhaIndex][colunaIndex] = '' //a tentativa começa vazia
    }
    divisao.append(divisaoLinha) //adiciona a linha como filho da divisao
}

const checkTentativa = () => {
    const tentativa = tentativas[linhaAtual].join('') //cria um objeto a partir do Arrray 'tentativas' usando o metodo join
    if (tentativa.length !== coluna) {
        //verifica se ja foi colocado uma letra (tentativa) na coluna
        return
    }
    let atColuna = document.querySelectorAll('.digitando')
    for (let i = 0; i < coluna; i++) {
        const letra = tentativa[index] //seleciona a letra conrrespondente a coluna atual
        if (palavraMapa[letra] === undefined) {
            //Verifica se a letra atual não existe no palavramMap
            atColuna[i].classList.add('errado')
        } else {
            if (palavraMapa[letra] === i) {
                atColuna[i].classList.add('certo')
            } else {
                atColuna[i].classList.add('deslocada')
            }
        }
    }
    if (tentativa ===palavra) {
        window.alert('Parabéns, você conseguiu!')
        return
    } else {
        if (linhaAtual === linha-1) {
            //verifica se todas as linhas ja foram
            window.alert('Errou!')
        } else {
            proximaLinha ()
        }
    }
}

const proximaLinha = () => {
    let digColuna = document.querySelectorAll('.digitando')
    //seleciona todos os elementos com a classe digitando
    for(let i = 0; i<digColuna; i++) {
        digColuna[i].classList.remove('digitando')
        digColuna[i].classList.add('desativado')
    }
    linhaAtual++
    colunaAtual = 0
    //linhaAtual++ para ir pra proxima linha e a coluna volta a ser 0 para ser a primeira caixinha da linha
    const linhaAtualElemento = document.querySelector('#linha'+linhaAtual)
    let atColuna = linhaAtualElemento.querySelectorAll('.div-coluna')
    for(let i = 0; i<atColuna.length; i++) {
        atColuna[i].classList.remove('desativado')
        atColuna[i].classList.add('digitando')
    }
}

//vai pegar as teclas digitadas -- key é uma palavra para keyboard, as teclas do teclado
const tecladoOnClick = key => {
    if (colunaAtual === coluna) {
        //Verifica se acabou as colunas
        return
    }
    const divAtual = document.querySelectorAll('#linha'+linhaAtual+'coluna'+colunaAtual)
    divAtual.textContent = key //O conteúdo do texto será igual a tecla digitada
    tentativas[linhaAtual][colunaAtual] = key
    colunaAtual++
}

const criarLinhaTeclado = (keys, linhaTeclado) => {
    keys.forEach(key => {
        //vai ler todas as teclas
        let botaoElemento = document.createElement('button') //vai criar os botoes

        botaoElemento.textContent = key 
        botaoElemento.setAttribute('id', key)
        botaoElemento.addEventListener('click', () => tecladoOnClick(key))
        linhaTeclado.append(botaoElemento)
    })
}

criarLinhaTeclado(teclaPrimeiraLinha, primeiraLinha)
criarLinhaTeclado(teclaSegundaLinha, segundaLinha)
criarLinhaTeclado(teclaTerceiraLinha, terceiraLinha)

const backspace = () => {
    if(colunaAtual === 0) {
        return
    }
    colunaAtual--
    tentativas[linhaAtual][colunaAtual] = '' //o quadro volta a ficar vazio
    const div = document.querySelector('#linha'+linhaAtual+'coluna'+colunaAtual)
    div.textContent = '' 
}

//criar o botao de apagar e enter
const backspaceBotao = document.createComment('button')
backspaceBotao.addEventListener('click', backspace)
backspaceBotao.textContent = '<x'
apagaEnter.append(backspaceBotao)

const enterBotao = document.createElement('button')
enterBotao.addEventListener('click', checkTentativa)
enterBotao.textContent = 'ENTER'
apagaEnter.append(enterBotao)

document.onkeydown = function(evt) {
    evt = evt || window.evt
    if (evt.key === 'Enter') {
        checkTentativa()
    } else if (evt.key === 'Backspace'){
        backspace()
    } else {
        tecladoOnClick(evt.key.toLocaleUpperCase())
    }
}