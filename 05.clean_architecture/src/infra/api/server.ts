import { configDotenv } from 'dotenv';
import { app } from './express';

// Inicia variáveis de ambiente a partir do arquivo .env
configDotenv();
const PORT = process.env.PORT || 3000;

// Inicia o servidor Express na porta especificada
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
