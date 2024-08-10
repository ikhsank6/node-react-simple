import app from "./app";
import sequelize from "./config/database";
import { connectRabbitMQ } from './config/rabbitmq';
import { startWorker } from "./workers/startWorker";
import listQueue from "./utils/listQueue";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected!");

        // await sequelize.sync({ force: false }); to migrate auto

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        const startAllWorkers = async () => {
            for (const queueType of Object.values(listQueue)) {
                await startWorker(queueType);
            }
        };
        
        connectRabbitMQ().then(async () => {
            startAllWorkers();

        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

startServer();
