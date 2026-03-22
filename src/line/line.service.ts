import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, TextMessage, FlexMessage, FlexContainer } from '@line/bot-sdk';

@Injectable()
export class LineService {
  private readonly client: Client;
  private readonly logger = new Logger(LineService.name);

  constructor(private readonly configService: ConfigService) {
    const channelAccessToken = this.configService.get<string>(
      'LINE_CHANNEL_ACCESS_TOKEN',
    );
    const channelSecret = this.configService.get<string>('LINE_CHANNEL_SECRET');

    if (channelAccessToken && channelSecret) {
      this.client = new Client({
        channelAccessToken,
        channelSecret,
      });
    } else {
      this.logger.warn(
        'LINE Messaging API credentials not found in environment variables',
      );
    }
  }

  async pushMessage(to: string, text: string) {
    if (!this.client) return;
    try {
      const message: TextMessage = {
        type: 'text',
        text,
      };
      await this.client.pushMessage(to, message);
      this.logger.log(`Successfully sent push message to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send push message to ${to}`, error);
    }
  }

  async pushFlexMessage(to: string, altText: string, contents: FlexContainer) {
    if (!this.client) return;
    try {
      const message: FlexMessage = {
        type: 'flex',
        altText,
        contents,
      };
      await this.client.pushMessage(to, message);
      this.logger.log(`Successfully sent flex message to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send flex message to ${to}`, error);
    }
  }

  async broadcastMessage(text: string) {
    if (!this.client) return;
    try {
      const message: TextMessage = {
        type: 'text',
        text,
      };
      await this.client.broadcast(message);
      this.logger.log('Successfully sent broadcast message');
    } catch (error) {
      this.logger.error('Failed to send broadcast message', error);
    }
  }

  async broadcastFlexMessage(altText: string, contents: FlexContainer) {
    if (!this.client) return;
    try {
      const message: FlexMessage = {
        type: 'flex',
        altText,
        contents,
      };
      await this.client.broadcast(message);
      this.logger.log('Successfully sent broadcast flex message');
    } catch (error) {
      this.logger.error('Failed to send broadcast flex message', error);
    }
  }

  async replyMessage(replyToken: string, text: string) {
    if (!this.client) return;
    try {
      const message: TextMessage = {
        type: 'text',
        text,
      };
      await this.client.replyMessage(replyToken, message);
      this.logger.log(
        `Successfully sent reply message for token ${replyToken}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send reply message for token ${replyToken}`,
        error,
      );
    }
  }
}
