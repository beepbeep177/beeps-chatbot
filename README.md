# 💼 Resume Chatbot - Bea's AI Assistant

An intelligent chatbot that answers questions about Bea Therese Y. Paras' professional background, built with Next.js and AWS Bedrock AI.

## 🚀 Live Demo

[**Try the chatbot here**](https://beeps-chatbot-git-main-bea-therese-paras-projects.vercel.app/chat)

## ✨ Features

- 🤖 **AI-Powered Responses** - Uses Amazon Nova Lite for natural conversations
- 💬 **iMessage-Style UI** - Clean, familiar chat interface
- 📄 **PDF Resume Access** - Direct link to view full resume
- 🎯 **Smart Responses** - Context-aware answers with proper formatting
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Real-time Chat** - Instant responses with typing indicators

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI**: AWS Bedrock (Amazon Nova Lite)
- **Deployment**: Vercel
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js 18+ 
- AWS Account with Bedrock access
- Vercel account (for deployment)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/beeps-chatbot.git
cd beeps-chatbot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local` file:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
BEDROCK_MODEL=amazon.nova-lite-v1:0
BEDROCK_FALLBACK=amazon.titan-text-express-v1
```

4. **Add your resume**
- Place your resume PDF in `public/resume.pdf`
- Update resume data in `app/data/resume.txt`

5. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the chatbot.

## 🏗️ Project Structure

```
beeps-chatbot/
├── app/
│   ├── api/chat/route.ts      # AI API endpoint
│   ├── chat/page.tsx          # Chat interface
│   ├── data/resume.txt        # Resume content
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage (redirects to chat)
├── public/
│   └── resume.pdf             # PDF resume file
├── .env.local                 # Environment variables
└── README.md                  # This file
```

## 🔑 AWS Setup

1. **Create AWS Account** and enable Bedrock
2. **Request Model Access** for Amazon Nova Lite
3. **Create IAM User** with Bedrock permissions
4. **Generate Access Keys** for API access

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
- Connect GitHub repository
- Add environment variables in Vercel dashboard
- Deploy automatically

## 🎨 Customization

### Update Resume Content
Edit `app/data/resume.txt` with your information using this format:
```
=== PERSONAL INFORMATION ===
Name: Your Name
Title: Your Title
...
```

### Change Styling
- Colors: Update Tailwind classes in `app/chat/page.tsx`
- Fonts: Modify `app/globals.css`
- Layout: Adjust components in chat page

### AI Personality
Modify the prompt in `app/api/chat/route.ts` to change the chatbot's personality and response style.

## 📊 Usage Analytics

The chatbot tracks:
- Popular questions asked
- Response quality
- User engagement patterns

## 🔒 Security

- Environment variables are secure
- No sensitive data in client-side code
- AWS credentials properly configured
- Resume data is public-safe only

## 🐛 Troubleshooting

### Common Issues

**AI not responding:**
- Check AWS credentials
- Verify Bedrock model access
- Check environment variables

**Styling not working:**
- Restart development server
- Clear browser cache
- Check Tailwind configuration

**PDF not loading:**
- Ensure file is in `public/` folder
- Check file name matches button link
- Verify file permissions

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Bea Therese Y. Paras**
- Email: beaparas172002@gmail.com
- GitHub: [Bea's GitHub](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- AWS Bedrock for AI capabilities
- Vercel for hosting
- Next.js team for the framework
- Tailwind CSS for styling

---

⭐ **Star this repo if you found it helpful!**