import { useState } from "react";
import axios from "axios";

import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaCopy,
  FaDownload
} from "react-icons/fa";

function App() {

  const [repoUrl, setRepoUrl] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeRepo = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/api/github/analyze",
        {
          repoUrl
        }
      );

      setRepoData(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

      alert("Error analyzing repository");
    }
  };

  const copyReadme = () => {

    navigator.clipboard.writeText(
      repoData.readme
    );

    alert("README copied!");
  };

  const downloadReadme = () => {

    const element =
      document.createElement("a");

    const file =
      new Blob(
        [repoData.readme],
        { type: "text/markdown" }
      );

    element.href =
      URL.createObjectURL(file);

    element.download = "README.md";

    document.body.appendChild(element);

    element.click();
  };

  return (

    <div className="min-h-screen bg-gray-50 text-black">

      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">

        <h1 className="text-3xl font-bold">
          DevPilot AI
        </h1>

        <button className="bg-black text-white px-5 py-2 rounded-lg">
          GitHub
        </button>

      </nav>

      <div className="flex flex-col items-center justify-center mt-20">

        <h1 className="text-6xl font-bold text-center leading-tight">

          AI-Powered
          <br />

          GitHub Repository Analyzer

        </h1>

        <p className="mt-6 text-gray-600 text-xl text-center max-w-2xl">

          Analyze repositories using AI, understand
          technologies, architecture, popularity,
          and generate professional README files instantly.

        </p>

        <div className="flex gap-4 mt-10">

          <input
            type="text"
            placeholder="Enter GitHub Repository URL"
            className="w-[600px] p-4 rounded-xl border border-gray-300 shadow-sm"
            value={repoUrl}
            onChange={(e) =>
              setRepoUrl(e.target.value)
            }
          />

          <button
            onClick={analyzeRepo}
            className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800"
          >

            {loading ? "Analyzing..." : "Analyze"}

          </button>

        </div>

      </div>

      {loading && (

        <div className="text-center mt-20 text-2xl font-semibold">

          AI is analyzing repository...

        </div>

      )}

      {repoData && !loading && (

        <div className="max-w-4xl mx-auto mt-20 bg-white rounded-2xl shadow-lg p-10">

          <div className="flex items-center gap-3">

            <FaGithub size={35} />

            <h2 className="text-4xl font-bold">
              {repoData.name}
            </h2>

          </div>

          <p className="mt-6 text-lg text-gray-700 leading-8">

            {repoData.description}

          </p>

          <div className="flex gap-10 mt-8">

            <div className="flex items-center gap-2">

              <FaStar />

              <span>
                {repoData.stars} Stars
              </span>

            </div>

            <div className="flex items-center gap-2">

              <FaCodeBranch />

              <span>
                {repoData.forks} Forks
              </span>

            </div>

            <div>

              💻 {repoData.language}

            </div>

          </div>

          <div className="mt-12">

            <h3 className="text-3xl font-bold mb-4">

              AI Summary

            </h3>

            <div className="bg-gray-100 p-6 rounded-xl leading-8 text-gray-800">

              {repoData.aiSummary}

            </div>

          </div>

          <div className="mt-12">

            <div className="flex justify-between items-center mb-4">

              <h3 className="text-3xl font-bold">

                AI Generated README

              </h3>

              <div className="flex gap-4">

                <button
                  onClick={copyReadme}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >

                  <FaCopy />

                  Copy

                </button>

                <button
                  onClick={downloadReadme}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
                >

                  <FaDownload />

                  Download

                </button>

              </div>

            </div>

            <div className="bg-black text-green-400 p-6 rounded-xl overflow-auto whitespace-pre-wrap leading-7">

              {repoData.readme}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;