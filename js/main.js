const cep = document.getElementById('cep')
const endereco = document.getElementById('endereco')
const cidade = document.getElementById('cidade')
const estado = document.getElementById('estado')

const consultaCEP = async (cepDigitado) => {
    const msgError = document.getElementById('erro')
    msgError.innerHTML = ""

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`)
        const data = await response.json()

        if (data.erro) {
            cidade.value = ''
            estado.value = ''
            endereco.value = ''
            cep.value = ''

            msgError.innerHTML = `<p>CEP inválido. Tente novamente</p>`
            return

        } else {
            cidade.value = data.localidade
            endereco.value = data.logradouro
            estado.value = data.uf
        }

    } catch (error) {
        msgError.innerHTML = `<p>CEP inválido. Tente novamente</p>`
        cidade.value = ''
        estado.value = ''
        endereco.value = ''
        cep.value = ''
        return;
    }
}

cep.addEventListener('focusout', (evento) => {
    consultaCEP(evento.target.value)
})