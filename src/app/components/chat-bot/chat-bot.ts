import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatBotService } from '../../services/chat-bot';

@Component({
  selector: 'app-chat-bot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bot.html',
})
export class ChatBot {
  chatbotService = inject(ChatBotService);
  cd = inject(ChangeDetectorRef);

  isOpen = false;
  isLoading = false;
  // Mock product data for testing
  products: any[] = [
    {
      id: 1,
      name: 'Headphones',
      price: 100,
      description:
        'Luxuary noise-cancelling headphones with superior sound quality for gaming and music',
      category: 'electronics',
    },
    {
      id: 2,
      name: 'Headphones',
      price: 79,
      description: 'Wireless noise-cancelling headphones',
      category: 'audio',
    },
    {
      id: 3,
      name: 'Phone Case',
      price: 25,
      description: 'Durable protective phone case',
      category: 'accessories',
    },
  ];

  messages: any[] = [
    {
      content: 'Hi there! 👋 How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ];

  inputValue: string = '';
  shouldScroll: boolean = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  closeChat() {
    this.isOpen = false;
  }

  sendMessage(text: string) {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    this.messages.push({
      content: trimmedText,
      sender: 'user',
      timestamp: new Date(),
    });
    this.inputValue = '';
    this.shouldScroll = true;

    setTimeout(() => {
      this.messages.push({
        content: this.generateBotResponse(trimmedText),
        sender: 'bot',
        timestamp: new Date(),
      });
      this.shouldScroll = true;
      this.cd.detectChanges();
    }, 500);
  }

  generateBotResponse(userInput: string): void {
    this.isLoading = true;
    this.chatbotService.sendMessage(userInput, this.products).subscribe(
      (response) => {
        this.messages.push({
          content: response.reply,
          sender: 'bot',
          timestamp: new Date(),
        });
        this.isLoading = false;
        this.cd.detectChanges();
      },
      (error) => {
        console.error('API Error:', error);
        this.messages.push({
          content: "Sorry, I'm having trouble responding right now.",
          sender: 'bot',
          timestamp: new Date(),
        });
        this.isLoading = false;
      },
    );
  }

  formatMessage(text: string): string {
    // Bold: **text** → <strong>text</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // // Italic: *text* → <em>text</em>
    // text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // // URLs to clickable links
    text = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" class="text-primary text-decoration-none">$1</a>',
    );

    return text;
  }
}
