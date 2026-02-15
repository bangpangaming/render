const express = require('express');
const app = express();

app.use(express.json());

// 📝 DAFTAR USER ID YANG PUNYA LISENSI
// TAMBAHKAN USER ID PEMBELI DI SINI!
const licensedUsers = [
    123456789,   // Contoh User ID 1
    987654321,   // Contoh User ID 2
    // Tambahkan User ID pembeli lainnya di bawah:
    
];

// ✅ Endpoint untuk cek lisensi
app.get('/verify/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const isLicensed = licensedUsers.includes(userId);
    
    console.log(`🔍 License check for User ID: ${userId} - Licensed: ${isLicensed}`);
    
    res.json({
        licensed: isLicensed,
        userId: userId,
        timestamp: new Date().toISOString()
    });
});

// 📢 Endpoint untuk laporan pelanggaran
app.post('/report-violation', (req, res) => {
    const { gameOwnerId, ownerType, gameName, placeId } = req.body;
    
    console.log('⚠️ ========================================');
    console.log('⚠️ VIOLATION DETECTED!');
    console.log(`⚠️ Game: ${gameName}`);
    console.log(`⚠️ Place ID: ${placeId}`);
    console.log(`⚠️ Owner ID: ${gameOwnerId} (${ownerType})`);
    console.log(`⚠️ Time: ${new Date().toLocaleString()}`);
    console.log('⚠️ ========================================');
    
    // TODO: Kirim notifikasi ke Discord/Email
    
    res.json({ 
        success: true,
        message: 'Violation reported'
    });
});

// 🏠 Homepage
app.get('/', (req, res) => {
    res.json({ 
        status: 'online',
        message: 'License API is running',
        endpoints: {
            verify: '/verify/:userId',
            report: '/report-violation'
        }
    });
});

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 License API running on port ${PORT}`);
    console.log(`📝 Total licensed users: ${licensedUsers.length}`);
});
