const path = require('path');
const crypto = require('crypto');
const express = require('express');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 3005;
const HOST = '127.0.0.1';
const { IK_PUBLIC_KEY, IK_PRIVATE_KEY } = process.env;
const MAX_EXPIRY_MINUTES = 12 * 60;
const MISSING_KEYS_ERROR = 'IK_PUBLIC_KEY and IK_PRIVATE_KEY are not set. Copy samples/eml-playground/sample.env to .env, fill in both keys, and restart the playground.';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/signed-login/status', (_req, res) => {
    const configured = Boolean(IK_PUBLIC_KEY && IK_PRIVATE_KEY);
    res.json({ configured, error: configured ? undefined : MISSING_KEYS_ERROR });
});

app.get('/signed-login', (req, res) => {
    if (!IK_PUBLIC_KEY || !IK_PRIVATE_KEY) {
        return res.status(400).json({ error: MISSING_KEYS_ERROR });
    }

    const userEmail = String(req.query.email || '').trim();
    if (!userEmail) {
        return res.status(400).json({ error: 'email is required' });
    }

    const requestedMinutes = parseInt(req.query.expiresInMinutes, 10) || 60;
    const expiresInMinutes = Math.min(Math.max(requestedMinutes, 1), MAX_EXPIRY_MINUTES);
    const expiresAtUnix = String(Math.floor(Date.now() / 1000) + expiresInMinutes * 60);

    const loginSignature = crypto
        .createHmac('sha256', IK_PRIVATE_KEY)
        .update(`${userEmail}.${expiresAtUnix}`)
        .digest('hex');

    res.set('Cache-Control', 'no-store');
    res.json({ loginSignature, publicKey: IK_PUBLIC_KEY, userEmail, expiresAtUnix });
});

app.listen(PORT, HOST, () => {
    console.log(`EML playground running at http://${HOST}:${PORT}`);
    console.log(IK_PUBLIC_KEY && IK_PRIVATE_KEY
        ? 'Signed login: enabled'
        : `Signed login: disabled. ${MISSING_KEYS_ERROR}`);
});
