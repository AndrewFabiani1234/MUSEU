const db = require("../database/db");
const { response } = require('express');
require('dotenv').config({ path: __dirname + '/./../../../.env' });
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

class partsRepository {

    constructor() {
        this.db = db;
    }

    /**
     * Registra os dados de uma peça
     * @param {*} data dados da peça
     * @returns mensagem referente ao resultado obtido
     */
    registerPeca(data) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM pecas WHERE numero=?', [data.numero],
                async (error, response) => {
                    if (error) return reject(new Error(error));
                    try {
                        if (response[0]) {
                            return resolve({ error: `Peça já cadastrada!`, code: 203 });
                        } else {
                            //const data = await encryptUser(data);
                            this.db.query(`INSERT INTO pecas (numero, catalogo, nome, descricao, data_entrada, procedencia, url_transcricao, url_imagem) VALUES(?,?,?,?,?,?,?,?)`,
                                [data.numero, data.catalogo, data.nome, data.descricao, data.data_entrada, data.procedencia, data.url_transcricao, data.url_imagem]
                                , (error, response) => {
                                    if (error) throw error;
                                    console.log(data.numero);
                                    return resolve({ success: 'Peça cadastrada com sucesso!'});
                                });
                        }

                    } catch (error) { console.log(error); return reject(new Error(error)); };
                });
        });
    }

     /**
     * Lista as peças a partir do numero
     * @returns lista com todos os dados de uma paça
     */
      listPeca(numero) {
        return new Promise(async (resolve, reject) => {
           
            var query = numero ? `WHERE numero='${numero}'` : '' ;
            try {
                this.db.query(`SELECT * FROM pecas ${query} `, [],
                    async (error, peca) => {
                        // console.log(error);
                        if (error) return reject(new Error(error));
                        if (peca == "") return resolve({ error: `Peça inexistente!`, code: 203});
                        else return resolve({ peca: peca });
                    });
            } catch (error) { return reject(new Error(error)); };
        });
      }
    


    /**
     * Atualiza os dados de uma peça
     * @param {*} data dados atualizados da peça
     * @returns mensagem referente ao resultado obtido
     */
    updatePeca(data) {
        return new Promise(async (resolve, reject) => {

            //const endata = await encryptUser(data);
            this.db.query('UPDATE pecas SET catalogo=?, nome=?, descricao=?, data_entrada=?, procedencia=?, url_transcricao=?, url_imagem=? WHERE numero=?',
                [data.catalogo, data.nome, data.descricao, data.data_entrada, data.procedencia, data.url_transcricao, data.url_imagem, data.numero],
                (error, response) => {
                    if (error) return reject(new Error(error));
                    else return resolve({ success: 'Peça atualizada com sucesso!' });
                });
        });
    }

    /**
     * Deleta uma peça cadastrada
     * @param {*} numero NUMERO da peça a ser excluída
     * @returns mensagem referente ao resultado obtido
     */
         deletePeca(numero) {
            return new Promise((resolve, reject) => {
                this.db.query('DELETE FROM pecas WHERE numero=?', [numero],
                    (error, pecas) => {
                        if (error) return reject(new Error(error));
                        else {
                            if (error)  return reject(new Error(error));
                            //Resolver problema do CPF invalido
                            // if (doadores == true) return resolve({ error: `Doador inexsiste!`, code: 203});
                            else return resolve(true);
                        }
                    });
            });
        }


        inserirPeca(data, file) {
            return new Promise((resolve, reject) => {
                this.db.query('SELECT * FROM pecas WHERE numero=?', [data.numero],
                    async (error, response) => {
                        if (error) return reject(new Error(error));
                        try {
                            if (response[0]) {
                                return resolve({ error: `Peça já cadastrada!`, code: 203 });
                            } else {
                             
                                this.db.query(`INSERT INTO pecas (numero, catalogo, nome, descricao, data_entrada, procedencia, url_transcricao, url_imagem) VALUES(?,?,?,?,?,?,?,?)`,
                                    [data.numero, data.catalogo, data.nome, data.descricao, data.data_entrada, data.procedencia]
                                    , (error, response) => {
                                        if (error) throw error;
                                        console.log(data.numero);
                                        return resolve({ success: 'Peça cadastrada com sucesso!'});
                                    });
                            }
    
                        } catch (error) { console.log(error); return reject(new Error(error)); };
                    });
            });
        }


}

module.exports = partsRepository;