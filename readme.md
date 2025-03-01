# SCORM Course - "Elearn Social Style Template" README

## Overview
This is a simple SCORM-compliant course featuring Jane's remote work tips as an example. The course is designed to be easily customizable by non-coders through the `data.js` file. This course has been tested and verified to work in SCORM Cloud.

## Getting Started

### Basic Customization
All content for this course is stored in the `data.js` file. You can edit this file with a simple text editor (like Notepad, TextEdit, or VS Code) to customize the course without coding knowledge.

## How to Edit the Course Content

### Profile Information
At the top of the `data.js` file, you'll find basic profile settings:

```javascript
name: "Jane",
bannerUrl: "images/banner.jpg",
avatarUrl: "images/jane-avatar.jpg",
badgeText: "Expert",
badgeColor: "purple",
badgeTextColor: "white",
```

Only change the text between the quotes. For example, change `"Jane"` to `"John"` to update the name.

### Theme Colors
You can customize the colors by changing these values:

```javascript
theme: {
    titleColor: 'purple',
    textColor: '#333',
    buttonBg: 'purple',
    buttonText: 'white'
}
```

### Adding or Editing Content Sections

The course content is organized in the `sections` array. Each section is a separate "post" with different content types.

## How to Add a New Section

1. Locate the `sections: [` part of the file
2. Add your new section following the format of existing sections
3. Make sure to add a comma after the closing `}` of the previous section

### Section Types and Formats

#### 1. Simple Title and Text

```javascript
{
    title: "About Me 🙍‍♀️",
    type: "title-text",
    text: "I have worked from home since 2015. No office, no problem—just results."
}
```

#### 2. Image with Text

```javascript
{
    title: "Workspace 💻",
    type: "image-text",
    text: "Set up a spot. Desk or couch, make it yours!",
    mediaUrl: "images/desk.jpg",
    alt: "Home office desk setup"
}
```

#### 3. Video Embed

```javascript
{
    title: "Jane's Video Tip 📝",
    type: "video-embed",
    text: "Check out my quick guide to staying productive remotely!",
    embedUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    alt: "Video description"
}
```

#### 4. Quiz Section

```javascript
{
    title: "Remote Quiz ❓",
    type: "quiz",
    questions: [
        {
            question: "What's key to your remote setup?",
            options: ["Office", "Dedicated spot", "Bed"],
            correct: 1
        },
        {
            question: "How does you avoid burnout?",
            options: ["Work nonstop", "Take breaks", "Skip coffee"],
            correct: 1
        }
    ]
}
```

For quizzes:
- The `correct` value is the index of the correct answer (starting from 0)
- So `correct: 1` means the second option is correct

#### 5. Summary Section

```javascript
{
    title: "Remote Wrap-Up 🙋‍♀️",
    type: "summary",
    text: "That's my remote work crash course! You've got this."
}
```

## Important Tips

1. **Always keep the quotes**: Make sure all text is enclosed in quotes like `"this"`
2. **Use commas correctly**: Each item needs a comma after it, except the last item in a list
3. **Keep the structure**: Don't remove the curly braces `{ }` or square brackets `[ ]`
4. **Image paths**: Make sure image files exist in the correct folder
5. **Add as many sections as you want**: Just make sure each follows the correct format

## Common Mistakes to Avoid

- Don't remove the comma between sections
- Don't change `type:` values unless you know what you're doing
- Don't add quotes inside quotes without using a backslash like `"Jane says \"Hello\""`
- Don't remove any required fields (title, type, text)

## Example: Adding a New Section

To add a new section, copy an existing section of the same type, paste it before the final closing `]`, and modify the content:

```javascript
// Original last section
{
    title: "Remote Wrap-Up 🙋‍♀️",
    type: "summary",
    text: "That's my remote work crash course! You've got this."
}
// Add a comma here ↓
,
// New section
{
    title: "Additional Resources 📚",
    type: "title-text",
    text: "Here are some books and websites I recommend for remote work mastery."
}
```
# Formatting Examples for data.js

When editing the `data.js` file, you can use several special characters and HTML tags to format text within the quote marks. Here are some useful examples:

## Line Breaks

To create a line break in your text, use the `<br>` character:

```javascript
{
    title: "About Me 🙍‍♀️",
    type: "title-text",
    text: "I have worked from home since 2015.<br>No office, no problem—just results."
}
```

This will display as:
```
I have worked from home since 2015.
No office, no problem—just results.
```

## HTML Formatting

You can use basic HTML tags inside your text for more formatting options:

### Bold Text
```javascript
{
    title: "Workspace 💻",
    type: "title-text", 
    text: "Set up a spot. <b>Desk or couch</b>, make it yours!"
}
```

### Italic Text
```javascript
{
    title: "Routine ⏰",
    type: "title-text",
    text: "Start your day right. <i>Coffee, stretch, go.</i>"
}
```

### Links
```javascript
{
    title: "Resources 📚",
    type: "title-text",
    text: "Check out <a href='https://remotework.com'>this website</a> for more tips."
}
```

### Lists
```javascript
{
    title: "Daily Checklist",
    type: "title-text",
    text: "<ul><li>Check email</li><li>Review calendar</li><li>Set priorities</li></ul>"
}
```

## Escaping Special Characters

If you need to use quotes within quotes, you must escape them with a backslash:

```javascript
{
    title: "Jane's Quote",
    type: "title-text",
    text: "Jane always says \"Working remotely is all about balance.\""
}
```

## Combining Multiple Formatting Elements

You can combine these formatting methods:

```javascript
{
    title: "Complete Guide",
    type: "title-text",
    text: "<b>Remote Work Tips:</b><br><ul><li>Create a <i>dedicated</i> workspace</li><li>Take regular breaks</li><li>Visit <a href='https://workremote.tips'>workremote.tips</a> for more</li></ul>"
}
```

## Important Notes

1. Some HTML formatting may affect the styling of your course.
2. Always test your changes to ensure they display correctly.
3. More complex formatting might require editing the CSS file.
4. Be consistent with your formatting throughout the course.
## Testing Your Changes

After saving your changes to `data.js`, reload the course in your browser to see the updates. If something doesn't look right, double-check for missing commas, quotes, or braces.

## Creating a SCORM Package for Upload

To create a proper SCORM package that will work in LMS systems:

1. **Select all files and folders** in your course directory (NOT the parent folder itself)
2. Create a ZIP file from these selected files

### Windows Instructions:
1. Open the course folder
2. Select all files and folders inside (Ctrl+A)
3. Right-click on any of the selected items
4. Select "Send to" > "Compressed (zipped) folder"
5. Rename the ZIP file as needed

### Mac Instructions:
1. Open the course folder
2. Select all files and folders inside (Command+A)
3. Right-click on any of the selected items
4. Select "Compress X items" (where X is the number of items)
5. Rename the ZIP file as needed

### Important Note:
Make sure you zip the contents of the folder, not the folder itself. Your ZIP file should contain files like index.html, app.js, etc. directly at the root level, not inside another folder.

## SCORM Cloud Testing
This course has been tested and verified to work correctly in SCORM Cloud. If you encounter any issues when uploading to your LMS, first try testing in SCORM Cloud to ensure the package is correctly formatted.

Good luck with your SCORM course customization!