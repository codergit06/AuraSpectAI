import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fetch from 'node-fetch'; 



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const apiUrl = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest";
const apiUrl ="https://api-inference.huggingface.co/models/michellejieli/emotion_text_classifier";
const apiToken = "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"; 

async function query(data) {
    const response = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
}

const app = express();

app.use(express.json());

app.use('/public', express.static('./public'));

app.post('/', async (req, res) => {
    try {
        const result = await query({ inputs: req.body.text });
        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing sentiment analysis');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Server listening on port: 3000');
});

//That's sick bro
//that's dope - that's cool , but dope means stupid
//That's lit 