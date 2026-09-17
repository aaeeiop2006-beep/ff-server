const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// رؤوس الأمان والتنسيق للعبة
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});

// 1. نظام التحقق والخطأ ذو الـ 3 خطوات (مثل الصورة الأولى)
app.get('/version.json', (req, res) => {
    // محاكاة نظام قفل الـ UID وطلب التوثيق عبر الرابط الخاص بك
    res.json({
        "status": "error",
        "error_code": 400,
        "message": "فشل تسجيل الدخول إلى الخادم: 400",
        "alert_banner": "يرجى التحقق من معرف اللاعب (UID) لتفعيل السيرفر",
        "verification_url": "https://onrender.com", // رابط التوثيق الخاص بك
        
        // البيانات التي سيتم ضخها فور تخطي التحقق والاتصال
        "userData": {
            "diamonds": 999999,
            "gold": 999999,
            "incubator_vouchers": 500
        },
        "patch_url": "https://" + req.headers.host + "/patch_skins"
    });
});

// 2. تفعيل ضخ السكنات النادرة من السيرفر
app.get('/patch_skins', (req, res) => {
    res.json({
        "status": "success",
        "skin_patch_version": "max_2026_v1",
        "custom_mods": [
            {
                "item_type": "cloth",
                "original_id": "101001", // تبديل سكن البوت الافتراضي
                "replaced_id": "101009", // إظهار سكن الهيب هوب النادر
                "asset_source": "https://" + req.headers.host + "/files/hiphop_bundle.unity3d"
            },
            {
                "item_type": "emote",
                "original_id": "201001", // تبديل الرقصة العادية
                "replaced_id": "201015", // إظهار رقصة العرش الأسطورية
                "asset_source": "https://" + req.headers.host + "/files/chair_emote.unity3d"
            }
        ]
    });
});

// 3. مسار صفحة التوثيق ذات الثلاث خطوات
app.get('/verify', (req, res) => {
    res.send(`
        <html>
        <head><title>FF VIP SERVER VERIFICATION</title></head>
        <body style="font-family: Arial; text-align: center; margin-top: 50px; background-color: #121212; color: white;">
            <h2>سيرفر فري فاير ماكس الخاص - نظام التفعيل</h2>
            <p>يرجى إتمام الـ 3 خطوات لتفعيل الحساب وضخ الجواهر والسكنات:</p>
            <div style="margin: 20px; padding: 20px; border: 1px solid #ff9900; display: inline-block;">
                <h3>الخطوة 1: تخطي الرابط الإعلاني الأول</h3>
                <a href="https://render.com" target="_blank" style="color: #ff9900;">اضغط هنا للمتابعة</a>
            </div>
            <p style="color: gray; font-size: 12px;">بمجرد إتمام الخطوات، سيتم إرسال حزم البيانات إلى تطبيق MT Manager تلقائياً.</p>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log("Server with Verification and Skins is running.");
});
