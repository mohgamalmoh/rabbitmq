const amqp = require("amqplib");

connect();
async function connect() {
    try{
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.consume("jobs", message=> {
            const input = JSON.parse(message.content.toString()).number;
            console.log("Received : "+ input);

            if(input == 19){
                channel.ack(message);
            }
        });
        console.log("wating for messages . . . ")

    }catch (e) {
        console.log(e)
    }
}