function contadores() {
    fetch("http://localhost:3000/contador")
        .then(response => response.json())
        .then(data => {
            console.log("Dados recebidos:", data);
            document.getElementById("sim").textContent = data.sim;
            document.getElementById("nao").textContent = data.nao;
        })
        .catch(error => console.error("Erro ao buscar contadores:", error));
}

function somaContador(simnao) {
    const body = simnao === "sim" ? { sim: 1, nao: 0 } : { sim: 0, nao: 1 };
    
    fetch(`http://localhost:3000/contador`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Contador de "${simnao}" atualizado:`, data);
        document.getElementById("sim").textContent = data.sim;
        document.getElementById("nao").textContent = data.nao;
    })
    .catch(error => console.error(`Erro ao enviar "${simnao}":`, error));
}

window.onload = function() {
    contadores();
    document.getElementById("simButton").onclick = () => somaContador("sim");
    document.getElementById("naoButton").onclick = () => somaContador("nao");
};