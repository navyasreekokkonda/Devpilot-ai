const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Generate AI Summary

const generateRepoSummary = async (repoData) => {

  try {

    const completion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "user",
            content: `
            Explain this GitHub repository professionally.

            Repository Name:
            ${repoData.name}

            Description:
            ${repoData.description}

            Language:
            ${repoData.language}

            Stars:
            ${repoData.stars}

            Explain:
            1. What this project does
            2. Why developers use it
            3. Main technologies involved
            `,
          },
        ],

        model: "llama-3.1-8b-instant",
      });

    return completion.choices[0]
      .message.content;

  } catch (error) {

    console.log("SUMMARY ERROR:");
    console.log(error);

    return "AI summary generation failed.";
  }
};

// Generate README

const generateReadme = async (repoData) => {

  try {

    const completion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "user",
            content: `
            Generate a professional README.md file
            for this GitHub repository.

            Repository Name:
            ${repoData.name}

            Description:
            ${repoData.description}

            Language:
            ${repoData.language}

            Include:
            - Project Overview
            - Features
            - Installation
            - Usage
            - Technologies Used

            Return markdown format only.
            `,
          },
        ],

        model: "llama-3.1-8b-instant",
      });

    return completion.choices[0]
      .message.content;

  } catch (error) {

    console.log("README ERROR:");
    console.log(error);

    return "README generation failed.";
  }
};

module.exports = {
  generateRepoSummary,
  generateReadme
};