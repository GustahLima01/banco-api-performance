import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../helpears/autenticacao.js'; 
import { pegarBaseUrl } from '../utils/variaveis.js';

export const options = {
  iterations: 1
};

export default function() {
const token = obterToken()

const url = pegarBaseUrl() + '/transferencias';
//const url = __ENV.BASE_URL + '/transferencias'; //rodando via linha de comando apomtando o ambiente
//const url = 'http://localhost:3000/transferencias'; //rodando via k6 run

const payload = JSON.stringify({
  contaOrigiem: 1,
  contaDestino: 2,
  valor: 11,
  token: "token"
});

 const params = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
    };

  let res = http.post(url, payload, params);
  check(res, {
      'Validar que o Status é 201': (r)  => r.status === 201
    });
  sleep(1);
}
