#! /app/bin/node

const db = require('./config/database')
const spotify = require('./api/modules/spotify')
const { asyncForEach } = require('./api/utils/asyncUtils')
// bearer deve ser copiado do login e passado como argumento
// ex: node albumsseed BQB15CgKCyaoAH7m4QtxLCaPbnY33umCgK2_bXD6j7ISb4H88nZuxEBnzxKPqr70NAjuDHrCGf_2hoGqaGyVoaNmtk9XY9rBurM3n7Ma5IWABGlzZF9GtC5KpS_cOW24eFIC3frUYTqowokH572fLFNpESTdbw9aqA
const authorization = 'Bearer  ' + process.argv[2]

// funcao criada exclusivamente para popular a tabela de discos (albums)
async function alimentar () {
  try {
    await db('albums').del()
    // const generos = await spotify.genres(authorization)
    // poderia retornar os generos do spotify mas como vamos usar apenas 4, foi construido o objeto abaixo
    const generos = {
      'genres': [
        'pop',
        'mpb',
        'classical',
        'rock']
    }

    // o loop serve para retornar mais albums, pois o valdor do parametro 'limit' maximo é 50
    for (let i = 0; i < 10; i++) {
      await asyncForEach(generos.genres, async (genero) => {
        console.log('genero ' + genero)
        const albums = await spotify.search(genero, i * 50, authorization)
        await asyncForEach(albums.tracks.items, async (album) => {
          if (album.album.album_type === 'album') {
            const exist = await db('albums').where('nome', album.name)
            // para efeito didatico nao deixa inserir um album que já está no banco
            if (exist.length === 0) {
              console.log('inserindo')
              await db('albums').insert({
                nome: album.name,
                genero: genero,
                // preco ficou randomico de no minimo 10 reais
                preco: parseInt(Math.random() * 100) + 10
              })
            }
          }
        })
      })
    }

    process.exit()
  } catch (error) {
    console.log(error)
  }
}

alimentar()
