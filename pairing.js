import { default as makeWASocket, useMultiFileAuthState, Browsers } from 'baileys';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('📱 Enter your WhatsApp number (with country code, no +): ', async (number) => {
    console.log('\n⏳ Requesting pairing code...\n');
    
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const sock = makeWASocket({
        auth: state,
        browser: Browsers.ubuntu('Chrome'),
        printQRInTerminal: false
    });
    
    sock.ev.on('creds.update', saveCreds);
    
    setTimeout(async () => {
        try {
            const code = await sock.requestPairingCode(number);
            console.log('\n🔐 =========================================🔐');
            console.log(`🔐 YOUR PAIRING CODE: ${code}`);
            console.log('🔐 WhatsApp → Settings → Linked Devices → Link with Code');
            console.log('🔐 =========================================🔐\n');
        } catch (err) {
            console.error('❌ Error:', err.message);
        }
        process.exit(0);
    }, 3000);
});