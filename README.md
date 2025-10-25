# 🌐 WebdriverIO BrowserStack Automation  

**WebdriverIO Integration with BrowserStack**

This project automates the testing of the **EL PAÍS** website’s *Opinion* articles using **WebdriverIO**.  
It captures article cover images, translates their titles into English, and validates results both **locally** and on **BrowserStack Automate**.

---

## 🔗 Links

- 🧩 **GitHub Repository:** [https://github.com/Jainilshah07/webdriverio-browserstack-assignment](https://github.com/Jainilshah07/webdriverio-browserstack-assignment)  
- ☁️ **BrowserStack Build (Public):** [View Build on BrowserStack](https://automation.browserstack.com/projects/project_1/builds/browserstack+build/1?public_token=309708002b9f4280298dc0a51f8f0dc2e4226ab2593179567444730c792311ca)  
- 🖼️ **Screenshot of the Build Running:** [Google Drive Link](https://drive.google.com/file/d/1XNQSv4YNu-Bhvuk8m4xsQBeJFUj9Phrc/view?usp=sharing)  

---

## 🧠 Overview

This automation suite performs the following:

- Extracts the latest **Opinion** article titles and cover images from [elpais.com](https://elpais.com).  
- Translates all titles to **English** via a Translation API.  
- Saves cover images and logs for each article.  
- Analyzes repeated words in translated titles.  
- Runs seamlessly on both **local** and **BrowserStack** environments.

---

## 🚀 How to Run the Tests

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Jainilshah07/webdriverio-browserstack-assignment.git
cd webdriverio-browserstack-assignment
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables  
Create a `.env` file in the root directory and add:
```bash
BROWSERSTACK_USERNAME=your_browserstack_username
BROWSERSTACK_ACCESS_KEY=your_browserstack_access_key
TRANSLATE_API_KEY=your_translation_api_key
```

### 4️⃣ Run Tests Locally
```bash
npm run local
```

### 5️⃣ Run Tests on BrowserStack (or Run Parallel Tests)
```bash
npm run test
```

---

## 🧪 Output

After execution, you’ll find:

- 🖼️ **Images:**  
  - Local runs → `/images/el_pais_opinion/`  
  - BrowserStack runs → `/images_parallel/el_pais_opinion/`  

- 🧾 **Logs:**  
  - All logs stored under `/all-logs/wdio.log`

---

## 🧰 Tech Stack

- **WebdriverIO v8** — Test automation framework  
- **BrowserStack Automate** — Cross-browser testing platform  
- **Mocha** — Test framework  
- **Chai** — Assertion library  
- **Axios** — For fetching and downloading assets  
- **dotenv** — For managing environment variables  
- **Node.js (JavaScript)** — Core runtime  
- **Translation API** — For language translation  

