import server from "./server/Server";
import db from "./database/mongo/MongoDB";
import ProductService from "./product/ProductService";

db.connect();

db.connection.on('error', console.error.bind(console, 'connection error:'));
db.connection.once('open', function() {
	console.log("Conectado ao MongoDB!");
	server.start().then(() => {
		console.log(`Server running at: ${server.instance.info.uri}`);
	});
});