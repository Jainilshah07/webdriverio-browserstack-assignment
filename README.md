# 🌐 WebdriverIO BrowserStack Automation
[WebdriverIO](http://webdriver.io/) Integration with BrowserStack.

This project automates the testing of a EL-PAIS website’s opinion articles using **WebdriverIO**.  
It captures article cover images, translates their titles, and validates results both **locally** and on **BrowserStack**.

---

## 🔗 Links

- 🧩 **GitHub Repository:**   
- ☁️ **BrowserStack Build (Public):** https://automation.browserstack.com/projects/project_1/builds/browserstack+build/1?public_token=309708002b9f4280298dc0a51f8f0dc2e4226ab2593179567444730c792311ca 
- 🖼️ **Screenshot of the Build Running:** https://drive.google.com/file/d/1XNQSv4YNu-Bhvuk8m4xsQBeJFUj9Phrc/view?usp=sharing

---

## 🧠 Overview

The automation covers:
- Extracting opinion article titles and cover images.
- Translating titles to English via a translation API.
- Comparing and saving results with visual screenshots.
- Running the same suite locally and on BrowserStack.

---

---

## 🚀 How to Run the Tests

### 1️⃣ Clone the Repository
```bash
git clone [your-repo-link]
cd WEBRIVERIO-BROWSERSTACK

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
TRANSLATE_API_KEY=your_translate_api_key

4️⃣ Run Tests Locally
npm run local

5️⃣ Run Tests on BrowserStack/ To run parallel tests
npm run test

🧪 Output

After execution:

Screenshots are saved under:

/images/el_pais_opinion/ for local runs.

/images_parallel/el_pais_opinion/ for BrowserStack/parallel runs.

Logs are available under /all-logs/wdio.log.

🧰 Tech Stack

WebdriverIO v8

BrowserStack Automate

JavaScript (Node.js)

dotenv for environment management

Mocha as test framework

Chai for assertions

Translation API for language processing