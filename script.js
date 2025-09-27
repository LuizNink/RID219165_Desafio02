let botaoAdicionar = document.getElementById('botao-adicionar')
let contadorConcluidas = 0

botaoAdicionar.onclick = adicionar

function adicionar() {
    let nomeDaTarefa = document.getElementById('nome-da-tarefa').value
    let etq = document.getElementById('etiqueta').value

    if (!nomeDaTarefa) return

    let listaDeTarefas = document.getElementById('lista-de-tarefas')
    let li = document.createElement('li')

    let dataHoje = new Date().toLocaleDateString()

    li.innerHTML = `
    <div class="conteudo-tarefa">
        <div><span class="titulo">${nomeDaTarefa}</span></div>
        <div>
            <span class="etiqueta">${etq}</span>
            <span class="data">Criado em: ${dataHoje}</span>
        </div>
    </div>`

    const botaoConcluir = document.createElement('button')
    botaoConcluir.className = 'botao-concluir'
    botaoConcluir.innerHTML = 'Concluir'
    botaoConcluir.onclick = function() {
        li.classList.add('concluida')
        let titulo = li.querySelector('.titulo')
        titulo.style.textDecoration = 'line-through'
        titulo.style.color = 'gray'

        this.style.display = 'none'
        let check = document.createElement('span')
        check.className = 'check'
        check.textContent = '\u2714'
        li.appendChild(check)

        contadorConcluidas++
        atualizarFooter()

        salvarTarefas()
    }

    li.appendChild(botaoConcluir)
    listaDeTarefas.appendChild(li)

    document.getElementById('nome-da-tarefa').value = ''
    document.getElementById('etiqueta').value = ''

    salvarTarefas()
}

function salvarTarefas() {
    let lista = document.getElementById('lista-de-tarefas')
    let tarefas = []

    lista.querySelectorAll('li').forEach(li => {
        if (!li.classList.contains('concluida')) {
            let nome = li.querySelector('.titulo').textContent
            let etq = li.querySelector('.etiqueta').textContent
            let data = li.querySelector('.data').textContent
            tarefas.push({ nome, etq, data })
        }
    })

    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function carregarTarefas() {
    let lista = document.getElementById('lista-de-tarefas')
    lista.innerHTML = ''

    let tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || []

    tarefasSalvas.forEach(tarefa => {
        let li = document.createElement('li')
        li.innerHTML = `
        <div class="conteudo-tarefa">
            <div><span class="titulo">${tarefa.nome}</span></div>
            <div>
                <span class="etiqueta">${tarefa.etq}</span>
                <span class="data">${tarefa.data}</span>
            </div>
        </div>`

        const botaoConcluir = document.createElement('button')
        botaoConcluir.className = 'botao-concluir'
        botaoConcluir.innerHTML = 'Concluir'
        botaoConcluir.onclick = function() {
            li.classList.add('concluida')
            let titulo = li.querySelector('.titulo')
            titulo.style.textDecoration = 'line-through'
            titulo.style.color = 'gray'

            this.style.display = 'none'
            let check = document.createElement('span')
            check.className = 'check'
            check.textContent = '\u2714'
            li.appendChild(check)

            contadorConcluidas++
            atualizarFooter()
            salvarTarefas()
        }

        li.appendChild(botaoConcluir)
        lista.appendChild(li)
    })

    contadorConcluidas = 0
    atualizarFooter()
}

function atualizarFooter() {
    document.getElementById('footer-contador').textContent =
        `${contadorConcluidas} tarefas concluídas`
}

window.onload = carregarTarefas
