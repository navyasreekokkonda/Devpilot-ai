const express = require("express");
const axios = require("axios");

const {
  generateRepoSummary,
  generateReadme
} = require("../ai/groq");

const router = express.Router();

router.post("/analyze", async (req, res) => {

  try {

    const repoUrl = req.body.repoUrl;

    const parts = repoUrl.split("/");

    const owner = parts[3];
    const repo = parts[4];

    const githubApi =
      `https://api.github.com/repos/${owner}/${repo}`;

    const response =
      await axios.get(githubApi);

    const data = response.data;

    const repoData = {

      name: data.name,

      description: data.description,

      stars: data.stargazers_count,

      forks: data.forks_count,

      language: data.language
    };

    // AI Summary

    const aiSummary =
      await generateRepoSummary(repoData);

    // AI README

    const readme =
      await generateReadme(repoData);

    res.json({

      ...repoData,

      aiSummary,

      readme
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to analyze repository"
    });
  }
});

module.exports = router;