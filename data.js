const data = {
    name: "Jane",
    bannerUrl: "images/banner.jpg",
    bannerX: "50%",
    bannerY: "17%",
    avatarUrl: "images/jane-avatar.jpg",
    badgeText: "Expert",
    badgeColor: "purple",
    badgeTextColor: "white", // New field for badge text color
    headerBgColor: "#f8f8f8",
    theme: {
        titleColor: 'purple',
        textColor: '#333',
        buttonBg: 'purple',
        buttonText: 'white'
    },
    sections: [
        {
            title: "Remote Work Pro 🏡",
            type: "image-text",
            text: "Hey 👋, I’m Jane! I’ve mastered remote work for years. Let’s break it down together.",
            mediaUrl: "images/jane-avatar.jpg",
            alt: "Jane’s home office desk"
        },
        {
            title: "About Me 🙍‍♀️",
            type: "title-text",
            text: "I have worked from home since 2015.<br> No office, no problem—just results."
        },
        {
            title: "Workspace 💻",
            type: "title-text", 
            text: "Set up a spot. <b>Desk or couch</b>, make it yours!"
        },
        {
            title: "Routine ⏰",
            type: "image-text",
            text: "Start your day right. <i>Coffee, stretch, go.</i>",
            mediaUrl: "images/coffee-mug.jpg",
            alt: "Coffee mug on a desk"
        },
        {
            title: "Breaks ☕",
            type: "title-text",
            text: "Step away. Five minutes saves burnout.Time for another cup!"
        },
        {
            title: "Remote Hacks from a Fellow Pro 📝",
            type: "video-embed",
            text: "Check out this guide to staying productive remotely!",
            embedUrl: "https://www.youtube.com/embed/eBZpH8_cLE0?si=gRrEDoR4Hv4XHvI4",
            alt: "Jane’s productivity video"
        },
        {
            title: "Remote Quiz ❓",
            type: "quiz",
            questions: [
                {
                    question: "What’s key to your remote setup?",
                    options: ["Office", "Dedicated spot", "Bed"],
                    correct: 1
                },
                {
                    question: "How does you avoid burnout?",
                    options: ["Work nonstop", "Take breaks", "Skip coffee"],
                    correct: 1
                }
            ]
        },
        {
            title: "Remote Wrap-Up 🙋‍♀️",
            type: "summary",
            text: "That’s my remote work crash course! You’ve got this."
        },
        {
            title: "Resources 📚",
            type: "title-text",
            text: "Check out <a href='#'>remotework.com</a> (doesn't go anywhere) for more tips."
        }
    ]
};