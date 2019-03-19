# cashback
<p>
o projeto foi desenvolvido em node.js
<p>
clone ou faça o <i>download</i> do projeto e siga os passos abaixo:<br>
1 - 'npm install';<br>
2 - crie um banco mysql com o nome de 'cachback' (ou um nome de sua escolha, mas não esqueça de informá-lo nas configurações...);<br>
3 - edite as credenciais de conexão com o banco no arquivo 'knexfile.js';<br>
4 - execute 'knex migrate:latest';<br>
 5 - execute 'knex seed:run' para preencher a tabela com as taxas de <i>cachback</i>;<br>
6 - execute o procedimento abaixo para alimentar a tabela de albums*:<br>
<p>
a busca por album por gênero não está retornando dados. (https://github.com/spotify/web-api/issues/157)<br>
https://api.spotify.com/v1/search?q=genre%3A%22acoustic%22&limit=10&offset=0&type=album<br>
 Talvez pelo fato de um album poder conter vários gêneros...
<br>
 Foi feito uma busca por <i>track</i> (música) e armazenado os albuns encontrados, com o cuidade de não deixar repetí-los.<br>
<p>
para alimentar** o banco com albuns oriundos do spotify:<br>
1 - faca login***:<br>
http://localhost:3000/api/v1/autenticacoes/login<br>
será retornado o 'Bearer', por exemplo:<br>
{"Authorization":"Bearer BQCVJAWNedQ0vFtYRDZHlncFLELyrLD5x1Z_qvLjdzXVPonwhINMtz851GCZG2w2ih3aSFVhldxat-gCd-RRDXmpJ-LYvwmg_O6mv5FxO2kAmhNUojFZwhQrMY1FNtNe1CwjolWDSKt92Tztkv8oQLeA0h7oGPICJA"}<br>
<br>
2 - execute o comando 'node albumsseed' passando o valor de 'Bearer':
node albumsseed BQCVJAWNedQ0vFtYRDZHlncFLELyrLD5x1Z_qvLjdzXVPonwhINMtz851GCZG2w2ih3aSFVhldxat-gCd-RRDXmpJ-LYvwmg_O6mv5FxO2kAmhNUojFZwhQrMY1FNtNe1CwjolWDSKt92Tztkv8oQLeA0h7oGPICJA
Isso irá preencher a tabela 'albums' com mais de 50 títulos para cada gênero.<br>
<p>
 Para a <strong>paginação</strong>, foi usado o módulo 'knex-paginator', com ele é possivel definir rapidamente o 'offset', 'limit', 'orderby' esse módulo já disponibiliza as informações de quantidade de páginas e registros.
<p>
  Usou-se um <strong>middleware</strong> de autenticação, com o recurso de login*** da api do spotify. Assim, os recursos do usuário do spotify podem ser usados na api.
<p>  
  No projeto, encontra-se um arquivo .JSON com as configurações de <i>end-points</i> para facilitar os testes.
  <p>
  &#42; optou-se por padronizar o plural de album como albums, como no inglês;<br>
** optou-se por esse procedimento manual em fornecer o 'Bearer' por ser efetuado apenas uma vez (apenas para preencher a tabela de albums);<br>
*** não é possível gerar o <strong>Bearer</strong> pelo insomnia, é preciso usar o browser (digite: http://localhost:3000/api/v1/autenticacoes/login) (testado no chrome e edge)  para gerar o <strong>Bearer</strong>.
