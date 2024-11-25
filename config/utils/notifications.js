const admin = require('../config/firebase');

// Function to send a notification
async function sendNotification(token, title, body) {
    const message = {
        token: token,
        notification: {
            title: title,
            body: body,
        },
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Notification sent successfully:', response);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

module.exports = { sendNotification };
