const connection = require('../database/connection');
const md5 = require('md5');

module.exports = {
    async create(request, response){
        const { email, password } = request.body;
        const senha = md5(password);
        const user = await connection('usuarios')
        .where({ email, senha })
        .select('*')
        .first();
        if(!user){
            return response.json({ msgError: `No user was found in the database` });
        }
        return response.json(user);
    }
}