🌌 Null-1.23 | Next-Gen Image Generation
Null-1.23 is a sleek, high-performance image generation web application. Featuring a stunning liquid-glass dark mode UI, dynamic animated backgrounds, and parallel processing, it allows users to effortlessly bring their imagination to life.

✨ Features
Liquid Glass Aesthetics: A premium, modern UI featuring frosted glass panels, neon glows, and animated blob backgrounds.
Lightning Fast Generation: Generates high-quality 1:1 square images almost instantly.
Parallel Processing: Choose exactly how many images you want (1, 2, or 3) to generate concurrently with a single click.
One-Click Style Presets: Transform any basic prompt instantly with built-in style presets:
📸 Photorealistic
🌃 Cyberpunk
🌸 Anime / Manga
🎨 Oil Painting
Seamless Downloads: Hover over any generated masterpiece and click the download button to instantly save it to your device (with built-in fallback support for strict browser security rules).
🚀 Tech Stack
Frontend: React (TypeScript), Vite, Tailwind CSS, Zustand (State Management), Lucide React (Icons).
Backend: Node.js, Express, Socket.io (for real-time queuing).
AI Engine: Powered seamlessly by the Pollinations AI Image Generation API.
🛠️ Installation & Setup
Make sure you have Node.js installed on your machine.

1. Start the Backend Server
The backend handles job queuing and communicates with the AI generation API.

Open your terminal and navigate to the project directory.
Run the provided batch file (Windows):
bash


start.bat
(Alternatively, you can manually navigate to the backend folder, run npm install, and then npm start or node server.js).
2. Start the Frontend Application
The frontend is built with Vite for lightning-fast development.

Open a new terminal and navigate to the frontend directory:
bash


cd frontend
Install the required dependencies:
bash


npm install
Start the development server:
bash


npm run dev
Open your browser and navigate to http://localhost:5173 (or the port provided by Vite).
💡 How to Use
Launch the App: Open Null-1.23 in your web browser.
Choose your Style (Optional): In the Left Sidebar, click on a Style Preset (e.g., Cyberpunk) to automatically inject that artistic flair into your prompt.
Select Quantity: In the Left Sidebar under "Generations", choose whether you want 1, 2, or 3 images generated at once.
Enter a Prompt: Type your vision into the central search bar (or pick a starter prompt from the Right Sidebar).
Generate: Hit the Generate button!
Download: Once the processing is complete, hover over your favorite image and click the download icon to save it locally.
🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.
