# cashback

o projeto foi desenvolvido em node.js

baixe o projeto, execute:
1 - 'npm install'
2 - crie um banco mysql com o nome de 'cachback'
3 - edite as credenciais de conexao com o banco no arquivo 'knexfile.js'
4 - execute 'knex migrate:latest'
5 - execute 'knex seed:run' para preencher a tabela com as taxas de cachback
6 - execute o procedimento abaixo para alimentar a tabela de albums*.

a busca por album por genero nao está retornando dados. (https://github.com/spotify/web-api/issues/157)
https://api.spotify.com/v1/search?q=genre%3A%22acoustic%22&limit=10&offset=0&type=album

Foi feito uma busca por 'track' (música) e armazenado os albums encontrados.

para alimentar** o banco com discos oriundos do spotify:
1 - faca login:
http://localhost:3000/api/v1/autenticacoes/login
será retornado o 'Bearer', por exemplo:
{"Authorization":"Bearer BQCVJAWNedQ0vFtYRDZHlncFLELyrLD5x1Z_qvLjdzXVPonwhINMtz851GCZG2w2ih3aSFVhldxat-gCd-RRDXmpJ-LYvwmg_O6mv5FxO2kAmhNUojFZwhQrMY1FNtNe1CwjolWDSKt92Tztkv8oQLeA0h7oGPICJA"}

2 - edite o arquivo 'albumsseed.js' e preencha a constante authorization com o valor de "Authorization" acima.
3 - execute o comando 'node albumsseed', isso irá preencher a tabela 'albums' com mais de 50 titulos para cada genero.

* optou-se por padronizar o plural de album como albums, como no ingles;
** optou-se por esse procedimento manual em fornecer o 'Bearer' por ser efetuado apenas uma vez (apenas para preencher a tabela de albums);
