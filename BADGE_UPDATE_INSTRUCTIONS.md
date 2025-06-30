# How to Update Your Credly Badges

## Quick Guide to Replace Dummy Badges with Your Real Ones

Since I couldn't access your Credly profile directly, I've added placeholder badges. Here's how to easily update them with your actual badges:

### Step 1: Get Your Badge Information

1. Go to https://www.credly.com/users/rishikumarrajvansh
2. Right-click on each badge image and select "Copy image address"
3. Note down the badge title, issuer, and date

### Step 2: Update the HTML File

Open `templates/index.html` and find the badges section (around line 196-270). Replace the dummy badge information:

```html
<div class="credly-badge skill-item">
    <div class="badge-image">
        <img src="YOUR_BADGE_IMAGE_URL_HERE" alt="Badge Title" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
        <i class="RELEVANT_FONTAWESOME_ICON fallback-icon"></i>
    </div>
    <div class="badge-info">
        <h4 class="badge-title">YOUR BADGE TITLE</h4>
        <p class="badge-issuer">ISSUER NAME</p>
        <div class="badge-date">EARNED DATE</div>
    </div>
</div>
```

### Step 3: Badge Image URLs

The pattern for Credly badge images is usually:
`https://images.credly.com/images/[BADGE_ID]/image.png`

### Step 4: Fallback Icons

Choose appropriate FontAwesome icons for each badge:

**Common Icons:**
- Python: `fab fa-python`
- Data Science: `fas fa-chart-line` or `fas fa-chart-bar`
- Machine Learning: `fas fa-robot`
- Cloud: `fas fa-cloud`
- Database: `fas fa-database`
- Security: `fas fa-shield-alt`
- Networking: `fas fa-network-wired`
- AWS: `fab fa-aws`
- Google: `fab fa-google`
- Microsoft: `fab fa-microsoft`

### Step 5: Update Badge Count

In the stats section (around line 290), update the badge count:

```html
<span class="stat-number">X+</span>
<span class="stat-label">Verified Badges</span>
```

Replace X with your actual number of badges.

### Example Badge Entry

```html
<div class="credly-badge skill-item">
    <div class="badge-image">
        <img src="https://images.credly.com/images/63316b60-f62d-4e51-aacc-c23cb850089d/image.png" alt="IBM Data Science Professional Certificate" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
        <i class="fas fa-chart-line fallback-icon"></i>
    </div>
    <div class="badge-info">
        <h4 class="badge-title">IBM Data Science Professional Certificate</h4>
        <p class="badge-issuer">IBM</p>
        <div class="badge-date">Dec 2022</div>
    </div>
</div>
```

### Need Help?

If you have trouble finding the exact image URLs or need help with the update, please share:
1. Screenshots of your badges from Credly
2. The badge titles and issuers
3. The earned dates

I can then help you update the HTML with the correct information.
