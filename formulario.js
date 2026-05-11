document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const checkboxes = document.querySelectorAll(".album_checkbox");
    const maxSelection = 3;

    form.addEventListener("submit", function(e) {
        const selectedAlbums = Array.from(checkboxes).filter(checkbox => checkbox.checked);

        if (selectedAlbums.length !== maxSelection) {
            e.preventDefault();
            alert('Devem ser selecionados exatamente 3 álbuns');
        }
    });

    const checkboxesEstilosMusicais = document.querySelectorAll('input[name="musical_interests"]');

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