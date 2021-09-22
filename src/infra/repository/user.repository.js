const db = require("../database/db");
const { response } = require('express');
require('dotenv').config({ path: __dirname + '/./../../../.env' });

class usersRepository {

    constructor() {
        this.db = db;
    }

    /**
     * Registra os dados de um usuário
     * @param {*} data dados do usuário
     * @returns mensagem referente ao resultado obtido
     */
    registerUsuario(data) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM usuarios WHERE email=?', [data.email],
                async (error, response) => {
                    if (error) return reject(new Error(error));
                    try {
                        if (response[0]) {
                            return resolve({ error: `usuario já cadastrado!`, code: 203 });
                        } else {
                            //const data = await encryptUser(data);
                            this.db.query(`INSERT INTO usuarios (email, senha, nome, cidade, pais, data_nasc, telefone, administrador) VALUES(?,?,?,?,?,?,?,?)`,
                                [data.email, data.senha, data.nome, data.cidade, data.pais, data.data_nasc, data.telefone, data.administrador]
                                , (error, response) => {
                                    if (error) throw error;
                                    console.log(data.nome);
                                    return resolve({ success: 'Usuario cadastrado com sucesso!'});
                                });
                        }

                    } catch (error) { console.log(error); return reject(new Error(error)); };
                });
        });
    }


     /**
     * Lista os dados de um usuario
     * @returns lista com todos os dados de um usuario
     */
      listUsuario(email) {
        return new Promise(async (resolve, reject) => {
           
            var query = email ? `WHERE email='${email}'` : '' ;
            try {
                this.db.query(`SELECT * FROM usuarios ${query} `, [],
                    async (error, usuario) => {
                        // console.log(error);
                        if (error) return reject(new Error(error));
                        if (usuario == "") return resolve({ error: `Usuário inexistente!`, code: 203});
                        else return resolve({ usuario: usuario });
                    });
            } catch (error) { return reject(new Error(error)); };
        });
      }
    


    /**
     * Atualiza os dados de um usuário
     * @param {*} data dados atualizados do usuário
     * @returns mensagem referente ao resultado obtido
     */
    updateUsuario(data) {
        return new Promise(async (resolve, reject) => {

            //const endata = await encryptUser(data);
            this.db.query('UPDATE usuarios SET senha=?, nome=?, cidade=?, pais=?, data_nasc=?, telefone=?, administrador=? WHERE email=?',
                [data.senha, data.nome, data.cidade, data.pais, data.data_nasc, data.telefone, data.administrador, data.email],
                (error, response) => {

                    if (error) return reject(new Error(error));
                    else return resolve({ success: 'Usuário atualizado com sucesso!' });
                });
        });
    }

    /**
     * Deleta um usuario cadastrado
     * @param {*} email EMAIL do usuario a ser excluído
     * @returns mensagem referente ao resultado obtido
     */
        deleteUsuario(email) {
            return new Promise((resolve, reject) => {
                this.db.query('DELETE FROM usuarios WHERE email=?', [email],
                    (error, doadores) => {
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
}

module.exports = usersRepository;