import React, { useState } from 'react';
import api from "../axios";

function SearchTransactions() {
    const [storeName, setStoreName] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [totalAmount, setTotalAmount] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Função para buscar as transações
    const searchTransactions = async () => {
        if (!storeName) {
            setErrorMessage('Por favor, informe o nome da loja.');
            return;
        }
        setErrorMessage(''); // Limpar mensagem de erro

        try {
            // Chama a API com o parâmetro de consulta
            const response = await api.get(`/transactions/list/store`, {
                params: {
                    store_name: storeName,
                },
            });

            // Verifica a resposta
            if (response.data.message === 'Register found') {
                // Se a resposta contém dados vazios
                if (response.data.data.length === 0) {
                    setErrorMessage('Nenhuma transação encontrada para a loja informada.');
                    setTransactions([]);
                    setTotalAmount('0.00');
                } else {
                    // Se houver dados
                    setTransactions(response.data.data);
                    setTotalAmount(response.data.total_amount);
                }
            } else {
                setErrorMessage('Erro ao buscar transações.');
                setTransactions([]);
                setTotalAmount(null);
            }
        } catch (error) {
            setErrorMessage('Erro ao buscar transações.');
            setTransactions([]);
            setTotalAmount(null);
        }
    };

    return (
        <div>
            <h1>Pesquisa de Transações</h1>

            {/* Campo de pesquisa */}
            <div>
                <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Digite o nome da loja"
                />
                <button onClick={searchTransactions}>Pesquisar</button>
            </div>

            {/* Exibição de mensagens de erro */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {/* Exibindo os resultados */}
            {transactions.length > 0 && (
                <div>
                    <h2>Transações Encontradas</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>CPF</th>
                            <th>Cartão</th>
                            <th>Hora</th>
                            <th>Proprietário da Loja</th>
                            <th>Nome da Loja</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.cpf}</td>
                                <td>{transaction.card}</td>
                                <td>{transaction.time}</td>
                                <td>{transaction.storeOwner}</td>
                                <td>{transaction.storeName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Exibindo o valor total */}
                    <div>
                        <strong>Total de Transações: </strong> {totalAmount}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchTransactions;