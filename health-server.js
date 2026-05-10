import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Health endpoint for cron-job
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.get('/', (req, res) => {
    res.status(200).send('Bot is running');
});

app.listen(PORT, () => {
    console.log(`✅ Health server running on port ${PORT}`);
});