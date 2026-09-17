const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// التوجيه لنسخة فري فاير ماكس
app.get('/version.json', (req, res) => {
    res.json({
        "verAddr": "https://" + req.headers.host + "/",
        "resetGuest": true,
        "ForceUpdate": false,
        "NewVersion": "1.100.0", // تأكد من مطابقة إصدار اللعبة الحالي
        "patch_url": "https://" + req.headers.host + "/patch_skins",
        
        // ضخ الجواهر والبطاقات للواجهة
        "userData": {
            "diamonds": 999999,
            "gold": 999999,
            "incubator_vouchers": 500,
            "diamond_royale_vouchers": 500
        },
        "config": {
            "free_shopping": true,
            "max_mode": true // تفعيل وضع نسخة ماكس
        }
    });
});

// استقبال أوامر اللف الشراء داخل الحاضنة في فري فاير ماكس
app.post('/api/shop/royale', (req, res) => {
    res.json({
        "status": "success",
        "consumed_currency": 0,
        "reward_item_id": "incubator_stone_max"
    });
});

// مسار السكنات لنسخة ماكس (سنضيف السكنات هنا في الخطوة القادمة)
app.get('/patch_skins', (req, res) => {
    res.json({
        "status": "success",
        "skin_patch_version": "max_2026",
        "custom_mods": []
    });
});

app.listen(PORT, () => {
    console.log(`Server for FF MAX is running on port ${PORT}`);
});
