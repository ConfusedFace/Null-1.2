import { useState } from 'react';
import { LeftSidebar } from './components/LeftSidebar';
import { MainArea } from './components/MainArea';
import { RightSidebar } from './components/RightSidebar';

function App() {
  const [prompt, setPrompt] = useState('');

  const handleSelectPrompt = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  return (
    <>
      {/* Animated Blob Background */}
      <div className="blob blob-cyan"></div>
      <div className="blob blob-purple"></div>
      <div className="blob blob-blue"></div>

      <div className="min-h-screen text-white p-4 md:p-8 max-w-[1600px] mx-auto flex flex-col h-screen overflow-hidden">
        {/* Header Title */}
        <header className="mb-6 flex justify-center lg:justify-start">
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Null-1.23
          </h1>
        </header>

        {/* Main Interface */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 h-full overflow-y-auto lg:overflow-hidden pb-8">
          
          <LeftSidebar />

          <MainArea prompt={prompt} setPrompt={setPrompt} />

          <RightSidebar onSelectPrompt={handleSelectPrompt} />

        </div>
      </div>
    </>
  );
}

export default App;
