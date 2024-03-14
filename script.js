document.addEventListener("DOMContentLoaded", function() 
        {
            const tabuleiro = document.getElementById("tabuleiro");
            let jogadorAtual = "X";
            let vencedor = null;
            const reiniciarBtn = document.getElementById("reiniciar");
            
            const quadrados = document.querySelectorAll(".quadrado");

            for (let quadrado of quadrados) 
            {
                quadrado.addEventListener("click", clicar);
                tabuleiro.appendChild(quadrado);
            }

            reiniciarBtn.addEventListener("click", reiniciarJogo);
            // Função chamada quando uma célula é clicada
            function clicar() 
            {
                if (vencedor !== null) return; // O jogo acabou

                if (this.textContent !== "") return; // Célula já foi preenchida

                this.textContent = jogadorAtual;
                this.classList.add(jogadorAtual);

                if (checkVencedor()) 
                {
                    vencedor = jogadorAtual;
                    alert("O jogador " + jogadorAtual + " venceu!");
                    return;
                }

                if (checkEmpate()) 
                {
                    alert("Empate!");
                    return;
                }

                if (jogadorAtual === "X") 
                {
                    jogadorAtual = "O";
                }
                else 
                {
                    jogadorAtual = "X";
                };
            }

            function checkVencedor() 
            {
                const combinacoesVitoria = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6]
                ];

                for (const combo of combinacoesVitoria) 
                {
                    const [a, b, c] = combo;
                    if (quadrados[a].textContent !== "" && quadrados[a].textContent === quadrados[b].textContent && 
                        quadrados[a].textContent === quadrados[c].textContent) return true;
                }

                return false;
            }

            function checkEmpate()
            {
                return [...quadrados].every(quadrado => quadrado.textContent !== "");
            }

            function reiniciarJogo()
            {
                for (let quadrado of quadrados) 
                {
                    quadrado.classList.remove("X");
                    quadrado.classList.remove("O");
                    quadrado.textContent = "";
                }
                jogadorAtual = "X";
                vencedor = null;
            }
        });