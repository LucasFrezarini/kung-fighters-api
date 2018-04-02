import server from "./server/Server";
import Mongoose from "./database/mongoose/Mongoose";

server.start().then(() => {
	console.log(`Server running at: ${server.instance.info.uri}`);
	
	const db = new Mongoose();
//
	db.connect();
	
	db.connection.on('error', console.error.bind(console, 'connection error:'));
	db.connection.once('open', function() {
		console.log("Conectado ao MongoDB!");
	});
});