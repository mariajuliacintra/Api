const express = require("express"); //importando o módolo express

//Define uma classe para organizar a lógica da aplicação
class AppController {
  constructor() {
    //Cria uma nova instância
    //criar a instância do Express dentro da classe
    this.express = express();
    //Chama o método middlewares para configurar os middlewares
    this.middlewares();
    //Chama o método routes para definir as rotas da Api
    this.routes();
  }
  middlewares() {
    //Permitir que a aplicação receba dados em formato JSON nas requisições(solicitação)
    this.express.use(express.json());
  }
  //Define as rotas da nossa Api
  routes() {
    const users = [];
    this.express.post("/users", (req, res) => {
      const { id, nome, email, senha } = req.body;
      users.push({ id, nome, email, senha });
      res.status(200).send({ message: "Usuário cadastrado com sucesso" });
    });
    this.express.get("/users/:id", (req, res) => {
      const { id } = req.params;
      const user = users.find((user) => user.id == id);

      if (user) {
        res.status(200).send(user);
      } else {
        res.status(400).send({ message: "Usuário não encontrado" });
      }
    });
    this.express.post("/auth/", (req, res) => {
      const { email, senha } = req.body;
      const usuario = users.find((u) => u.email == email && u.senha == senha);
      console.log(usuario);
      if(usuario){
        res.status(200).send({ message: "Usuário autenticado com sucesso" });
      }
      else{
        res.status(400).send({ message: "Usuário não autenticado" });
      }
    });
  }
}

//Exportândo a instância de express configurada, para que seja acessada em outros arquivos
module.exports = new AppController().express;
