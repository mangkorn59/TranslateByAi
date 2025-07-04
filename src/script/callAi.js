// แปลภาษาโดยใช้ Gemini
async function createContent(content, prompt, apiKey) {
    let contentPrompt = prompt + "\n" + content;
    var messages = [
        { "role": "user", "content": contentPrompt },
    ];
    
    // ใช้ await เพื่อรอผลลัพธ์จาก callGeminiChatApi
    let checkData = await callGeminiChatApi(messages, apiKey);

    if (null === checkData) {
        throw new Error("❌ callGeminiChatApi >> `ไม่สามารถใช้งาน Gemini`");
    }

    const compareMessages = 
    `ช่วยเปรียบเทียบข้อมูลจากบทความทั้งสองด้านล่างนี้ 
    โดยบทความแรกคือบทความเก่าที่ยังไม่มีการแก้ไข 
    และบทความที่สองคือบทความใหม่ที่มีการแก้ไขแล้ว 
    กรุณาตรวจสอบว่าเนื้อหาในบทความใหม่มีความถูกต้อง ครบถ้วน และไม่บิดเบือนข้อมูลใด ๆ 
    จากบทความเก่า จากนั้นให้เขียนบทความฉบับใหม่ที่รวมข้อมูลที่ถูกต้อง ครบถ้วน 
    และไม่มีการบิดเบือน ผลลัพธ์จะต้องเป็นภาษาลาวเท่านั้น 
    และไม่ต้องใส่คำอธิบายหรือการวิเคราะห์จาก AI ใด ๆ ทั้งสิ้น
    และเพิ่มรูปแบบเช่น h1, h2, h3, p, ul, ol, li, strong, em, blockquote และอื่นๆที่จำเป็น`;
    messages[0].content = compareMessages + "\n" + "บทความใหม่: " + "\n" +  checkData + "\n" + "บทความเก่า: " + "\n" + content;
    
    let checkCompareData = await callGeminiChatApi(messages, apiKey);

    if (null === checkCompareData) {
        throw new Error("❌ callGeminiChatApi >> `ไม่สามารถใช้งาน Gemini`");
    }

    return checkCompareData;
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
