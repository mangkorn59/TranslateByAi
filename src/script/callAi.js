// แปลภาษาโดยใช้ Gemini
async function createContent(content, apiKey) {
    var messages = [
        { "role": "user", "content": content },
    ];
    
    // ใช้ await เพื่อรอผลลัพธ์จาก callGeminiChatApi
    let checkData = await callGeminiChatApi(messages, apiKey);

    if (null === checkData) {
        throw new Error("❌ callGeminiChatApi >> `ไม่สามารถใช้งาน Gemini`");
    }

    return checkData;
}

// ฟังก์ชัน callGeminiChatApi
function callGeminiChatApi(messages, apiKey) {
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/chat/completions';
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'model': 'models/gemini-2.0-flash', // หรือโมเดลที่คุณเลือก
            'messages': messages
        })
    };

    return fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            if (data.choices && data.choices.length > 0) {
                const reply = data.choices[0].message.content; // ปรับให้ตรงกับข้อมูลที่ได้จาก API
                // แสดงผลลัพธ์ใน console
                return reply;
            } else {
                console.error('Error: ' + JSON.stringify(data));
                return null;
            }
        })
        .catch(error => {
            console.error('Exception: ' + error);
            return null;
        });
}

// ฟังก์ชันแสดง spinner
async function showSpinner() {
    document.getElementById("spinner-overlay").style.display = "flex";
}

// ฟังก์ชันซ่อน spinner
async function hideSpinner() {
    document.getElementById("spinner-overlay").style.display = "none";
}

// สร้างตัวอย่าง logger
const Logger = {
    log: (msg) => console.log('[LOG]', msg),
    error: (msg) => console.error('[ERROR]', msg),
};
