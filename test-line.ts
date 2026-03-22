/* eslint-disable prettier/prettier */
import { Client, TextMessage } from '@line/bot-sdk';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const client = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
});

const userId = 'Uc752210673247b7acd816535cf6bb6c0';
const message: TextMessage = {
  type: 'text',
  text: '🔔 ทดสอบระบบแจ้งเตือน\n\nยินดีด้วยครับ! การเชื่อมต่อ LINE Messaging API สำเร็จแล้ว\n\nรหัสของคุณคือ: ' + userId,
};

console.log('--- Sending Test Message ---');
client.pushMessage(userId, message)
  .then(() => {
    console.log('✅ Send success!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Send failed:', err);
    process.exit(1);
  });
