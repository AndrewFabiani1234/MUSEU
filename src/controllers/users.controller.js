//models
const Users = require("../infra/repository/user.repository");
const users = new Users();

class usersController {
    
    /**
     * Realiza o login de um usuário
     * @returns mensagem referente ao resultado obtido
     */
    login() {
        return function (req, res) {
            const { data } = req.body;

            users.login(data).then((response) => {
                if (response.error) return res.status(response.code).send({ error: response.error });
                else return res.status(200).json(response);
            }).catch((error) => {
                console.log(error);
                return res.status(400).send({ error: `Não foi possivel realizar o login` });
            });
        };
    }

    /**
     * Registra um usuário
     * @returns mensagem referente ao resultado obtido
     */
    registerUsuario() {
        return function (req, res) {
            const { data } = req.body;

            users.registerUsuario(data).then((response) => {
                if (response.error) return res.status(response.code).send({ error: response.error });
                else return res.status(200).json(response);
            }).catch((error) => {
                console.log(error);
                return res.status(400).send({ error: `Não foi possível realizar o cadastro!` });
            });
        };
    }

    /**
     * Lista todos os doadores
     * @returns mensagem referente ao resultado obtido
     */
     listUsuario() {
        return function (req, res) {
            const { email } = req.params;
            
            users.listUsuario(email).then((response) => {
                if (response.error) res.status(response.code).send({ error: response.error });
                else return res.status(200).send(response);
            }).catch((error) => {
                console.log(error);
                throw new Error(error);
            });
        }
    }


    /**
     * Atualiza os dados de um usuário
     * @returns mensagem referente ao resultado obtido
     */
    updateUsuario() {
        return function (req, res) {
            const { data } = req.body;
            
            users.updateUsuario(data).then((response) => {
                if (response.error) res.status(400).send(response);
                else return res.status(200).send(response);
            }).catch((error) => {
                
                throw new Error(error);
            });
        }
    }

    /**
     * Delete um usuário
     * @returns mensagem referente ao resultado obtido
     */
     deleteUsuario() {
        return function (req, res) {
            const { email } = req.params;
            
            users.deleteUsuario(email).then((response) => {
                if (response.error) res.send(400).send(response);
                else return res.status(200).send(response);
            }).catch((error) => {
                throw new Error(error);
            });
        }
    }
}

module.exports = usersController;