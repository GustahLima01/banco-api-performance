import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  //iterations: 50, //quantidade de iterações que vai executar
  // vus:10, //quantidade de usuários virtuais que vão executar o teste, substitui o iterations acima
  // duration: '30s', //tempo que o teste vai durar (substitui o iterations acima)

  stages: [ //simula o comportamento real dos usuários  
    { duration: '5s', target: 10 }, //2 minutos para subir até 10 usuários
    { duration: '20s', target: 10 }, //manter 10 usuários por 5 minutos
    { duration: '5s', target: 0 } //2 minutos para descer até 0 usuários
  ],
  thresholds: { //metas de performance alinhada com o time
    http_req_duration: ['p(90)<3000', 'max<5000'], //90% das requisições devem ser menores que 10ms e o tempo máximo de resposta deve ser menor que 1s
    http_req_failed: ['rate<0.01'], //taxa de erro, menor que 1%
  }
};

export default function () {
    //teste do login
    const url = 'http://localhost:3000/login';

    const payload = JSON.stringify({ //transforma o objeto em json
        username: 'julio.lima',
        senha: '123456',
    });

    const params = {
        headers: {
        'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);
    // console.log(resposta)

    //check = no K6 servem só para informar se a API está ok
    check(res, {
      //'Validar que o Status é 200' = propriedade = é o nome do que quero testar
      'Validar que o Status é 200': (r)  => r.status === 200,
      'Validar que o token é string': (r) => typeof(r.json().token) === 'string',
    })

    sleep(1);      

}