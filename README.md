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
 6 - execute o procedimento abaixo para alimentar a tabela de <i>albums</i>*:<br>
<p>
a busca por álbum por gênero não está retornando dados. (https://github.com/spotify/web-api/issues/157)<br>
https://api.spotify.com/v1/search?q=genre%3A%22acoustic%22&limit=10&offset=0&type=album<br>
 Talvez pelo fato de um álbum poder conter vários gêneros...
<br>
 Foi feito uma busca por <i>track</i> (música) e de acordo co o gênero, armazenado os álbuns encontrados, com o cuidado de não deixar repeti-los.<br>
<p>
para alimentar** o banco com álbuns oriundos do spotify:<br>
1 - faça login***:<br>
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
  No projeto, encontra-se um arquivo .JSON (importe para o insominia) com as configurações de <i>end-points</i> para facilitar os testes.
  <p>
  Autenticação:
1 - usaremos o spotify apenas para preenchimento dos dados (permissao para cadastro de cliente e preenchimento da tabela 'albums' citado acima)****;
2 - usaremos o endpoint cliente/login para autenticar o cliente do site e efetuar as compras. Este deverá ser cadastrado no banco (criado o endpoint cliente/cadastro)
3 - na autenticação do cliente, iremos usar o jwt e gerar um <i>Bearer</i> (<i>token</i> que irá expirar em 24h) para ficar mais confortável a experiência de uso da api por parte do cliente final.
<p>
   &#42; optou-se por padronizar o plural de álbum como <i>albums</i>, como no inglês;<br>
** optou-se por esse procedimento manual em fornecer o 'Bearer' por ser efetuado apenas uma vez (apenas para preencher a tabela de álbuns);<br>
*** não é possível gerar o <strong>Bearer</strong> pelo insomnia, é preciso usar o browser (digite: http://localhost:3000/api/v1/autenticacoes/login) (testado no chrome e edge)  para gerar o <strong>Bearer</strong>.<br>
**** somente autenticações provenientes do Spotify podem criar clientes e visualizar todos os pedidos. isso é apenas para efeito didático.
