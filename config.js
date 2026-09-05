const siteConfig = {
    hero: {
        badge: "✦ CREATIVE & PERFORMANCE VIDEO PARTNER",
        headlineHTML: 'We Don\'t <span class="highlight-cyan">Hope</span>, We Make <span class="text-gradient shimmer-text">Ads That Convert.</span>',
        sublineHTML: 'Direct-response video editor and creative strategist helping <span class="highlight-white">DTC brands</span> create ads that <span class="highlight-cyan">increase CTR</span>, <span class="highlight-cyan">improve ROAS</span>, and <span class="highlight-white">lower CAC</span>',
        metrics: [
            { val: "CTR +132%", lbl: "Thumb-Stop Boost" },
            { val: "ROAS 5.8x", lbl: "Peak Return" },
            { val: "100M+", lbl: "Total Views" }
        ],
        deck: {
            left: { video: "videos/High retention vsl ads video.mp4" },
            center: { video: "videos/0510.mp4" },
            right: { video: "videos/The no 1.mp4" }
        }
    },

    about: {
        kicker: "PERFORMANCE PHILOSOPHY",
        title: 'The First 2 Seconds Decide Whether You Pay For A <span class="highlight-cyan">Customer</span> Or A <span class="text-gradient shimmer-text">Scroll.</span>',
        text: 'Attention is the most expensive part of paid media. My process focuses on <span class="highlight-white">earning it quickly</span>, <span class="highlight-cyan">keeping it longer</span>, and turning it into <span class="text-gradient shimmer-text">revenue.</span>'
    },

    projects: [
        {
            id: 1,
            video: "videos/Hook 2.mp4",
            title: "Scaling UGC for DTC Skincare",
            breakdown: [
                { subtitle: "HOOK", text: "Curiosity-driven opener creates an information gap." },
                { subtitle: "RETENTION", text: "Fast-paced visual proof keeps attention through the middle section." },
                { subtitle: "CONVERSION", text: "Product benefits are tied directly to a clear purchase action." }
            ]
        },
        {
            id: 2,
            video: "videos/hook4.mp4",
            title: "Motion-Driven Tech Ad",
            breakdown: [
                { subtitle: "HOOK", text: "Visual displacement effect stops thumb scroll instantly." },
                { subtitle: "RETENTION", text: "3D spatial typography translates features into core user benefits." },
                { subtitle: "CONVERSION", text: "Native 9:16 layout & CTA wave boost conversion by <span class=\"highlight-cyan\">+45%</span>." }
            ]
        },
        {
            id: 3,
            video: "videos/0510.mp4",
            title: "High-Velocity VSL Creative",
            breakdown: [
                { subtitle: "HOOK", text: "High-energy presenter hook frames immediate narrative value." },
                { subtitle: "RETENTION", text: "Synthetic AI motion FX and B-roll maintain visual momentum." },
                { subtitle: "CONVERSION", text: "Urgency-driven end screen converts scrollers into buyers." }
            ]
        }
    ],

    techStack: [
        { name: "Premiere Pro", svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="5" fill="#00005B"/><path d="M6 6h4.5c1.8 0 3 1 3 2.7s-1.2 2.7-3 2.7H8.2V17H6V6zm2.2 3.8h2.1c.7 0 1.2-.4 1.2-1.1s-.5-1.1-1.2-1.1H8.2v2.2zM14.5 11.2h2v1.2h-.1c.5-.9 1.4-1.4 2.4-1.4v2.2c-1.3 0-2.3.8-2.3 2.2V17h-2v-5.8z" fill="#9999FF"/></svg>` },
        { name: "After Effects", svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="5" fill="#00005B"/><path d="M5.5 17l2.8-9h2.2l2.8 9h-2.1l-.6-2H7.9l-.6 2H5.5zm2.9-3.6h1.8L9.3 9.7h-.1l-.8 3.7zM14 11.2h4.5v1.8H16v1.2h2.2v1.7H16v1.2h2.6V17H14v-5.8z" fill="#9999FF"/></svg>` },
        { name: "Higgsfield AI", svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#00F0FF"/><path d="M12 6L13.8 10.2L18 12L13.8 13.8L12 18L10.2 13.8L6 12L10.2 10.2L12 6Z" fill="#FFFFFF"/></svg>` },
        { name: "Runway Gen-3", svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#00F0FF"/></svg>` },
        { name: "Kling AI", svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#1E293B"/><circle cx="12" cy="12" r="7" stroke="#00F0FF" stroke-width="2"/><path d="M12 8V16M8 12H16" stroke="#00F0FF" stroke-width="2" stroke-linecap="round"/></svg>` },
        { name: "ElevenLabs", svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="7" y="5" width="3" height="14" rx="1.5" fill="#FFFFFF"/><rect x="14" y="5" width="3" height="14" rx="1.5" fill="#FFFFFF"/></svg>` },
        { name: "Midjourney", svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12" stroke="#00F0FF" stroke-width="2" stroke-linecap="round"/><path d="M9 12L11 14L15 10" stroke="#00F0FF" stroke-width="2" stroke-linecap="round"/></svg>` },
        { name: "CapCut Pro", svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#000"/><path d="M7 8L12 13L17 8M7 16L12 11L17 16" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
        { name: "Topaz Video AI", svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#00F0FF" fill-opacity="0.2" stroke="#00F0FF" stroke-width="2"/><polygon points="10,8 16,12 10,16" fill="#00F0FF"/></svg>` },
        { name: "Direct Response", svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#FF5555" stroke-width="2"/><circle cx="12" cy="12" r="5" stroke="#FF5555" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="#FF5555"/></svg>` },
        { name: "Sound Design", svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H2V15H6L11 19V5Z" fill="#00F0FF"/><path d="M15.54 8.46C16.48 9.4 17 10.67 17 12C17 13.33 16.48 14.6 15.54 15.54" stroke="#00F0FF" stroke-width="2" stroke-linecap="round"/></svg>` },
        { name: "Split-Testing", svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="7" height="16" rx="2" fill="#00F0FF" fill-opacity="0.3" stroke="#00F0FF" stroke-width="1.5"/><rect x="13" y="4" width="7" height="16" rx="2" fill="#F59E0B" fill-opacity="0.3" stroke="#F59E0B" stroke-width="1.5"/></svg>` }
    ],

    capabilitiesHeader: {
        kicker: "PERFORMANCE SYSTEMS",
        title: "A Creative Engine Built For Scale",
        subline: "Direct-response video framework engineered to scale ad spend efficiently across platforms."
    },

    services: [
        {
            title: "Creative Strategy",
            icon: "🧠",
            desc: "Researching competitors, customer pain points, and <span class=\"highlight-cyan\">winning angles</span> before editing begins."
        },
        {
            title: "Hook Engineering",
            icon: "🧲",
            desc: "Thumb-stopping openings designed to <span class=\"highlight-cyan\">maximize retention</span> in the first 3 seconds."
        },
        {
            title: "Rapid Testing",
            icon: "🧪",
            desc: "Fast iteration cycles to <span class=\"highlight-cyan\">identify winning concepts</span> before scaling spend."
        },
        {
            title: "AI-Powered Production",
            icon: "🤖",
            desc: "Integrated AI workflows that <span class=\"highlight-cyan\">accelerate production</span> without sacrificing quality."
        }
    ],

    vaultHeader: {
        kicker: "THE CREATIVE VAULT",
        title: "Creative Velocity & Testing",
        subline: "Attention is finite. Creative testing requires speed. I combine nonlinear editing with integrated AI workflows to push variations faster, letting data dictate the final cut."
    },

    methodVideos: [
        "videos/Hook 2.mp4",
        "videos/hook4.mp4",
        "videos/0510(3).mp4",
        "videos/High retention vsl ads video.mp4",
        "videos/0510.mp4",
        "videos/The no 1.mp4"
    ],

    reviews: [
        {
            id: 1,
            clientName: "Alex Vance",
            brand: "Founder, Lumina DTC",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            rating: 5,
            quote: "Ratul scaled our Meta ad CTR by 138% in the first 7 days. His thumb-stop hooks are lethal. Hands down the best direct-response editor we've hired.",
            visible: false
        },
        {
            id: 2,
            clientName: "Marcus Brody",
            brand: "Head of Growth, Apex Gear",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            rating: 5,
            quote: "The speed and AI B-roll execution blew our team away. Turned flat creator footage into a 5.8x ROAS winner.",
            visible: false
        },
        {
            id: 3,
            clientName: "Elena Rostova",
            brand: "Marketing Director, Glow Skincare",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
            rating: 5,
            quote: "Delivered 12 hook variations in 48 hours. Allowed us to scale our TikTok spend effortlessly without creative fatigue.",
            visible: false
        }
    ],

    socials: [
        { name: "Upwork", url: "https://www.upwork.com/freelancers/~0192b4035eed589ec7?mp_source=share://www.upwork.com/freelancers/~0192b4035eed589ec7" },
        { name: "LinkedIn", url: "https://www.linkedin.com" },
        { name: "Twitter/X", url: "https://x.com/kha31106969" }
    ],

    ctaHeader: {
        kicker: "READY TO SCALE YOUR CREATIVE?",
        title: 'Let me <span class="highlight-cyan">Engineer</span> Your Next <span class="text-gradient shimmer-text">Winner.</span>',
        subline: 'Send me your raw footage or current ad campaign. I\'ll <span class="highlight-white">audit your hooks</span> and deliver <span class="highlight-cyan">high-converting cuts</span> built to scale.',
        buttonText: "Start The Conversation"
    },

    contact: {
        email: "khanratul201258@gmail.com",
        calendly: "https://calendly.com"
    }
};