# Mohamed Marzook — Portfolio Website

A premium editorial-style personal portfolio for Mohamed Marzook, Aspiring DevOps Engineer.

## Project Structure

```
Portfolio website/
├── index.html          ← Main entry point
├── css/
│   ├── style.css       ← Main stylesheet (design system, layout, components)
│   └── accessibility.css ← Reduced-motion and accessibility overrides
├── js/
│   └── main.js         ← Navigation, scroll reveal, mobile menu, contact form
├── nginx.conf          ← Nginx server block for AWS EC2 deployment
└── README.md
```

## Running Locally

No build process required. Open directly in a browser or use any static file server.

### Option 1: Python (quickest)
```bash
cd "Portfolio website"
python -m http.server 8080
# Then open http://localhost:8080
```

### Option 2: Node.js npx serve
```bash
cd "Portfolio website"
npx serve .
# Then open the URL shown in the terminal
```

### Option 3: VS Code Live Server
Install the "Live Server" extension, right-click `index.html` → "Open with Live Server".

---

## Deploying to AWS EC2 with Nginx

1. **Copy files to your server:**
   ```bash
   scp -r "Portfolio website/"* ec2-user@your-ec2-ip:/var/www/portfolio/
   ```

2. **Install Nginx on the EC2 instance:**
   ```bash
   sudo apt update && sudo apt install nginx -y   # Ubuntu/Debian
   # or
   sudo yum install nginx -y                       # Amazon Linux
   ```

3. **Copy the Nginx config:**
   ```bash
   sudo cp /var/www/portfolio/nginx.conf /etc/nginx/sites-available/portfolio
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
   sudo rm /etc/nginx/sites-enabled/default       # remove default site
   ```

4. **Edit the config to set your domain or IP:**
   ```bash
   sudo nano /etc/nginx/sites-available/portfolio
   # Change: server_name your-domain.com www.your-domain.com;
   # To:     server_name YOUR_EC2_PUBLIC_IP;   (or your actual domain)
   ```

5. **Test and reload:**
   ```bash
   sudo nginx -t
   sudo systemctl enable nginx
   sudo systemctl reload nginx
   ```

6. **Open port 80** in your EC2 Security Group (inbound HTTP rule).

---

## Design System

| Token | Value |
|---|---|
| Background | `#f8f5ef` (warm ivory) |
| Near-black | `#181614` |
| Accent | `#b89650` (champagne gold) |
| Serif | DM Serif Display |
| Sans | Inter |
| Mono | JetBrains Mono |

## Sections

- **Hero** — Name, role, description, discipline tags, plaque, CAP HEIGHT/BASELINE annotations
- **About** — Background paragraph and detail table
- **Skills** — Six skill cards (Cloud, Linux, Git, Infrastructure, Automation, Networking)
- **Projects** — AWS EBS Backup & Recovery Lab with full step-by-step walkthrough
- **Learning & Certifications** — Timeline showing current learning path honestly (no fake certs)
- **Contact** — Contact links with placeholder text + demo form
- **Footer** — Navigation, copyright

## Technical Notes

- Pure HTML / CSS / JavaScript — no framework, no build step
- Google Fonts loaded via CDN
- Fully responsive: desktop → tablet → mobile
- Accessible: semantic HTML, ARIA labels, keyboard navigation
- Scroll reveal animations via IntersectionObserver
- Reduced-motion media query respected
