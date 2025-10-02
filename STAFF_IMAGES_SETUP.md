# Staff Images Setup Instructions

## Overview
I've updated the StaffCards component to use your new chef images. To complete the setup, you need to:

## Steps to Complete:

### 1. Save and Process Images
Save the 4 uploaded staff images to the following locations with background removed:

- **Image 1** (Chef with beige uniform, waving): Save as `public/assets/staff/chef-1.png`
- **Image 2** (Chef with white hat and apron): Save as `public/assets/staff/chef-2.png`  
- **Image 3** (Chef with beige uniform, smiling): Save as `public/assets/staff/chef-3.png`
- **Image 4** (Chef with beige uniform, both hands up): Save as `public/assets/staff/chef-4.png`

### 2. Background Removal
For each image, you'll need to:
1. Open the image in an image editor (Photoshop, GIMP, Canva, remove.bg, etc.)
2. Remove the kitchen background
3. Save as PNG with transparent background
4. Recommended size: 400x600 pixels (portrait orientation)

### 3. Quick Online Tools for Background Removal:
- **remove.bg** - Automatic AI background removal
- **Canva** - Has background remover tool
- **Photopea** - Free online Photoshop alternative
- **GIMP** - Free desktop software

### 4. Updated Staff Information:
The component now shows:
- **Chef Ahmed** - Head Chef (12+ years, Kashmiri Cuisine)
- **Chef Rajesh** - Sous Chef (8+ years, Continental Cuisine)  
- **Chef Arjun** - Pastry Chef (6+ years, Artisan Desserts)
- **Chef Priya** - Line Cook (4+ years, Traditional Recipes)

### 5. File Structure:
```
karborne/
├── public/
│   └── assets/
│       └── staff/
│           ├── chef-1.png (Background removed)
│           ├── chef-2.png (Background removed)
│           ├── chef-3.png (Background removed)
│           └── chef-4.png (Background removed)
```

## What I've Done:
✅ Created the assets/staff directory structure
✅ Updated StaffCards.jsx to use local images instead of Unsplash
✅ Updated staff member information to match kitchen/chef roles
✅ Maintained the luxury design aesthetic with proper gradients

## Next Steps:
Once you've saved the background-removed images in the correct locations, the staff cards will automatically display your new team members with transparent backgrounds that blend beautifully with the luxury design.
