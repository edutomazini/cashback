# cashback

o projeto foi desenvolvido em node.js

baixe o projeto, execute:<br>
1 - 'npm install'<br>
2 - crie um banco mysql com o nome de 'cachback'<br>
3 - edite as credenciais de conexao com o banco no arquivo 'knexfile.js'<br>
4 - execute 'knex migrate:latest'<br>
5 - execute 'knex seed:run' para preencher a tabela com as taxas de cachback<br>
6 - execute o procedimento abaixo para alimentar a tabela de albums*.<br>
<br>
a busca por album por genero nao está retornando dados. (https://github.com/spotify/web-api/issues/157)<br>
https://api.spotify.com/v1/search?q=genre%3A%22acoustic%22&limit=10&offset=0&type=album<br>
<br>
Foi feito uma busca por 'track' (música) e armazenado os albums encontrados.<br>
<br>
para alimentar** o banco com discos oriundos do spotify:<br>
1 - faca login:<br>
http://localhost:3000/api/v1/autenticacoes/login<br>
será retornado o 'Bearer', por exemplo:<br>
{"Authorization":"Bearer BQCVJAWNedQ0vFtYRDZHlncFLELyrLD5x1Z_qvLjdzXVPonwhINMtz851GCZG2w2ih3aSFVhldxat-gCd-RRDXmpJ-LYvwmg_O6mv5FxO2kAmhNUojFZwhQrMY1FNtNe1CwjolWDSKt92Tztkv8oQLeA0h7oGPICJA"}<br>
<br>
2 - edite o arquivo 'albumsseed.js' e preencha a constante authorization com o valor de "Authorization" acima.<br>
3 - execute o comando 'node albumsseed', isso irá preencher a tabela 'albums' com mais de 50 titulos para cada genero.<br>
<br>
&#42; optou-se por padronizar o plural de album como albums, como no ingles;<br>
** optou-se por esse procedimento manual em fornecer o 'Bearer' por ser efetuado apenas uma vez (apenas para preencher a tabela de albums);<br>
