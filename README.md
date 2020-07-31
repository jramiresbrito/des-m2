# Desafio Módulo 2 - Bootcamp IGTI

Desafio realizado como requisito parcial à aprovação do módulo 2 (Criação de API's com Node.js e Express.js) do bootcamp Fullstack Developer IGTI.

A API fornece endpoints para manipulação do arquivo grades.json disponibilizado em <code>src/app/datasets</code>.

Os endpoints são:

- index&nbsp;&nbsp;&nbsp;<code>GET /</code>
- show &nbsp;&nbsp;&nbsp;<code>GET /:id</code>
- create &nbsp;&nbsp;<code>POST /</code>
- update &nbsp;<code>PUT /:id</code>
- destroy &nbsp;<code>DELETE /:id</code>
- sum &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>GET /sum/:student/:subject</code>
- average&nbsp;<code>GET /average/:subject/:type</code>
- top3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>GET /top3/:subject/:type</code>

Também forneci um arquivo de workspace do Insomnia com as requisições pré-configuradas. O arquivo encontra-se na raiz do projeto sob o nome <code>insomnia.json</code>.