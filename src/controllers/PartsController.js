//models
const Parts = require("../infra/repository/parts.repository");
const parts = new Parts();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { promisify } = require("util");
const { response } = require("express");
const upload = multer({ dest: 'uploads/' });
const connection = require('../infra/database/connection');
const { promiseImpl } = require("ejs");

    

class partsController {
    

    /**
     * Registra uma peça
     * @returns mensagem referente ao resultado obtido
     */
    registerPeca() {
        return function (req, res) {
            const { data } = req.body;
           

            parts.registerPeca(data, file).then((response) => {
                if (response.error) return res.status(response.code).send({ error: response.error });
                else return res.status(200).json(response);
            }).catch((error) => {
                console.log(error);
                return res.status(400).send({ error: `Não foi possível realizar o cadastro!` });
            });
        };
    }

    /**
     * Lista todas as peças
     * @returns mensagem referente ao resultado obtido
     */
     listPeca() {
        return function (req, res) {
            const { numero } = req.params;
            
            parts.listPeca(numero).then((response) => {
                if (response.error) res.status(response.code).send({ error: response.error });
                else return res.status(200).send(response);
            }).catch((error) => {
                console.log(error);
                throw new Error(error);
            });
        }
    }

    /**
     * Atualiza os dados de uma peça
     * @returns mensagem referente ao resultado obtido
     */
    updatePeca() {
        return function (req, res) {
            const { data } = req.body;
            
            parts.updatePeca(data).then((response) => {
                if (response.error) res.status(400).send(response);
                else return res.status(200).send(response);
            }).catch((error) => {
                
                throw new Error(error);
            });
        }
    }

    /**
     * Delete uma peça
     * @returns mensagem referente ao resultado obtido
     */
     deletePeca() {
        return function (req, res) {
            const { numero } = req.params;
            
            parts.deletePeca(numero).then((response) => {
                if (response.error) res.send(400).send(response);
                else return res.status(200).send(response);
            }).catch((error) => {
                throw new Error(error);
            });
        }
    }

    /**
     * Insere uma peça
     * @returns mensagem referente ao resultado obtido
     */
    inserirPeca() {
        return function (req, res) {

            const { data } = req.body;
            const file  = req.file;

            parts.inserirPeca(data, file).then((response) => {
                if (response.error) res.send(400).send(response);
                else return res.status(200).send(response);
            }).catch((error) => {
                throw new Error(error);
            });
        }
         
              
      
    }
}

module.exports = partsController;



//     async insert(request, response){
//     const {
//         numero,
//         catalogo,
//         nome,
//         descricao,
//         data_entrada,
//         procedencia
//     } = request.body;
//     promisify(fs.rename)(path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", request.files[0].filename), path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", `${request.body.numero}.jpg`));
//     promisify(fs.rename)(path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", request.files[1].filename), path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", `${request.body.numero}-${request.files[1].filename}`));
//     const url_transcricao = `http://museu.fiecdev.kinghost.net/uploads/${request.body.numero}.jpg`;
//     const url_imagem = `http://museu.fiecdev.kinghost.net/uploads/${request.body.numero}-${request.files[1].filename}`;
//     await connection('pecas').insert({
//         numero,
//         catalogo,
//         nome,
//         descricao,
//         data_entrada,
//         procedencia,
//         url_transcricao,
//         url_imagem
//     }).then(parts => response.json({ parts })).catch(error => response.json({ error: `ER_DUP_ENTRY: Entrada 'NÚMERO DA PEÇA' duplicada para a chave 'PRIMARY'` }));
//     }},
// async select(request, response){
//     const { search } = request.query;
//     await connection('pecas')
//     .where('numero', 'like', `%${search}%`)
//     .select('*').then(parts => response.json(parts)).catch(error => response.json({ error: `${error}` }));
// },
// async delete(request, response) {
//     const { numero } = request.params;
//     const part = await connection('pecas').where('numero', numero).select('*').first();
//     const nomeTranscricao = part.url_transcricao.split('/')[4];
//     const nomeImagem = part.url_imagem.split('/')[4];
//     promisify(fs.unlink)(path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", nomeTranscricao));
//     promisify(fs.unlink)(path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", nomeImagem));
//     await connection('pecas').where('numero', numero).delete();
//     return response.status(204).send();
// },
// async listSpecificPart(request, response){
//     const { numero } = request.params;
//     const part = await connection('pecas')
//     .where('numero', numero)
//     .select('*')
//     .first();
//     return response.json(part);
// },
// async update(request, response){
//     const { id } = request.params;
//     const part = await connection('pecas').where('numero', id).select('*').first();
//     const { catalogo, nome, descricao, data_entrada, procedencia, url_transcricao, url_imagem } = request.body;
//     if(!url_transcricao && !url_imagem){
//         promisify(fs.rename)(path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", request.files[0].filename), path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", `${id}.jpg`));
//         promisify(fs.rename)(path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", request.files[1].filename), path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", `${id}-${request.files[1].filename}`));
//         const transcricao = `http://museu.fiecdev.kinghost.net/uploads/${id}.jpg`;
//         const imagem = `http://museu.fiecdev.kinghost.net/uploads/${id}-${request.files[1].filename}`;
//         const nomeTranscricao = part.url_transcricao.split('/')[4];
//         const nomeImagem = part.url_imagem.split('/')[4];
//         promisify(fs.unlink)(path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", nomeTranscricao));
//         promisify(fs.unlink)(path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", nomeImagem));
//         await connection('pecas').where('numero', id).update({ catalogo, nome, descricao, data_entrada, procedencia, url_transcricao: transcricao, url_imagem: imagem }).then(edited => response.json(edited)).catch(error => response.json());
//     }else if(!url_transcricao){
//         const nomeTranscricao = part.url_transcricao.split('/')[4];
//         promisify(fs.unlink)(path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", nomeTranscricao));
//         promisify(fs.rename)(path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", request.files[0].filename), path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", `${id}.jpg`));
//         const transcricao = `http://museu.fiecdev.kinghost.net/uploads/${id}.jpg`;
//         await connection('pecas').where('numero', id).update({ catalogo, nome, descricao, data_entrada, procedencia, url_transcricao: transcricao, url_imagem }).then(edited => response.json(edited)).catch(error => response.json());
//     }else if(!url_imagem){
//         promisify(fs.rename)(path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", request.files[0].filename), path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", `${id}-${request.files[0].filename}`));
//         const imagem = `http://museu.fiecdev.kinghost.net/uploads/${id}-${request.files[0].filename}`;
//         const nomeImagem = part.url_imagem.split('/')[4];
//         promisify(fs.unlink)(path.resolve(__dirname, "..", "..", "..", "..", "www", "museu", "uploads", nomeImagem));
//         await connection('pecas').where('numero', id).update({ catalogo, nome, descricao, data_entrada, procedencia, url_transcricao, url_imagem: imagem }).then(edited => response.json(edited)).catch(error => response.json());
//     }else{
//         await connection('pecas').where('numero', id).update({ catalogo, nome, descricao, data_entrada, procedencia, url_transcricao, url_imagem }).then(edited => response.json(edited)).catch(error => response.json());
//     }
// }
// }













