document.getElementById('cep').addEventListener('input', function(event) {
    let cep = event.target.value.replace(/\D/g, '');  // Remove qualquer caractere não numérico

    if (cep.length === 8) {
        // Formatação do CEP para o padrão 00000-000
        const formattedCep = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
        event.target.value = formattedCep;

        fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
            .then(response => {
                console.log('Resposta da API:', response);
                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Dados retornados:', data); 

                if (data && data.street) {
                    document.getElementById('logradouro').value = data.street || '';
                    document.getElementById('bairro').value = data.neighborhood || '';
                    document.getElementById('cidade').value = data.city || '';
                    document.getElementById('estado').value = data.state || '';
                } else {
                    alert('Não foi possível recuperar as informações do CEP. Dados ausentes.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao buscar o CEP. Tente novamente.');
            });
    }
});