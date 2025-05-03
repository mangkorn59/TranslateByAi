async function createContentByDeepSeek(content) {
    var messages = [
        { "role": "user", "content": content },
    ];

    // ใช้ await เพื่อรอผลลัพธ์จาก callGeminiChatApi
    let checkData = await callDeepSeek(messages);

    if (null === checkData) {
        throw new Error("❌ callGeminiChatApi >> `ไม่สามารถใช้งาน Gemini`");
    }

    return checkData;
}

async function callDeepSeek(messages) {
    const apiKey = 'Bearer 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'; // ใส่ API key ของคุณ
    const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
    const options = {
        method: 'POST',
        headers: {
            "Authorization": apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'model': 'deepseek/deepseek-prover-v2:free',
            'messages': messages
        }),
    };

    return fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            if (data.choices && data.choices.length > 0) {
                const reply = data.choices[0].message.content; // ปรับให้ตรงกับข้อมูลที่ได้จาก API
                console.log('ตอบกลับ:', reply);
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