import chalk from "chalk"

function extraiLInks (arrLinks) {
   return arrLinks.map((objetoLInk) => Object.values(objetoLInk).join())
}

async function checaStatus (listaURLs) {
    const arrStatus = await Promise.all
    (
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url)
                return `${response.status} - ${response.statusText}`;
            } catch (erro) {
                return manejaErros(erro)
            }
        })
    )

    return arrStatus;
}

function manejaErros (erro) {
    if(erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';
    } else {
        return 'ocorreu algum erro inesperado'
    }
}


export default async function listaValidada (listaDeLinks) {
    const links = extraiLInks(listaDeLinks)
    const status = await checaStatus(links)
    
    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}



