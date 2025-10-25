const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { translateText } = require("../../utils/translateApi");

describe("EL PAIS Opinion Scraper", () => {
  it("should scrape 5 Opinion articles, translate titles in bulk, and analyze repeated words", async () => {
    await browser.url("https://elpais.com");

    // Wait until page body is loaded
    await browser.waitUntil(async () => await $("body").isExisting(), {
      timeout: 10000,
      timeoutMsg: "Homepage did not load",
    });

    // Handle cookie consent
    try {
      const cookieBtn = await $("#didomi-notice-agree-button");
      if (await cookieBtn.isDisplayed()) {
        await cookieBtn.waitForClickable({ timeout: 5000 });
        await cookieBtn.click();
        console.log("✅ Cookie consent accepted");
      }
    } catch {
      console.log("No cookie popup found or already accepted");
    }

    // Navigate to Opinion section

    try {
      const opinionLink = await $("//a[contains(@href, '/opinion/')]");
      await opinionLink.waitForExist({ timeout: 10000 });
      await opinionLink.scrollIntoView();

      // ✅ Use JavaScript click instead of WebDriver click
      await browser.execute((el) => el.click(), opinionLink);

      console.log("➡️ Navigated to Opinion section");

      // ✅ Wait for Opinion page to load
      await browser.waitUntil(
        async () => (await browser.getUrl()).includes("/opinion/"),
        { timeout: 5000, timeoutMsg: "Did not navigate to Opinion section" }
      );
    } catch (err) {
      console.error("Error navigating to Opinion section:", err.message);
      throw err; // ✅ Stop test execution if navigation fails
    }

    // Wait until articles appear
    await browser.waitUntil(
      async () => (await $$("//article[@data-word]//h2/a")).length > 0,
      { timeout: 10000, timeoutMsg: "Opinion articles did not load" }
    );

    // Collect article links
    const articleLinks = await $$("//article[@data-word]//h2/a");
    const uniqueLinks = [];

    for (let link of articleLinks) {
      const href = await link.getAttribute("href");
      if (href && !uniqueLinks.includes(href)) uniqueLinks.push(href);
      if (uniqueLinks.length >= 5) break;
    }

    console.log(`Found ${uniqueLinks.length} article links\n`);

    // Prepare folder for images
    const imgDir = path.join(__dirname, "../../images/el_pais_opinion");
    if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

    const articles = [];

    // Loop through articles
    for (let i = 0; i < uniqueLinks.length; i++) {
      const url = uniqueLinks[i].startsWith("http")
        ? uniqueLinks[i]
        : `https://elpais.com${uniqueLinks[i]}`;

      console.log(`\n🔹 Processing Article ${i + 1}: ${url}`);

      if (browser.isMobile) {
        await browser.url(url); // mobile: same window navigation
      } else {
        await browser.newWindow(url); // desktop: open in new tab
      }

      // Wait for article title
      await browser.waitUntil(async () => (await $$("h1")).length > 0, {
        timeout: 10000,
        timeoutMsg: "Article title not found",
      });

      let title = "N/A";
      let content = "";
      let imgPath = "";

      // Extract title
      try {
        const h1 = await $("h1");
        title = await h1.getText();
        console.log(`Title (ES): ${title}`);
      } catch {
        console.log("No title found");
      }

      // Extract content
      try {
        const paras = await $$("article p");
        if (paras.length === 0) {
          await browser.waitUntil(
            async () => (await $$("article p")).length > 0,
            { timeout: 8000, timeoutMsg: "No article paragraphs found" }
          );
        }
        const paraTexts = await Promise.all(paras.map((p) => p.getText()));
        content = paraTexts.slice(0, 5).join(" ");
        console.log(`Content preview: ${content.substring(0, 150)}...`);
      } catch {
        console.log("No article content found");
      }

      // Download cover image
      try {
        const img = await $("img._re.a_m-h");
        if (await img.isExisting()) {
          await img.waitForDisplayed({ timeout: 5000 });
          const imgSrc = await img.getAttribute("src");
          if (imgSrc && imgSrc.startsWith("http")) {
            const imgResp = await axios.get(imgSrc, {
              responseType: "arraybuffer",
            });
            const imgFile = `article_${i + 1}_cover.jpg`;
            imgPath = path.join(imgDir, imgFile);
            fs.writeFileSync(imgPath, imgResp.data);
            console.log(`🖼️ Cover image saved: ${imgFile}`);
          }
        } else {
          console.log("No cover image found");
        }
      } catch (err) {
        console.log(`Error downloading image: ${err.message}`);
      }

      // Store article data
      articles.push({
        title,
        content,
        imgPath,
        url,
      });

      // Close tab and switch back
      await browser.closeWindow();
      const handles = await browser.getWindowHandles();
      await browser.switchToWindow(handles[0]);
    }

    // Bulk translate titles
    console.log("\nTranslating all titles in bulk...");
    const titles = articles.map((a) => a.title);
    let translatedTitles = [];
    try {
      translatedTitles = await translateText(titles);
      console.log("✅ Translation complete");
    } catch (err) {
      console.log(`Translation failed: ${err.message}`);
      translatedTitles = titles.map(() => "Translation failed");
    }

    // Attach translations back to articles
    articles.forEach((a, i) => (a.translatedTitle = translatedTitles[i]));

    // Summary output
    console.log("\n📰 Article Summary:");
    articles.forEach((a, i) => {
      console.log(`\n#${i + 1}`);
      console.log(`Original: ${a.title}`);
      console.log(`Translated: ${a.translatedTitle}`);
      console.log(`Image: ${a.imgPath || "N/A"}`);
    });

    // Analyze repeated words in translated titles
    console.log("\nAnalyzing repeated words in translated titles...");
    const counts = {};
    translatedTitles
      .join(" ")
      .toLowerCase()
      .split(/\W+/)
      .forEach((w) => {
        if (w.length > 3) counts[w] = (counts[w] || 0) + 1;
      });

    const repeated = Object.entries(counts).filter(([_, c]) => c > 2);
    if (repeated.length > 0) {
      console.log("\n📊 Words appearing more than twice:");
      repeated.forEach(([w, c]) => console.log(`${w}: ${c}`));
    } else {
      console.log("No words appear more than twice.");
    }
  });
});
