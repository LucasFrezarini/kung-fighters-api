import server from "./server/Server";
import MongoDB from "./database/mongo/MongoDB";
import Product from "./database/mongo/models/Product";
//
server.start().then(() => {
	console.log(`Server running at: ${server.instance.info.uri}`);
	
	const db = MongoDB;

	db.connect();
	
	db.connection.on('error', console.error.bind(console, 'connection error:'));
	db.connection.once('open', function() {
		console.log("Conectado ao MongoDB!");

		Product.create({
			name: "teste",
      category: "teste",
      price: 231,
      model: "sei la",
      description: "Um teste daora",
      photos: [{
        title: "Foto",
        url: "asd"
      }]
		}).then(product => console.log(product))
		.catch(err => console.error(err));
	});
});