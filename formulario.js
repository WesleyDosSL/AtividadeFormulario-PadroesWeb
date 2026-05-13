document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const checkboxes = document.querySelectorAll(".album_checkbox");
    const checkboxesEstilosMusicais = document.querySelectorAll('input[name="musical_interests"]');

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Impede o recarregamento automático do navegador

        // 1. Limpa os erros antigos da tela a cada nova tentativa
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        const resumoErrosDiv = document.getElementById('resumo_erros');
        const listaErros = document.getElementById('lista_erros');
        listaErros.innerHTML = '';
        resumoErrosDiv.classList.add('hidden');
        
        let temErros = false;

        // Função auxiliar para inserir erros na tela (embaixo do input) e no quadro de resumo
        function adicionarErro(elemento, mensagem) {
            temErros = true;
            
            const span = document.createElement('span');
            span.className = 'error-message';
            span.style.color = 'red';
            span.style.fontSize = '0.9em';
            span.style.display = 'block';
            span.style.marginBottom = '10px';
            span.innerText = mensagem;
            
            // Tenta inserir logo após o elemento
            elemento.parentNode.insertBefore(span, elemento.nextSibling);

            // Adiciona o erro na div de Sumário de Erros (com um clique pra jogar o foco lá)
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.innerText = mensagem;
            link.style.color = 'red';
            link.addEventListener('click', (evento) => {
                evento.preventDefault();
                // Se o elemento for um campo de digitação, foca nele. Se for painel, acha o primeiro input dentro dele
                if (elemento.tagName === 'INPUT' || elemento.tagName === 'SELECT') {
                    elemento.focus();
                } else {
                    const primeiroInput = elemento.querySelector('input');
                    if (primeiroInput) primeiroInput.focus();
                }
            });
            li.appendChild(link);
            listaErros.appendChild(li);
        }

        // --- COMEÇO DAS REGRAS JS ---

        // Nome
        const inputNome = document.getElementById('nome');
        if (inputNome.value.trim() === '') {
            adicionarErro(inputNome, 'O campo Nome é obrigatório.');
        }

        // Email (regex básico)
        const inputEmail = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputEmail.value)) {
            adicionarErro(inputEmail, 'Por favor, insira um e-mail válido.');
        }

        // Telefone (deve respeitar a pattern estabelecida: "XX XXXXX-XXXX")
        const inputTel = document.getElementById('telefone');
        const telRegex = /^[0-9]{2} [0-9]{5}-[0-9]{4}$/;
        if (!telRegex.test(inputTel.value)) {
            adicionarErro(inputTel, 'Telefone inválido. Siga perfeitamente o padrão com espaços: 11 99999-9999');
        }

        // Data de Nascimento (Maior de 18, Máximo 120 anos)
        const inputData = document.getElementById('birthdate');
        if (!inputData.value) {
            adicionarErro(inputData, 'A data de nascimento é obrigatória.');
        } else {
            const birthDate = new Date(inputData.value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                adicionarErro(inputData, 'É preciso ter pelo menos 18 anos de idade.');
            }
            if (age > 120) {
                adicionarErro(inputData, 'A data de nascimento é muito antiga.');
            }
        }

        // Estilos Musicais (mínimo 1)
        const estilosSelecionados = Array.from(checkboxesEstilosMusicais).filter(c => c.checked);
        if (estilosSelecionados.length === 0) {
            // Pega o fieldset correspondente para ancorar a mensagem
            const fieldsetEstilos = checkboxesEstilosMusicais[0].closest('fieldset');
            adicionarErro(fieldsetEstilos, 'Você deve selecionar pelo menos 1 estilo musical.');
        }

        // Álbuns (Exatamente 3)
        const selectedAlbums = Array.from(checkboxes).filter(c => c.checked);
        if (selectedAlbums.length !== 3) {
            const ulAlbums = checkboxes[0].closest('ul');
            adicionarErro(ulAlbums, 'Você deve selecionar exatamente 3 álbuns preferidos.');
        }

        // --- FINALIZAÇÃO DO ENVIO ---
        if (temErros) {
            // Mostra a caixa vermelha lá embaixo com todos os links
            resumoErrosDiv.classList.remove('hidden');
        } else {
            // SUCESSO 100%
            alert("Tudo validado com sucesso! Nenhuma falha encontrada.\n.");
        }
    });

    checkboxesEstilosMusicais.forEach(function(checkbox) {

            checkbox.addEventListener('change', function() {
                const caixa = document.getElementById('caixa_' + this.value);
            
            if (this.checked) {
                caixa.classList.remove('hidden');
            }
            else {
                caixa.classList.add('hidden');

                caixa.querySelector('textarea').value = '';
                
            }
        });
    })

    form.addEventListener("reset", function() {
        checkboxesEstilosMusicais.forEach(function(checkbox) {
            const caixa = document.getElementById('caixa_' + checkbox.value);
            caixa.classList.add('hidden');
            caixa.querySelector('textarea').value = '';
        });
    })
});