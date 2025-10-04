import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../helpears/autenticacao.js'; 

export const options = {
  iterations: 1
};

export default function() {
const token = obterToken()

const url = 'http://localhost:3000/transferencias';

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
