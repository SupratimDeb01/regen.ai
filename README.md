# Regen.ai – AI-Powered Resume Builder (MERN Stack)

**Regen.ai** is a full-stack resume builder web application developed using the MERN stack (MongoDB, Express.js, React, and Node.js). The goal is to provide users with a step-by-step interface to build, preview, and download professional resumes — with upcoming support for AI-generated content.

## 🚀 Features

* 📝 Step-by-step form interface for building resumes
* 🎨 Live preview of selected resume templates
* 📄 Export resumes as PDF using `html2pdf.js`
* 📅 Save and update resume data (MongoDB + Express.js API)
* 🧠 (Coming Soon) AI integration using Google Gemini for auto-generating summaries and content
* 💻 Responsive and minimal UI with modern React practices

## 📁 Project Structure

```
client/      # React frontend (step forms, template preview, PDF export)  
server/      # Express backend (CRUD APIs for resume data)  
public/      # Static assets  
```

## 🔠 Tech Stack

* **Frontend:** React, HTML5, CSS3, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Other Tools:** html2pdf.js, react-to-print (for earlier versions), Google Gemini API (planned)

## 🧪 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/regen.ai.git
cd regen.ai
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

### 4. Setup Environment Variables

Create a `.env` file in the `server/` directory with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 5. Run the App

In separate terminals:

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd client
npm start
```

## 📌 Known Issues

* PDF export quality is low when using `html2pdf.js`; alternatives are being explored
* AI integration with Gemini is not fully implemented yet
* UI/UX polishing and optimization is still in progress

## ✨ Planned Improvements

* Full Gemini AI integration to auto-generate resume content
* More customizable templates
* Higher-quality resume PDF output
* User authentication (login/signup)
* Dark mode and accessibility enhancements

## 🙌 Acknowledgments

* [Google Gemini AI](https://deepmind.google/technologies/gemini/)
* [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)
* React community and various open-source resources

## 📃 License

© 2025 Supratim Deb. All rights reserved.

## 📬 Contact

**Supratim Deb**
📧 [Gmail](mailto:supratimdeb04@gmail.com)
🌐 [Portfolio](https://supratimdeb.netlify.app)
🔗 [GitHub](https://github.com/SupratimDeb01) 
💼 [LinkedIn](https://linkedin.com/in/supratim-deb)

If you have any feedback or suggestions, feel free to reach out or open an issue.
