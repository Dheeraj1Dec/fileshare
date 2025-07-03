
# 🌐 File Share 

**FileShare**, a secure and user-friendly web app to upload, manage, and share files with short URLs. Built using **React.js**, this client interacts with the backend API to offer seamless file upload and sharing experiences.

---

## 🔗 Live Website

> 🟢 Hosted on Vercel: [https://file-share-delta.vercel.app](https://file-share-delta.vercel.app)

Backend: [https://file-share-server-k5hr.onrender.com](https://file-share-server-k5hr.onrender.com)

Backend Repo: [https://github.com/SajjanYadav/Server](https://github.com/SajjanYadav/Server)

---

## ✨ Features

- 🔐 User login & signup with JWT and Auth0
- 📁 Upload files to the cloud (via backend)
- 🔗 Generate & share short URLs
- 📜 View file history and metadata
- 📋 Copy short URL to clipboard
- 💡 Clean UI with dynamic previews (PDF, image, video)
- 🚨 Toast notifications and loading indicators

---

## 📁 Folder Structure

```
📦 src/
├── assets/                # Manages all Assets
├── components/            # UI components
├── pages/                 # Page views (Dashboard, Login, Signup ..)
├── services/              # API interaction
├── reducer/               # Redux store
├── slices/                # Redux Slice for Auth and File Store  
├── App.js                 # Main app router
└── index.js               # Entry point
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/file-share-frontend.git
cd file-share-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root:

```env
REACT_APP_BACKEND_URL=https://file-share-server-k5hr.onrender.com
```

### 4️⃣ Run Locally

```bash
npm start
```

---

## 🔐 Authentication

- JWT token is stored in Redux and localStorage
- Protected routes redirect unauthenticated users to login

---

## 📁 File Upload Workflow

1. User selects a file to upload
2. File is sent to backend via `multipart/form-data`
3. Backend stores file to Cloudinary and shortens the URL
4. Response includes both full and short URLs
5. File history is shown in dashboard

---

## 🧪 Tech Stack

- React.js
- Redux Toolkit
- Axios
- React Hot Toast
- TailwindCSS
- React Router
- Deployed on Vercel

---

## 🛡️ CORS Note

Make sure backend has the following CORS setting:

```js
origin: "https://file-share-delta.vercel.app",
credentials: true
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙋‍♂️ Author

Made with ❤️ by [@SajjanYadav](https://github.com/SajjanYadav)
