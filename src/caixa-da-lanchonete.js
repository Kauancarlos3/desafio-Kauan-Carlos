class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        const opcoesPagamento = ['dinheiro', 'debito', 'credito'];
        
        //verificação método de pagamento
        if (!opcoesPagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        };
       
        //verificação se existe item no carrinho de compra
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let total = 0;
        let desconto = 0;
        let acrescimo = 0;

        let escolheuQueijo = false;
        let escolheuSanduiche = false;
        let escolheuCafe = false;
        let escolheuChantily = false;

        // laço de repetição for para percorrer um array e separa-los
        for (let i = 0; i < itens.length; i++) {
            const item = itens[i];
            const partes = item.split(',');

            const codigo = partes[0];//retorna codigo(nome) do item pedido
            const qtd = parseInt(partes[1]);//retorna a quantidade de item pedido

            //objeto literal dos preços
            const precos = {
                'cafe': 3.00,
                'chantily': 1.50,
                'suco': 6.20,
                'sanduiche': 6.50,
                'queijo': 2.00,
                'salgado': 7.25,
                'combo1': 9.50,
                'combo2': 7.50
            }

            //verificação quantidade
            if (codigo == '0') {
                return "Quantidade inválida!";
            }

            if (qtd === 0) {
                return "Quantidade inválida!";
            }

            //verificação pedidos extras 
            if (codigo === 'chantily') {
                escolheuChantily = true;
            } else if (codigo === 'cafe') {
                escolheuCafe = true;
            }

            if (codigo === 'queijo') {
                escolheuQueijo = true;
            } else if (codigo === 'sanduiche') {
                escolheuSanduiche = true;
            }

            //veirifação de item válido e soma
            if (codigo in precos) {
                const precoUnidade = precos[codigo];
                const subtotal = precoUnidade * qtd;
                total += subtotal;

            } else {
                return "Item inválido!";
            }

        }

        //verificação pedidos extras
        if (escolheuQueijo && !escolheuSanduiche) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (escolheuChantily && !escolheuCafe) {
            return "Item extra não pode ser pedido sem o principal";
        }

        //desconto pagamento em dinheiro
        if (metodoDePagamento === 'dinheiro') {
            desconto = total * 0.05;
            total -= desconto;
        }
        //acréscimo pagamento em crédito
        if (metodoDePagamento === 'credito') {
            acrescimo = total * 0.03;
            total = total + acrescimo;
        }

        //retorno resultado
        return "R$ " + total.toFixed(2).replace('.', ',');

    }
}

let caixaDaLanchonete = new CaixaDaLanchonete();

caixaDaLanchonete.calcularValorDaCompra('credito', ['chantily,1', 'sanduiche,1']);


export { CaixaDaLanchonete };