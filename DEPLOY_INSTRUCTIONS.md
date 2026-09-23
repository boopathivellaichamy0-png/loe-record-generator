# Deployment Instructions for Student Record PDF Generator

## Quick Deployment to Netlify (No Authentication Required)

### Method 1: Netlify Drop (Easiest)

1. Open **Netlify Drop** in your browser:
   ```
   https://app.netlify.com/drop
   ```

2. **Drag and drop** the `dist` folder directly into the drop zone
   - Location: `c:\Users\Admin\.gemini\antigravity\scratch\student-record-pdf-generator\dist`

3. Your site will be deployed automatically with a shareable link!

### Method 2: Zip File Upload

1. The project includes a `deploy.tar.gz` file (compressed archive)
   - Location: `c:\Users\Admin\.gemini\antigravity\scratch\student-record-pdf-generator\deploy.tar.gz`

2. Go to: https://app.netlify.com/drop

3. Drag and drop the **deploy.tar.gz** file into Netlify Drop

4. Netlify will extract and deploy automatically!

### Method 3: CLI Deployment (With Authentication)

```bash
# Navigate to project directory
cd c:\Users\Admin\.gemini\antigravity\scratch\student-record-pdf-generator

# Run deploy command
node "C:\Users\Admin\AppData\Roaming\npm\node_modules\netlify-cli\bin\run" deploy --dir=dist --prod
```

Then:
1. Click the authorization link that appears in the terminal
2. Log in with GitHub, Google, or email
3. Complete the authorization flow
4. Your deployment link will appear in the terminal

---

## Getting Your Live Link

Once deployed, you'll receive a link like:
```
https://your-site-name.netlify.app
```

### To rebuild after making changes:
```bash
npm run build
# Then redeploy using any of the methods above
```

---

## Build Information

- **Build Output**: `dist/` folder
- **Build Command**: `npm run build`
- **Build Tool**: Vite v8.1.5
- **Project Size**: ~1.2MB (gzipped: ~344KB)

## Features Deployed
✅ Multiple image upload support  
✅ Multi-page PDF generation (Pages 2, 4, 6...)  
✅ Automatic image distribution across pages  
✅ Student lab record PDF export functionality  

---

## Need Help?

If you encounter any issues:
1. Ensure the `dist` folder exists (run `npm run build` first)
2. For Netlify Drop: Simply drag the folder again
3. For CLI: Check your network connection and Netlify account status
