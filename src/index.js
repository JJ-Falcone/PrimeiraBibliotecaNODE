import fs from 'fs';
import chalk from 'chalk';


function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.]*.[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))

    return resultados.length !== 0 ? resultados : 'Não há links no arquivo';
}


function trataErro(erro){
    //console.log(erro);
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

// async/await

async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro)
    } finally {
        console.log(chalk.yellow('operação concluída'));
    }
}


export default pegaArquivo;


// promises com then()

/*function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8'
    fs.promises
        .readFile(caminhoDoArquivo, encoding)
        .then((texto) => console.log(chalk.green(texto)))
        .catch(trataErro)
}*/


//  " \[[^[\]]*?\] " expressão regular para capturar tudo dentro "[]" para pegar os titulos dos link

//  " \(https?:\/\/[^\s?#.]*.[^\s]*\) " expressão regular para capturar tudo dentro () para pegar os links

//  " \[([^[\]]*?)\]\((https?:\/\/[^\s?#.]*.[^\s]*)\) " expressão regular completa com () real dividindo em 2 grupos para melhor captura de informações