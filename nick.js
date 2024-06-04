const datos = {
    usuario1: {
        userName: 'Nixon',
        userApellido: 'Mancilla',
        userEmail: 'mancillanixon7@gmail.com',
        posts: {
            post1: {
                title: 'Post 1',
                coment: 'Comentario de post1',
                foto: 'foto de post1'
            },
            post2: {
                title: 'Post 2',
                coment: 'Comentario de post2',
                foto: 'foto de post2'
            },
            post3: {
                title: 'Post 3',
                coment: 'Comentario de post3',
                foto: 'foto de post3'
            }
        }
    },
    usuario2: {
        userName: 'Juan',
        userApellido: 'Pérez',
        userEmail: 'juanperez@example.com',
        posts: {
            post1: {
                title: 'Nuevo Post',
                coment: 'Comentario del nuevo post',
                foto: 'foto del nuevo post'
            }
        }
    }
};
console.log(datos.usuario2.posts.post1.coment);