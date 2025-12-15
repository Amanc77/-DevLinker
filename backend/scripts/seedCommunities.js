const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Community = require("../models/Community");
dotenv.config();

// Function to determine tech_stack based on title, tags, and description
// This ensures communities are properly categorized for search functionality
const getTechStack = (community) => {
  const title = (community.title || "").toLowerCase();
  const tags = (community.tags || []).map((t) => t.toLowerCase());
  const desc = (community.description || "").toLowerCase();
  const fullDesc = (community.fullDescription || "").toLowerCase();
  const combined = `${title} ${desc} ${fullDesc} ${tags.join(" ")}`;

  // React communities - check first as it's most common
  if (
    title.includes("react") ||
    title.includes("reactiflux") ||
    title.includes("next.js") ||
    title.includes("nextjs") ||
    title.includes("remix") ||
    title.includes("react native") ||
    tags.includes("react") ||
    tags.includes("next.js") ||
    tags.includes("nextjs") ||
    combined.includes("react.js") ||
    combined.includes("reactjs") ||
    combined.includes("react framework") ||
    combined.includes("jsx")
  ) {
    return "React";
  }

  // Node.js communities
  if (
    title.includes("node") ||
    title.includes("nodeiflux") ||
    title.includes("express.js") ||
    title.includes("expressjs") ||
    tags.includes("node.js") ||
    tags.includes("nodejs") ||
    tags.includes("node") ||
    tags.includes("express") ||
    combined.includes("node.js") ||
    combined.includes("nodejs") ||
    combined.includes("express.js") ||
    combined.includes("backend js") ||
    combined.includes("server-side js")
  ) {
    return "Node.js";
  }

  // Python communities (check before Django/Flask)
  if (
    title.includes("python") ||
    title.includes("pyslackers") ||
    title.includes("real python") ||
    title.includes("r/python") ||
    title.includes("python cpython") ||
    tags.includes("python") ||
    combined.includes("python programming") ||
    combined.includes("pythonista")
  ) {
    // Check if it's Django or Flask specifically
    if (
      title.includes("django") ||
      tags.includes("django") ||
      combined.includes("django framework")
    ) {
      return "Django";
    }
    if (
      title.includes("flask") ||
      tags.includes("flask") ||
      combined.includes("flask framework")
    ) {
      return "Flask";
    }
    return "Python";
  }

  // Django communities
  if (
    title.includes("django") ||
    tags.includes("django") ||
    combined.includes("django framework") ||
    combined.includes("django web")
  ) {
    return "Django";
  }

  // Flask communities
  if (
    title.includes("flask") ||
    tags.includes("flask") ||
    combined.includes("flask framework") ||
    combined.includes("flask web")
  ) {
    return "Flask";
  }

  // Machine Learning communities
  if (
    title.includes("machine learning") ||
    title.includes("ml") ||
    title.includes("ai") ||
    title.includes("artificial intelligence") ||
    title.includes("tensorflow") ||
    title.includes("pytorch") ||
    title.includes("deep learning") ||
    title.includes("neural") ||
    title.includes("kaggle") ||
    title.includes("fast.ai") ||
    title.includes("learnmachinelearning") ||
    title.includes("machinelearning") ||
    tags.includes("machine learning") ||
    tags.includes("ml") ||
    tags.includes("ai") ||
    tags.includes("tensorflow") ||
    tags.includes("pytorch") ||
    tags.includes("deep learning") ||
    combined.includes("neural network") ||
    combined.includes("data science") ||
    combined.includes("data scientist") ||
    combined.includes("ml model") ||
    combined.includes("ai model")
  ) {
    return "Machine Learning";
  }

  // Vue communities
  if (
    title.includes("vue") ||
    title.includes("nuxt") ||
    tags.includes("vue") ||
    tags.includes("vue.js") ||
    tags.includes("vuejs") ||
    tags.includes("nuxt") ||
    combined.includes("vue.js") ||
    combined.includes("vuejs") ||
    combined.includes("nuxt.js")
  ) {
    return "Vue";
  }

  // Angular communities
  if (
    title.includes("angular") ||
    tags.includes("angular") ||
    tags.includes("angular.js") ||
    combined.includes("angular.js") ||
    combined.includes("angular framework") ||
    combined.includes("typescript framework")
  ) {
    return "Angular";
  }

  // Keep original tech_stack if it's already one of the popular stacks
  const original = (community.tech_stack || "").trim();
  const popularStacks = [
    "React",
    "Node.js",
    "Python",
    "Machine Learning",
    "Vue",
    "Angular",
    "Django",
    "Flask",
  ];
  if (popularStacks.includes(original)) {
    return original;
  }

  // Default fallback - keep original or set to General
  return original || "General";
};

const communities = [
  {
    title: "The Coding Den",
    description:
      "Beginner-friendly Discord for Java, Python, databases with giveaways, scrims, and supportive coding help.",
    fullDescription:
      "The Coding Den is a vibrant Discord server tailored for beginners in software development, offering channels for Java, Python, and database learning. With regular giveaways, coding scrims, and a supportive community, it's the perfect place to ask doubts, collaborate on projects, and get guidance from experienced developers. Join to build your skills in a fun, engaging environment.",
    tech_stack: "Python",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Beginners", "Java", "Python", "Support"],
    community_page: "https://thehiveindex.com/communities/the-coding-den/",
    joining_link: "https://discord.com/invite/code",
    logo_url:
      "https://og.tailgraph.com/og?fontFamily=Open%2BSans&title=The%20Coding%20Den&titleTailwind=font-bold%20text-6xl%20text-rose-600&text=Discord%20Server%20for%20Software-development&textTailwind=text-2xl%20mt-4%20text-yellow-600&textFontFamily=Source%2BSans%2BPro&logoUrl=https://1000logos.net/wp-content/uploads/2020/10/Discord-emblem-768x512.jpg&logoTailwind=mx-auto%20h-48%20mb-4&bgUrl=https%3A%2F%2Fthehiveindex.com%2Fstatic%2F6f9a721ed54860c63211350929d004b7%2F9c94d%2Ficon.png&bgTailwind=bg-white&overlay=1&overlayTailwind=bg-white%20opacity-95&footer=thehiveindex.com&footerTailwind=font-bold%20text-rose-500%20text-center%20text-xl&containerTailwind=bg-transparent",
    member_count: 172000,
    activity_level: "High",
    rules:
      "No spam • Be respectful • Use appropriate channels • No harassment • Help others kindly",
  },
  {
    title: "Reactiflux",
    description:
      "Largest React.js community for discussions, help, and events. Beginners can ask doubts about React and JS.",
    fullDescription:
      "Reactiflux is the premier Discord server for React.js enthusiasts, boasting over 230,000 members. It features dedicated channels for troubleshooting, sharing updates, job opportunities, and hosting live events. Beginners are welcome to ask questions, participate in workshops, and network with experts in frontend development using React and JavaScript.",
    tech_stack: "React",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["React", "JavaScript", "Frontend", "Beginners"],
    community_page: "https://www.reactiflux.com/",
    joining_link: "https://discord.com/invite/reactiflux",
    logo_url: "https://reactiflux.com/logo-banner.png",
    member_count: 230000,
    activity_level: "High",
    rules:
      "Be respectful • No harassment • Follow Discord ToS • Use channels correctly • No self-promotion without permission",
  },
  {
    title: "The Programmer's Hangout",
    description:
      "General coding help for all levels with memes, contests. Beginners can ask doubts in supportive environment.",
    fullDescription:
      "The Programmer's Hangout is a welcoming Discord server with over 202,000 members, offering language-specific channels, coding contests, movie nights, and meme sharing. It's an ideal spot for beginners to seek help on any programming topic, collaborate on projects, and enjoy a fun, supportive atmosphere while learning.",
    tech_stack: "General",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Coding", "Help", "Beginners"],
    community_page: "https://theprogrammershangout.com/",
    joining_link: "https://discord.com/invite/programming",
    logo_url:
      "https://img.itch.zone/aW1hZ2UyL2phbS8zMDg1NzgvNTYyMjQxNC5wbmc=/original/CpxEvk.png",
    member_count: 202000,
    activity_level: "High",
    rules:
      "No drama • Be welcoming • Follow channel topics • No NSFW outside areas",
  },
  {
    title: "DevCord",
    description:
      "Community for developers to get help, share projects, and learn together. Ideal for beginners seeking guidance.",
    fullDescription:
      "DevCord is a collaborative Discord server where developers of all levels come together to share projects, troubleshoot code, and learn new technologies. With dedicated channels for Q&A, project showcases, and study groups, it's particularly welcoming for beginners looking for mentorship and community support in their coding journey.",
    tech_stack: "General",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Coding", "Help", "Beginners"],
    community_page: "https://devcord.com/",
    joining_link: "https://discord.gg/devcord",
    logo_url: "https://devcord.com/logo.png",
    member_count: 15000,
    activity_level: "High",
    rules: "No spam • Be respectful • Focus on dev topics • Help beginners",
  },
  {
    title: "SpeakJS",
    description:
      "JavaScript community for newbies and pros. Discuss JS, frameworks. Beginners can ask doubts on frontend.",
    fullDescription:
      "SpeakJS is a lively Discord server for JavaScript enthusiasts, from newbies to professionals. It covers topics like vanilla JS, React, Vue, and Node.js, with channels for discussions, resource sharing, and fun events. Beginners are encouraged to ask questions and receive helpful feedback from the community.",
    tech_stack: "React",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["JavaScript", "Frontend", "Beginners"],
    community_page: "https://speakjs.com/",
    joining_link: "https://discord.com/invite/dAF4F28",
    logo_url: "https://speakjs.com/logo.png",
    member_count: 34000,
    activity_level: "Medium",
    rules:
      "Respectful discussions • No spam • Use channels correctly • English preferred",
  },
  {
    title: "CodeSupport",
    description:
      "Language-agnostic coding support with strict rules. Guidance for beginners and all levels.",
    fullDescription:
      "CodeSupport is a focused Discord server providing coding support across all languages and levels. With strict rules to ensure productive discussions, it offers channels for debugging, code reviews, and learning resources. Beginners benefit from patient explanations and community-driven solutions.",
    tech_stack: "General",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Support", "Coding", "Beginners"],
    community_page: "https://codesupport.dev/",
    joining_link: "https://discord.com/invite/codesupport",
    logo_url: "https://codesupport.dev/logo.png",
    member_count: 37000,
    activity_level: "Medium",
    rules:
      "Strict no-spam policy • Respectful help only • No off-topic • Follow mod instructions",
  },
  {
    title: "Lazy Developers",
    description:
      "Community for beginners to learn skills and open-source projects. Efficient coding practices and doubt clearing.",
    fullDescription:
      "Lazy Developers is a Discord server for efficient coding, where beginners learn smart practices and contribute to open-source. It features channels for quick tips, project collaborations, and doubt clearing sessions, emphasizing work-life balance while building technical skills.",
    tech_stack: "General",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Beginners", "Open Source"],
    community_page: "https://lazydevelopers.com/",
    joining_link: "https://discord.com/invite/lazydevelopers",
    logo_url:
      "https://lazydeveloper.ca/wp-content/uploads/2023/02/LD-logoa.png",
    member_count: 3600,
    activity_level: "Medium",
    rules: "Be efficient • No toxicity • Help each other • Follow Discord ToS",
  },
  {
    title: "Programmer Humor",
    description:
      "Fun memes and humor for programmers. Beginners can relax and ask casual doubts.",
    fullDescription:
      "Programmer Humor is a light-hearted Discord server for sharing coding memes, jokes, and casual conversations. With over 15,000 members, it's a place for beginners to unwind, connect with peers, and occasionally ask casual coding questions in a non-intimidating environment.",
    tech_stack: "General",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Humor", "Relax", "Beginners"],
    community_page: "https://disboard.org/server/244230771232079873",
    joining_link: "https://discord.com/invite/rph",
    logo_url:
      "https://karimoos.com/wp-content/uploads/2024/03/Funny-I-Are-Programmer-Programming-Coding-Nerd-Penguin-Lover-Svg.jpg",
    member_count: 15000,
    activity_level: "High",
    rules:
      "Keep it light • No offensive content • Programming-related only • No spam",
  },
  {
    title: "Web Dev and Web Design",
    description:
      "Discord for web dev and design discussions. Beginners can ask doubts on HTML/CSS/JS.",
    fullDescription:
      "Web Dev and Web Design is a Discord server blending web development and design, with channels for HTML, CSS, JavaScript, and UI/UX tips. Beginners are encouraged to share their work, seek feedback, and participate in design challenges to grow their skills.",
    tech_stack: "React",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Web Dev", "Design", "Beginners"],
    community_page:
      "https://thehiveindex.com/communities/web-dev-and-web-design/",
    joining_link: "https://discord.gg/webdevdesign",
    logo_url:
      "https://thehiveindex.com/static/6f9a721ed54860c63211350929d004b7/9c94d/icon.png",
    member_count: 5000,
    activity_level: "Medium",
    rules: "No spam • Respectful • Focus on web dev and design",
  },
  {
    title: "Programmers Palace",
    description:
      "Open community for all experience levels in programming and CS. Cover web-dev to cybersecurity for beginners.",
    fullDescription:
      "Programmers Palace is an inclusive Discord server for programmers and CS students at all levels, covering topics from web development to cybersecurity. Beginners can find study groups, project partners, and expert advice in a welcoming space.",
    tech_stack: "General",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Programming", "CS", "Beginners"],
    community_page: "https://thehiveindex.com/communities/programmers-palace/",
    joining_link: "https://discord.gg/programming",
    logo_url:
      "https://thehiveindex.com/static/6f9a721ed54860c63211350929d004b7/9c94d/icon.png",
    member_count: 6000,
    activity_level: "Medium",
    rules:
      "Follow Discord CoC • No spam • Respectful interactions • Use channels properly",
  },
  {
    title: "Next.js",
    description:
      "Chat about Next.js, ask questions, show projects. Beginners can get help on React and Next.js doubts.",
    fullDescription:
      "The official Next.js Discord server is a hub for developers using this React framework, with channels for discussions, troubleshooting, project showcases, and job opportunities. Beginners can receive ste/ Decode URL-encoded values and trimp-by-step guidance on building full-stack apps with Next.js.",
    tech_stack: "React",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Next.js", "React", "Beginners"],
    community_page: "https://nextjs.org/community",
    joining_link: "https://discord.gg/nextjs",
    logo_url: "https://nextjs.org/static/images/nextjs-logo.png",
    member_count: 100000,
    activity_level: "High",
    rules: "No spam • Be respectful • Focus on Next.js • Help beginners",
  },
  {
    title: "Vue.js",
    description:
      "Official Vue.js community for discussions and help. Beginners can ask doubts on Vue.",
    fullDescription:
      "The Vue.js Discord server is the official space for the progressive JavaScript framework, offering channels for general chat, framework updates, and troubleshooting. Beginners can find tutorials, examples, and community support to build interactive UIs.",
    tech_stack: "Vue",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Vue.js", "Beginners"],
    community_page: "https://vuejs.org/community",
    joining_link: "https://discord.gg/vuejs",
    logo_url: "https://vuejs.org/images/logo.png",
    member_count: 50000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on Vue.js",
  },
  {
    title: "Angular",
    description:
      "Official Angular community for developers. Beginners can get help on Angular.",
    fullDescription:
      "The Angular Discord server is the official community for Google's TypeScript-based web framework, with channels for Q&A, best practices, and ecosystem tools. Beginners can start with basic component creation and progress to advanced topics with community assistance.",
    tech_stack: "Angular",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Angular", "Beginners"],
    community_page: "https://angular.io/community",
    joining_link: "https://discord.gg/angular",
    logo_url: "https://angular.io/assets/images/logos/angular/angular.svg",
    member_count: 40000,
    activity_level: "High",
    rules: "No spam • Be respectful • Focus on Angular",
  },
  {
    title: "Svelte",
    description:
      "Svelte community for learning and help. Beginners can ask doubts on Svelte.",
    fullDescription:
      "The Svelte Discord server is dedicated to the compiler-based JavaScript framework, offering channels for beginners' tutorials, advanced reactivity, and SvelteKit discussions. Beginners can build their first app and receive feedback from the active community.",
    tech_stack: "Vue",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Svelte", "Beginners"],
    community_page: "https://svelte.dev/chat",
    joining_link: "https://discord.gg/svelte",
    logo_url: "https://svelte.dev/svelte-logo.svg",
    member_count: 20000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on Svelte",
  },
  {
    title: "Node.js",
    description:
      "Official Node.js community for backend JS. Beginners can ask doubts on Node.",
    fullDescription:
      "The official Node.js Discord server is the go-to place for JavaScript runtime discussions, with channels for modules, performance, and deployment. Beginners can learn server-side JS, build APIs, and get help from core contributors.",
    tech_stack: "Node.js",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Node.js", "Backend", "Beginners"],
    community_page: "https://nodejs.org/en/community",
    joining_link: "https://discord.gg/nodejs",
    logo_url: "https://nodejs.org/static/images/logo.svg",
    member_count: 50000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on Node.js",
  },
  {
    title: "Express.js",
    description:
      "Express.js community for web frameworks. Beginners can get help.",
    fullDescription:
      "The Express.js Discord server focuses on the minimal Node.js web framework, with channels for routing, middleware, and API design. Beginners can start with simple servers and advance to full-stack applications with community support.",
    tech_stack: "Node.js",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Express.js", "Beginners"],
    community_page: "https://expressjs.com/en/community",
    joining_link: "https://discord.gg/express",
    logo_url: "https://expressjs.com/images/express-logo.svg",
    member_count: 20000,
    activity_level: "Medium",
    rules: "No spam • Respectful • Focus on Express",
  },
  {
    title: "Django",
    description:
      "Official Django community for Python web dev. Beginners can ask doubts.",
    fullDescription:
      "The official Django Discord server is for the high-level Python web framework, featuring channels for models, views, templates, and deployment. Beginners can build their first Django project and receive guidance from the Django community.",
    tech_stack: "Django",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Django", "Python", "Beginners"],
    community_page: "https://www.djangoproject.com/community/",
    joining_link: "https://discord.gg/django",
    logo_url: "https://www.djangoproject.com/static/img/django-logo-full.svg",
    member_count: 30000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on Django",
  },
  {
    title: "Flask",
    description:
      "Flask community for Python web framework. Beginners can learn and ask.",
    fullDescription:
      "The Flask Discord server is for the lightweight Python web framework, with channels for blueprints, extensions, and testing. Beginners can create microservices and get tips on best practices from the Pallets Projects community.",
    tech_stack: "Flask",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Flask", "Python", "Beginners"],
    community_page: "https://flask.palletsprojects.com/en/3.0.x/community/",
    joining_link: "https://discord.gg/flask",
    logo_url: "https://flask.palletsprojects.com/flask-logo.png",
    member_count: 15000,
    activity_level: "Medium",
    rules: "No spam • Respectful • Focus on Flask",
  },
  {
    title: "Ruby on Rails",
    description: "Rails community for web dev. Beginners can get help on Ruby.",
    fullDescription:
      "The Ruby on Rails Discord server is for the opinionated web framework, offering channels for models, controllers, and migrations. Beginners can follow the 'Rails Girls' guides and collaborate on Rails apps with the community.",
    tech_stack: "General",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Rails", "Ruby", "Beginners"],
    community_page: "https://rubyonrails.org/community",
    joining_link: "https://discord.gg/rails",
    logo_url: "https://rubyonrails.org/images/rails-logo.svg",
    member_count: 25000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on Rails",
  },
  {
    title: "Laravel",
    description:
      "Laravel PHP framework community. Beginners can ask on PHP web dev.",
    fullDescription:
      "The Laravel Discord server is the official home for the elegant PHP framework, with channels for Eloquent ORM, Blade templating, and Artisan commands. Beginners can build their first Laravel app and join study groups.",
    tech_stack: "General",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Laravel", "PHP", "Beginners"],
    community_page: "https://laravel.com/docs/11.x/community",
    joining_link: "https://discord.gg/laravel",
    logo_url: "https://laravel.com/img/logomark.svg",
    member_count: 30000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on Laravel",
  },
  {
    title: "WordPress",
    description:
      "WordPress community for web building. Beginners can learn CMS.",
    fullDescription:
      "The WordPress Discord server is for the world's most popular CMS, featuring channels for themes, plugins, and Gutenberg blocks. Beginners can start with site setup and get help from the global WordPress community.",
    tech_stack: "General",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["WordPress", "CMS", "Beginners"],
    community_page: "https://wordpress.org/support/forums/",
    joining_link: "https://discord.gg/wordpress",
    logo_url: "https://wordpress.org/logo.png",
    member_count: 50000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on WordPress",
  },
  {
    title: "Bootstrap",
    description:
      "Bootstrap CSS framework community. Beginners can get design help.",
    fullDescription:
      "The Bootstrap Discord server is for the popular responsive CSS framework, with channels for components, utilities, and customization. Beginners can build responsive sites and receive design feedback from the community.",
    tech_stack: "React",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Bootstrap", "CSS", "Beginners"],
    community_page:
      "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
    joining_link: "https://discord.gg/bootstrap",
    logo_url:
      "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg",
    member_count: 20000,
    activity_level: "Medium",
    rules: "No spam • Respectful • Focus on Bootstrap",
  },
  {
    title: "Tailwind CSS",
    description:
      "Tailwind community for utility CSS. Beginners can ask on styling.",
    fullDescription:
      "The Tailwind CSS Discord server is the official space for the utility-first CSS framework, offering channels for configuration, plugins, and best practices. Beginners can style their first project and troubleshoot with experts.",
    tech_stack: "React",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Tailwind", "CSS", "Beginners"],
    community_page: "https://tailwindcss.com/docs/installation",
    joining_link: "https://discord.gg/tailwindcss",
    logo_url: "https://tailwindcss.com/img/logo.svg",
    member_count: 40000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on Tailwind",
  },
  {
    title: "React Native",
    description:
      "React Native for mobile web dev. Beginners can learn cross-platform.",
    fullDescription:
      "The React Native Discord server is for building native mobile apps with React, with channels for Expo, navigation, and performance. Beginners can set up their first app and join mobile development discussions.",
    tech_stack: "React",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["React Native", "Mobile", "Beginners"],
    community_page: "https://reactnative.dev/docs/getting-started",
    joining_link: "https://discord.gg/reactnative",
    logo_url: "https://reactnative.dev/img/tiny_logo.svg",
    member_count: 50000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on React Native",
  },
  {
    title: "Flutter",
    description:
      "Flutter community for Google UI toolkit. Beginners can ask on mobile dev.",
    fullDescription:
      "The official Flutter Discord server is for Google's UI toolkit, featuring channels for widgets, state management, and Firebase integration. Beginners can build their first cross-platform app and get community support.",
    tech_stack: "General",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Flutter", "Mobile", "Beginners"],
    community_page: "https://flutter.dev/community",
    joining_link: "https://discord.gg/flutterdev",
    logo_url:
      "https://flutter.dev/images/shared/brand/flutter/logo/flutter-lockup.png",
    member_count: 60000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on Flutter",
  },
  {
    title: "GraphQL",
    description:
      "GraphQL community for API queries. Beginners can learn from basics.",
    fullDescription:
      "The GraphQL Discord server is for the query language for APIs, with channels for schemas, resolvers, and federation. Beginners can design their first GraphQL schema and explore tools like Apollo and Relay.",
    tech_stack: "Node.js",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["GraphQL", "APIs", "Beginners"],
    community_page: "https://graphql.org/community/",
    joining_link: "https://discord.gg/graphql",
    logo_url: "https://graphql.org/img/graphql.svg",
    member_count: 15000,
    activity_level: "Medium",
    rules: "No spam • Respectful • Focus on GraphQL",
  },
  {
    title: "PostgreSQL",
    description: "PostgreSQL community for database. Beginners can ask on SQL.",
    fullDescription:
      "The PostgreSQL Discord server is for the advanced open-source RDBMS, offering channels for queries, extensions, and performance tuning. Beginners can learn SQL basics and database design with expert advice.",
    tech_stack: "Node.js",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Database", "SQL", "Beginners"],
    community_page: "https://www.postgresql.org/community/",
    joining_link: "https://discord.gg/postgresql",
    logo_url: "https://www.postgresql.org/media/img/about/press/elephant.png",
    member_count: 10000,
    activity_level: "Medium",
    rules: "No spam • Respectful • Focus on PostgreSQL",
  },
  {
    title: "MongoDB",
    description: "MongoDB community for NoSQL. Beginners can learn databases.",
    fullDescription:
      "The MongoDB Discord server is for the document-oriented NoSQL database, with channels for aggregation, indexing, and Atlas cloud. Beginners can set up their first collection and query data with community help.",
    tech_stack: "Node.js",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["MongoDB", "NoSQL", "Beginners"],
    community_page: "https://www.mongodb.com/community",
    joining_link: "https://discord.gg/mongodb",
    logo_url: "https://www.mongodb.com/assets/mongodb-logo.png",
    member_count: 20000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on MongoDB",
  },
  {
    title: "Docker",
    description:
      "Docker community for containerization. Beginners can get help on deployment.",
    fullDescription:
      "The Docker Discord server is for the container platform, featuring channels for Dockerfiles, Compose, and Swarm. Beginners can containerize their first app and learn deployment best practices.",
    tech_stack: "Node.js",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Docker", "Deployment", "Beginners"],
    community_page: "https://www.docker.com/community/",
    joining_link: "https://discord.gg/docker",
    logo_url: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
    member_count: 25000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on Docker",
  },
  {
    title: "Kubernetes",
    description:
      "Kubernetes community for orchestration. Beginners can learn container management.",
    fullDescription:
      "The Kubernetes Discord server is for the open-source container orchestration system, with channels for pods, services, and Helm charts. Beginners can deploy their first cluster and troubleshoot with the CNCF community.",
    tech_stack: "Node.js",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Kubernetes", "Orchestration", "Beginners"],
    community_page: "https://kubernetes.io/community/",
    joining_link: "https://discord.gg/kubernetes",
    logo_url: "https://kubernetes.io/images/favicon.png",
    member_count: 30000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on Kubernetes",
  },
  {
    title: "AWS Developers",
    description:
      "AWS community for cloud dev. Beginners can ask on cloud services.",
    fullDescription:
      "The AWS Developers Discord server is for Amazon Web Services, offering channels for EC2, S3, Lambda, and certification prep. Beginners can explore free tier projects and get guidance on cloud architecture.",
    tech_stack: "Node.js",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["AWS", "Cloud", "Beginners"],
    community_page: "https://aws.amazon.com/developer/community/",
    joining_link: "https://discord.gg/aws",
    logo_url: "https://aws.amazon.com/favicon.ico",
    member_count: 40000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on AWS",
  },
  {
    title: "Azure Developers",
    description:
      "Azure community for Microsoft cloud. Beginners can learn cloud basics.",
    fullDescription:
      "The Azure Developers Discord server is for Microsoft Azure, with channels for virtual machines, App Service, and Cosmos DB. Beginners can start with free credits and build serverless apps with community support.",
    tech_stack: "Node.js",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Azure", "Cloud", "Beginners"],
    community_page: "https://azure.microsoft.com/en-us/community/",
    joining_link: "https://discord.gg/azure",
    logo_url: "https://azure.microsoft.com/svghandler/azure.png",
    member_count: 20000,
    activity_level: "Medium",
    rules: "No spam • Respectful • Focus on Azure",
  },
  {
    title: "GitHub Discussions",
    description:
      "Official GitHub for open source discussions. Beginners can ask on version control.",
    fullDescription:
      "GitHub Discussions is the official forum for open source projects on GitHub, allowing threaded conversations on issues, features, and ideas. Beginners can learn Git basics, fork repos, and contribute their first pull request.",
    tech_stack: "General",
    platform: "GitHub",
    location_mode: "Global/Online",
    tags: ["Git", "Open Source", "Beginners"],
    community_page: "https://github.com/community",
    joining_link: "https://github.com/community",
    logo_url:
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    member_count: 40000000,
    activity_level: "High",
    rules: "Be respectful • No spam • Report abuse • Follow guidelines",
  },
  {
    title: "r/webdev",
    description:
      "Reddit for web development discussions. Beginners can ask on frontend/backend.",
    fullDescription:
      "r/webdev is a subreddit with over 500,000 members discussing frontend, backend, and full-stack web development. Beginners can post questions, share projects, and learn from career advice and tool recommendations.",
    tech_stack: "React",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Web Dev", "Beginners"],
    community_page: "https://www.reddit.com/r/webdev/",
    joining_link: "https://www.reddit.com/r/webdev/",
    logo_url:
      "https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_2q6n1h1h9b961.png",
    member_count: 500000,
    activity_level: "High",
    rules: "Follow Reddit rules • No spam • Weekly threads • Be helpful",
  },
  {
    title: "r/frontend",
    description:
      "Reddit for frontend development. Beginners can get tips on JS/CSS.",
    fullDescription:
      "r/Frontend is a subreddit for frontend developers discussing HTML, CSS, JavaScript, and frameworks like React and Vue. With 200,000 members, beginners can find tutorials, job tips, and portfolio feedback.",
    tech_stack: "React",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Frontend", "Beginners"],
    community_page: "https://www.reddit.com/r/Frontend/",
    joining_link: "https://www.reddit.com/r/Frontend/",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/R_logo.svg/250px-R_logo.svg.png",
    member_count: 200000,
    activity_level: "High",
    rules: "Respectful • No spam • Frontend topics • Reddit rules",
  },
  {
    title: "r/learnprogramming",
    description:
      "Reddit for learning programming. Beginners can ask any coding doubt.",
    fullDescription:
      "r/learnprogramming is one of the largest subreddits for beginners, with 3.5 million members sharing resources, asking questions, and motivating each other. It's a safe space for all languages and levels, with weekly advice threads.",
    tech_stack: "General",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Learning", "Beginners"],
    community_page: "https://www.reddit.com/r/learnprogramming/",
    joining_link: "https://www.reddit.com/r/learnprogramming/",
    logo_url:
      "https://styles.redditmedia.com/t5_2fwo0/styles/communityIcon_2fwo0.png",
    member_count: 3500000,
    activity_level: "High",
    rules: "Be helpful • No harassment • Follow subreddit rules • Use flairs",
  },
  {
    title: "r/programming",
    description:
      "Reddit for programming news and discussions. Beginners can follow trends.",
    fullDescription:
      "r/programming is a subreddit for sharing programming news, articles, and discussions, with 360,000 subscribers. Beginners can stay updated on industry trends, read beginner-friendly articles, and participate in debates.",
    tech_stack: "General",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Programming", "Beginners"],
    community_page: "https://www.reddit.com/r/programming/",
    joining_link: "https://www.reddit.com/r/programming/",
    logo_url: "https://b.thumbs.redditmedia.com/4pXUq9k3s7t3Uo1F.png",
    member_count: 360000,
    activity_level: "High",
    rules: "No spam • Relevant content • Be respectful",
  },
  {
    title: "r/coding",
    description:
      "Reddit for coding discussions and help. Beginners can ask doubts.",
    fullDescription:
      "r/coding is a subreddit for general coding discussions, memes, and help requests, with 200,000 members. Beginners can post their code for review, ask for language recommendations, and join casual conversations.",
    tech_stack: "General",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Coding", "Beginners"],
    community_page: "https://www.reddit.com/r/coding/",
    joining_link: "https://www.reddit.com/r/coding/",
    logo_url: "https://b.thumbs.redditmedia.com/4pXUq9k3s7t3Uo1F.png",
    member_count: 200000,
    activity_level: "Medium",
    rules: "Be respectful • No spam • Focus on coding",
  },
  {
    title: "r/compsci",
    description:
      "Reddit for computer science topics. Beginners can learn fundamentals.",
    fullDescription:
      "r/compsci is a subreddit for computer science theory, algorithms, and education, with 500,000 members. Beginners can ask about CS fundamentals, share study notes, and discuss courses like CS50.",
    tech_stack: "General",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["CS", "Beginners"],
    community_page: "https://www.reddit.com/r/compsci/",
    joining_link: "https://www.reddit.com/r/compsci/",
    logo_url: "https://b.thumbs.redditmedia.com/4pXUq9k3s7t3Uo1F.png",
    member_count: 500000,
    activity_level: "High",
    rules: "No spam • Academic focus • Be respectful",
  },
  {
    title: "r/Python",
    description: "Reddit for Python programming. Beginners can ask on Python.",
    fullDescription:
      "r/Python is the official subreddit for Python, with 1.5 million members discussing language features, libraries, and projects. Beginners can find beginner threads, share scripts, and get help on syntax errors.",
    tech_stack: "Python",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Python", "Beginners"],
    community_page: "https://www.reddit.com/r/Python/",
    joining_link: "https://www.reddit.com/r/Python/",
    logo_url: "https://b.thumbs.redditmedia.com/4pXUq9k3s7t3Uo1F.png",
    member_count: 1500000,
    activity_level: "High",
    rules: "No spam • Python-related • Follow rules",
  },
  {
    title: "r/java",
    description: "Reddit for Java programming. Beginners can learn Java.",
    fullDescription:
      "r/java is a subreddit for Java discussions, with 300,000 members sharing JVM news, Spring Boot tips, and Android dev. Beginners can post 'how to start' threads and receive resource recommendations.",
    tech_stack: "General",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Java", "Beginners"],
    community_page: "https://www.reddit.com/r/java/",
    joining_link: "https://www.reddit.com/r/java/",
    logo_url: "https://b.thumbs.redditmedia.com/4pXUq9k3s7t3Uo1F.png",
    member_count: 300000,
    activity_level: "High",
    rules: "No spam • Java focus • Be respectful",
  },
  {
    title: "r/cpp",
    description: "Reddit for C++ programming. Beginners can get help on C++.",
    fullDescription:
      "r/cpp is the subreddit for C++ language and standard library, with 200,000 members discussing compilers, STL, and performance. Beginners can ask about 'Hello World' and progress to modern C++ features.",
    tech_stack: "General",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["C++", "Beginners"],
    community_page: "https://www.reddit.com/r/cpp/",
    joining_link: "https://www.reddit.com/r/cpp/",
    logo_url: "https://b.thumbs.redditmedia.com/4pXUq9k3s7t3Uo1F.png",
    member_count: 200000,
    activity_level: "High",
    rules: "No spam • C++ topics • Respectful",
  },
  {
    title: "r/learnjava",
    description: "Reddit for learning Java. Beginners can ask doubts on Java.",
    fullDescription:
      "r/learnjava is a subreddit for Java learners, with 150,000 members sharing tutorials, book recommendations, and code reviews. Beginners can post their first programs and get feedback on OOP concepts.",
    tech_stack: "General",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Java", "Learning", "Beginners"],
    community_page: "https://www.reddit.com/r/learnjava/",
    joining_link: "https://www.reddit.com/r/learnjava/",
    logo_url: "https://b.thumbs.redditmedia.com/4pXUq9k3s7t3Uo1F.png",
    member_count: 150000,
    activity_level: "High",
    rules: "Be helpful • No spam • Java learning",
  },
  {
    title: "r/ProgrammingBuddies",
    description:
      "Reddit for programming buddies. Beginners can find study partners.",
    fullDescription:
      "r/ProgrammingBuddies is a subreddit for pairing up to learn programming, with 10,000 members posting partner requests and progress updates. Beginners can find accountability partners for online courses or projects.",
    tech_stack: "General",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Buddies", "Beginners"],
    community_page: "https://www.reddit.com/r/ProgrammingBuddies/",
    joining_link: "https://www.reddit.com/r/ProgrammingBuddies/",
    logo_url: "https://b.thumbs.redditmedia.com/4pXUq9k3s7t3Uo1F.png",
    member_count: 10000,
    activity_level: "Medium",
    rules: "Be respectful • No spam • Find partners",
  },
  {
    title: "Python Discord",
    description:
      "The official Python Discord community caters to novices and experts alike, hosting contests, study groups, and career advice. With over 413,760 members, it's a vibrant space for learning Python from basics to advanced topics, sharing projects, and collaborating on code.",
    fullDescription:
      "The official Python Discord community caters to novices and experts alike, hosting contests, study groups, and career advice. With over 413,760 members, it's a vibrant space for learning Python from basics to advanced topics, sharing projects, and collaborating on code.",
    tech_stack: "Python",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Python", "Beginners", "Data Science"],
    community_page: "https://www.pythondiscord.com/",
    joining_link: "https://discord.com/invite/python",
    logo_url:
      "https://miro.medium.com/v2/resize:fit:1200/1*pgOjBS0d_mc10JJG8yKGvQ.png",
    member_count: 413760,
    activity_level: "High",
    rules:
      "Comply with Discord Community Guidelines: Promote good times and memories, no harassment, follow server-specific etiquette. Use appropriate channels and respect moderators.",
  },
  {
    title: "Official Python Forum",
    description:
      "Global Python career and work discussions. Official forums for Python community.",
    fullDescription:
      "The official Python forum is one of the global Python community's main hubs, where members with diverse experiences, personalities, and skills come together to discuss their work and careers. It's one of the most positive and fastest-growing Python communities anywhere — largely thanks to the savvy moderation of its staff.",
    tech_stack: "Python",
    platform: "Forum",
    location_mode: "Global/Online",
    tags: ["Python", "Career"],
    community_page: "https://discuss.python.org/",
    joining_link: "https://discuss.python.org/",
    logo_url:
      "https://us1.discourse-cdn.com/cursor1/original/3X/c/d/cdb9cc51791c4252086068884aaad21b73fbfbba.png",
    member_count: 200000,
    activity_level: "High",
    rules:
      "Follow PSF Code of Conduct: Be open, considerate, respectful. No harassment, report incidents to moderators.",
  },
  {
    title: "Real Python",
    description:
      "Tutorials and career Q&A. Meet the Real Python team and other Pythonistas.",
    fullDescription:
      "Real Python is one of the most valuable resources for any budding Python developer — housing thousands of professional video lessons and tutorials on every aspect of the popular programming language. But while all of this content is great for boosting your skillset, there's also a vibrant Real Python Community Slack where developers discuss career and coding questions.",
    tech_stack: "Python",
    platform: "Slack",
    location_mode: "Global/Online",
    tags: ["Python", "Tutorials"],
    community_page: "https://realpython.com/community/",
    joining_link: "https://realpython.com/community-slack-guide/",
    logo_url:
      "https://files.realpython.com/media/rp_logo_color_small.39664e97458d.png",
    member_count: 50000,
    activity_level: "Medium",
    rules:
      "Follow Slack Code of Conduct: Respectful interactions, no harassment. Use for Python-related discussions.",
  },
  {
    title: "PySlackers",
    description:
      "Inclusive Python Slack for all devs. Growing community for Python enthusiasts.",
    fullDescription:
      "Speaking of Slack communities dedicated to Python — the deftly named PySlackers is one of the most inclusive and enthusiastic communities for all kinds of Python devs. From people who are just beginning to learn the language to those who have built their whole careers around it, you're sure to find them represented here. Apart from lively discussions on all things Python, members also have access to an excellent library of learning resources for this particular language.",
    tech_stack: "Python",
    platform: "Slack",
    location_mode: "Global/Online",
    tags: ["Python"],
    community_page: "https://pyslackers.com/",
    joining_link: "https://pyslackers.com/web/slack",
    logo_url:
      "https://cdn.sanity.io/images/suy5itw4/production/ebb0b2554be6705bcf754a35ff47b6eca1484611-1920x1080.png",
    member_count: 38646,
    activity_level: "High",
    rules:
      "Adhere to Slack Guidelines: Inclusive, respectful environment. Follow code of conduct for positive interactions.",
  },
  {
    title: "TensorFlow Discord",
    description:
      "TensorFlow Discord is dedicated to deep learning, AI, and ML discussions with Google support.",
    fullDescription:
      "TensorFlow Discord is dedicated to deep learning, AI, and ML discussions with Google support. It has around 17,800 members and includes channels for tutorials, projects, and troubleshooting, making it a key resource for machine learning practitioners. Beginners can start with basic models and progress to advanced topics like computer vision and natural language processing with community support and official resources.",
    tech_stack: "Machine Learning",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["TensorFlow", "AI", "Machine Learning"],
    community_page: "https://www.tensorflow.org/community",
    joining_link: "https://discord.com/invite/KNm5Epj",
    logo_url: "https://www.tensorflow.org/static/images/tf_logo_social.png",
    member_count: 17800,
    activity_level: "Medium",
    rules:
      "Adhere to Discord Guidelines: Ensure safe, fun interactions; report violations. Follow community-specific rules on respectful discourse and relevant content.",
  },
  {
    title: "r/LearnMachineLearning",
    description:
      "Reddit for learning ML. Beginners can ask doubts and share resources.",
    fullDescription:
      "r/LearnMachineLearning is a subreddit for machine learning beginners, with 500,000 members sharing courses, books, and project ideas. Beginners can ask about math prerequisites and get roadmap advice.",
    tech_stack: "Machine Learning",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["ML", "Beginners"],
    community_page: "https://www.reddit.com/r/learnmachinelearning/",
    joining_link: "https://www.reddit.com/r/learnmachinelearning/",
    logo_url:
      "https://preview.redd.it/from-pytorch-to-shipping-local-ai-features-v0-fn3wz0kl4q6g1.png?width=640&crop=smart&auto=webp&s=31ce85db77810bb75034f02470f114bfcc5a879c",
    member_count: 500000,
    activity_level: "High",
    rules: "Be welcoming • No harassment • Relevant ML content • Use flairs",
  },
  {
    title: "r/MachineLearning",
    description: "Reddit for ML discussions. Beginners can learn from posts.",
    fullDescription:
      "r/MachineLearning is the main subreddit for ML with 2 million members, discussing research papers, tools, and applications. Beginners can read beginner threads and follow project showcases.",
    tech_stack: "Machine Learning",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["ML", "Beginners"],
    community_page: "https://www.reddit.com/r/MachineLearning/",
    joining_link: "https://www.reddit.com/r/MachineLearning/",
    logo_url: "https://b.thumbs.redditmedia.com/4pXUq9k3s7t3Uo1F.png",
    member_count: 2000000,
    activity_level: "High",
    rules: "Be respectful • No spam • Focus on ML",
  },
  {
    title: "Fast.ai",
    description:
      "Fast.ai Discord for practical deep learning. Beginners can hang out for chat.",
    fullDescription:
      "Fast.ai Discord is the community for the practical deep learning course, with channels for course discussions, project sharing, and study groups. Beginners can follow the free course and get help on assignments.",
    tech_stack: "Machine Learning",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Deep Learning", "Beginners"],
    community_page: "https://forums.fast.ai/t/fast-ai-discord/122405",
    joining_link: "https://discord.gg/fastai",
    logo_url:
      "https://miro.medium.com/v2/resize:fit:686/1*crkurIhhTtJe_DcRq7XX-A.png",
    member_count: 15389,
    activity_level: "High",
    rules: "Respectful • Harassment-free • Deep learning discussions",
  },
  {
    title: "Kaggle",
    description:
      "Kaggle community for data science competitions. Beginners can participate in notebooks.",
    fullDescription:
      "Kaggle is the world's largest data science community with 15 million users, offering competitions, datasets, and notebooks. Beginners can join beginner competitions, fork kernels, and learn from top solutions.",
    tech_stack: "Machine Learning",
    platform: "Forum",
    location_mode: "Global/Online",
    tags: ["Competitions", "Beginners"],
    community_page: "https://www.kaggle.com/",
    joining_link: "https://www.kaggle.com/",
    logo_url:
      "https://storage.googleapis.com/kaggle-datasets-images/2882350/4969652/3339e7698b11335446ec34ba8bdd77e4/dataset-cover.png?t=2023-02-09-15-41-08",
    member_count: 15000000,
    activity_level: "High",
    rules: "No plagiarism • Respect competition rules • Cite sources",
  },
  {
    title: "PyTorch Discord",
    description: "Official PyTorch community for deep learning discussions.",
    fullDescription:
      "PyTorch Discord is the official server for Facebook's PyTorch framework, with channels for research, tutorials, and model sharing. Beginners can learn tensor operations and build neural networks with community support and official announcements.",
    tech_stack: "Machine Learning",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["PyTorch", "Deep Learning", "Beginners"],
    community_page: "https://pytorch.org/community",
    joining_link: "https://discord.gg/pytorch",
    logo_url: "https://pytorch.org/assets/images/logo-icon.svg",
    member_count: 30000,
    activity_level: "High",
    rules: "No spam • Respectful • Focus on PyTorch",
  },
  {
    title: "Nodeiflux",
    description:
      "Nodeiflux is a backend-focused Discord community for Node.js developers, acting as a sister server to Reactiflux. With approximately 21,500 members, it provides channels for queries, updates, gigs, and collaborations. It's ideal for discussing Node-specific topics, sharing resources, and networking within the JavaScript backend ecosystem.",
    fullDescription:
      "Nodeiflux is a backend-focused Discord community for Node.js developers, acting as a sister server to Reactiflux. With approximately 21,500 members, it provides channels for queries, updates, gigs, and collaborations. It's ideal for discussing Node-specific topics, sharing resources, and networking within the JavaScript backend ecosystem.",
    tech_stack: "Node.js",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Node.js", "Backend", "JavaScript"],
    community_page: "https://nodeiflux.com/",
    joining_link: "https://discord.com/invite/nodejs",
    logo_url:
      "https://www.nodeflux.io/_next/static/media/nodeflux-primary-purple.159cd028.png",
    member_count: 21500,
    activity_level: "High",
    rules:
      "Respectful behavior • No spam • No NSFW • Use correct channels • English only in main channels",
  },
  {
    title: "iOS Programming",
    description:
      "Subreddit for iOS development discussions, code samples, and open source projects.",
    fullDescription:
      "A subreddit to discuss, share articles, code samples, open source projects and anything else related to iOS, macOS, watchOS, tvOS development. Beginners can ask doubts and share their apps.",
    tech_stack: "Mobile (iOS)",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["iOS", "Swift", "Objective-C", "Mobile Dev"],
    community_page: "https://www.reddit.com/r/iOSProgramming/",
    joining_link: "https://www.reddit.com/r/iOSProgramming/",
    logo_url:
      "https://a.thumbs.redditmedia.com/OOgmB8Dfx2mP1b4JskM4K5K7L1W8SFOI3o1yW5E5Ws4.jpg",
    member_count: 150000,
    activity_level: "High",
    rules:
      "No self-promotion without contribution • Be respectful • Follow Reddit content policy",
  },
  {
    title: "iOS Developers Slack",
    description: "Slack community for passionate iOS app developers.",
    fullDescription:
      "A vibrant Slack group with over 35,000 members focused on iOS development, sharing tips, troubleshooting, and networking. Ideal for beginners to experts in Swift and app building.",
    tech_stack: "Mobile (iOS)",
    platform: "Slack",
    location_mode: "Global/Online",
    tags: ["iOS", "Slack", "App Development", "Beginners"],
    community_page: "https://ios-developers.io/",
    joining_link: "https://ios-developers.io/join",
    logo_url: "https://ios-developers.io/logo.png",
    member_count: 35000,
    activity_level: "High",
    rules:
      "Invite-only • No spam • Respectful discussions • Use channels appropriately",
  },
  {
    title: "Swift Discord",
    description: "Discord server for Swift language enthusiasts.",
    fullDescription:
      "Community Discord for Swift developers, covering iOS, macOS, and server-side Swift. Channels for Q&A, projects, and events. Beginners welcome to ask doubts.",
    tech_stack: "Mobile (iOS)",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Swift", "iOS", "Discord", "Beginners"],
    community_page: "https://swift.org/community/",
    joining_link: "https://discord.gg/swift",
    logo_url: "https://swift.org/assets/images/swift.svg",
    member_count: 20000,
    activity_level: "Medium",
    rules: "Be kind • No harassment • Stay on topic • Follow Discord ToS",
  },
  {
    title: "Android Dev Discord",
    description: "Discord community for Android developers.",
    fullDescription:
      "Official Discord linked to r/androiddev, with channels for Kotlin, Java, UI/UX, and app publishing. Beginners can seek help on building their first app.",
    tech_stack: "Mobile (Android)",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Android", "Kotlin", "Java", "Mobile Dev"],
    community_page: "https://www.reddit.com/r/androiddev/",
    joining_link: "https://discord.gg/androiddev",
    logo_url: "https://developer.android.com/images/brand/Android_Robot.png",
    member_count: 15000,
    activity_level: "High",
    rules: "No spam • Respectful • Use correct channels • Help others",
  },
  {
    title: "Android United Slack",
    description: "Friendly Slack for Android developers.",
    fullDescription:
      "A welcoming Slack community with 3,000+ members discussing Android development, sharing resources, and collaborating on projects. Great for beginners.",
    tech_stack: "Mobile (Android)",
    platform: "Slack",
    location_mode: "Global/Online",
    tags: ["Android", "Slack", "Development", "Beginners"],
    community_page: "https://android-united.com/",
    joining_link: "https://android-united.slack.com/",
    logo_url: "https://android-united.com/logo.png",
    member_count: 3000,
    activity_level: "Medium",
    rules: "Be friendly • No harassment • Android topics only",
  },
  {
    title: "r/androiddev",
    description: "Subreddit for Android development news and discussions.",
    fullDescription:
      "News and discussions for Android developers, including tools, libraries, and best practices. Beginners can ask questions in weekly threads.",
    tech_stack: "Mobile (Android)",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Android", "Reddit", "Dev News", "Beginners"],
    community_page: "https://www.reddit.com/r/androiddev/",
    joining_link: "https://www.reddit.com/r/androiddev/",
    logo_url:
      "https://styles.redditmedia.com/t5_2qlg7/styles/communityIcon_4g1uo0kd87c61.png",
    member_count: 200000,
    activity_level: "High",
    rules: "No self-promotion • Be helpful • Follow subreddit rules",
  },
  {
    title: "r/gamedev",
    description: "Subreddit for game development discussions.",
    fullDescription:
      "Community for game devs covering design, programming, art, and marketing. Beginners can share prototypes and get feedback.",
    tech_stack: "Game Dev",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Game Dev", "Unity", "Unreal", "Beginners"],
    community_page: "https://www.reddit.com/r/gamedev/",
    joining_link: "https://www.reddit.com/r/gamedev/",
    logo_url:
      "https://styles.redditmedia.com/t5_2qhwp/styles/communityIcon_4g1uo0kd87c61.png",
    member_count: 1000000,
    activity_level: "High",
    rules: "No low-effort posts • Be respectful • No piracy",
  },
  {
    title: "Game Dev League",
    description: "Discord for game developers.",
    fullDescription:
      "Large Discord server for indie and professional game devs, with channels for jams, feedback, and resources. Beginners encouraged.",
    tech_stack: "Game Dev",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Game Dev", "Discord", "Indie", "Beginners"],
    community_page: "https://gamedevleague.com/",
    joining_link: "https://discord.gg/gamedevleague",
    logo_url: "https://gamedevleague.com/logo.png",
    member_count: 50000,
    activity_level: "High",
    rules: "No NSFW • Respectful • Use channels properly",
  },
  {
    title: "IndieDev Slack",
    description: "Slack community for indie game developers.",
    fullDescription:
      "Slack group focused on indie game development, sharing experiences, tools, and collaboration opportunities for beginners and pros.",
    tech_stack: "Game Dev",
    platform: "Slack",
    location_mode: "Global/Online",
    tags: ["Indie Dev", "Slack", "Games", "Beginners"],
    community_page: "https://indiedevslack.com/",
    joining_link: "https://indiedev.slack.com/",
    logo_url: "https://indiedevslack.com/logo.png",
    member_count: 10000,
    activity_level: "Medium",
    rules: "Be supportive • No spam • Game dev focus",
  },
  {
    title: "r/cybersecurity",
    description: "Subreddit for cybersecurity discussions.",
    fullDescription:
      "Forum for discussing cybersecurity topics, research, threats, and career advice. Beginners can learn basics and ask questions.",
    tech_stack: "Cybersecurity",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Cybersecurity", "Security", "Hacking", "Beginners"],
    community_page: "https://www.reddit.com/r/cybersecurity/",
    joining_link: "https://www.reddit.com/r/cybersecurity/",
    logo_url:
      "https://styles.redditmedia.com/t5_2t2g5/styles/communityIcon_4g1uo0kd87c61.png",
    member_count: 500000,
    activity_level: "High",
    rules: "No self-promotion • Respectful debates • No illegal advice",
  },
  {
    title: "DEX Security Discord",
    description: "Discord server for cybersecurity enthusiasts.",
    fullDescription:
      "Community for learning cybersecurity, sharing tools, CTFs, and networking. From students to experts, all levels welcome.",
    tech_stack: "Cybersecurity",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Cybersecurity", "Discord", "CTF", "Beginners"],
    community_page:
      "https://medium.com/@declanmidd/top-cybersecurity-discord-servers",
    joining_link: "https://discord.gg/dexsecurity",
    logo_url: "https://dexsecurity.com/logo.png",
    member_count: 10000,
    activity_level: "Medium",
    rules: "No harassment • Stay legal • Help others",
  },
  {
    title: "TheHiveMind Discord",
    description: "Cybersecurity community for enthusiasts.",
    fullDescription:
      "Discord for new and experienced cybersecurity pros to share resources, hold study sessions, and support each other.",
    tech_stack: "Cybersecurity",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Cybersecurity", "Study", "Resources", "Beginners"],
    community_page:
      "https://discord.com/servers/thehivemind-1235399448780341289",
    joining_link: "https://discord.gg/thehivemind",
    logo_url: "https://discord.com/assets/thehivemind-logo.png",
    member_count: 5000,
    activity_level: "Medium",
    rules: "Encourage growth • No spam • Respect privacy",
  },
  {
    title: "Web3 Career Discord",
    description: "Discord for Web3 and blockchain developers.",
    fullDescription:
      "Community with channels for development, NFTs, DeFi, and career advice in Web3. Over 2,400 members sharing knowledge.",
    tech_stack: "Blockchain/Web3",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Web3", "Blockchain", "NFT", "DeFi"],
    community_page: "https://web3.career/discord",
    joining_link: "https://discord.gg/web3career",
    logo_url: "https://web3.career/logo.png",
    member_count: 2400,
    activity_level: "Medium",
    rules: "No scams • Respectful • Web3 focus",
  },
  {
    title: "r/ethdev",
    description: "Subreddit for Ethereum developers.",
    fullDescription:
      "Discussions on building dApps, smart contracts, and blockchain tech. Beginners can learn Solidity and Web3 basics.",
    tech_stack: "Blockchain/Web3",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Ethereum", "Solidity", "dApps", "Beginners"],
    community_page: "https://www.reddit.com/r/ethdev/",
    joining_link: "https://www.reddit.com/r/ethdev/",
    logo_url:
      "https://styles.redditmedia.com/t5_2zf1k/styles/communityIcon_4g1uo0kd87c61.png",
    member_count: 50000,
    activity_level: "High",
    rules: "No spam • Relevant content • Be helpful",
  },
  {
    title: "Blockchain Developers Telegram",
    description: "Telegram group for blockchain devs.",
    fullDescription:
      "Active group discussing Web3 tech, hackathons, and code sharing. Great for learning and finding work in blockchain.",
    tech_stack: "Blockchain/Web3",
    platform: "Telegram",
    location_mode: "Global/Online",
    tags: ["Blockchain", "Telegram", "Web3", "Hackathons"],
    community_page: "https://t.me/blockchaindevs",
    joining_link: "https://t.me/blockchaindevs",
    logo_url: "https://telegram.org/img/t_logo.png",
    member_count: 10000,
    activity_level: "High",
    rules: "No advertising • English only • Respect members",
  },
  {
    title: "Freqtrade Discord",
    description: "Discord for open source trading bot.",
    fullDescription:
      "Community for Freqtrade open source project, discussing contributions, setups, and strategies. Beginners welcome.",
    tech_stack: "Open Source",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Open Source", "Trading", "Python", "Beginners"],
    community_page: "https://freqtrade.io/",
    joining_link: "https://discord.gg/freqtrade",
    logo_url: "https://freqtrade.io/logo.png",
    member_count: 10000,
    activity_level: "Medium",
    rules: "Be collaborative • No financial advice • Respect",
  },
  {
    title: "Linux.Chat Discord",
    description: "Discord for Linux open source enthusiasts.",
    fullDescription:
      "Channels for Linux distros, kernel dev, and open source projects. Beginners can ask for help on contributions.",
    tech_stack: "Open Source",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Linux", "Open Source", "Discord", "Beginners"],
    community_page: "https://linux.chat/",
    joining_link: "https://discord.gg/linuxchat",
    logo_url: "https://linux.chat/logo.png",
    member_count: 20000,
    activity_level: "High",
    rules: "No trolling • Help newbies • Stay on topic",
  },
  {
    title: "freeCodeCamp Forum",
    description: "Forum for open source learning platform.",
    fullDescription:
      "Community forum for freeCodeCamp, discussing coding challenges, projects, and open source contributions.",
    tech_stack: "Open Source",
    platform: "Forum",
    location_mode: "Global/Online",
    tags: ["Open Source", "Learning", "Coding", "Beginners"],
    community_page: "https://forum.freecodecamp.org/",
    joining_link: "https://forum.freecodecamp.org/",
    logo_url: "https://freecodecamp.org/logo.png",
    member_count: 500000,
    activity_level: "High",
    rules: "Be positive • No spam • Follow CoC",
  },
  {
    title: "Data Science Discord",
    description: "Discord for data science professionals and enthusiasts.",
    fullDescription:
      "Community loving data and science, with channels for projects, jobs, and learning. Beginners can join study groups.",
    tech_stack: "Data Science",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Data Science", "Analytics", "Discord", "Beginners"],
    community_page: "https://discord.com/invite/UYNaemm",
    joining_link: "https://discord.com/invite/UYNaemm",
    logo_url: "https://discord.com/assets/data-science-logo.png",
    member_count: 18666,
    activity_level: "Medium",
    rules: "Respectful • No self-promo • Data topics",
  },
  {
    title: "r/datascience",
    description: "Subreddit for data science discussions.",
    fullDescription:
      "Forum for data science careers, projects, and tools. Beginners can ask about getting started in the field.",
    tech_stack: "Data Science",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Data Science", "Reddit", "Careers", "Beginners"],
    community_page: "https://www.reddit.com/r/datascience/",
    joining_link: "https://www.reddit.com/r/datascience/",
    logo_url:
      "https://styles.redditmedia.com/t5_2r0qi/styles/communityIcon_4g1uo0kd87c61.png",
    member_count: 1000000,
    activity_level: "High",
    rules: "No low-effort posts • Be professional • No surveys",
  },
  {
    title: "DataTalksClub Slack",
    description: "Slack community for data talks and learning.",
    fullDescription:
      "Massive Slack with 78,000+ members for data science, ML, and engineering discussions. Includes courses and meetups.",
    tech_stack: "Data Science",
    platform: "Slack",
    location_mode: "Global/Online",
    tags: ["Data Science", "Slack", "ML", "Beginners"],
    community_page: "https://datatalks.club/",
    joining_link: "https://datatalks.club/slack.html",
    logo_url: "https://datatalks.club/logo.png",
    member_count: 78000,
    activity_level: "High",
    rules: "Inclusive • No spam • Contribute positively",
  },
  {
    title: "Backend Devs Discord",
    description: "Discord for backend developers.",
    fullDescription:
      "Community discussing servers, APIs, databases, and scaling. Beginners can get advice on languages like Node, Python.",
    tech_stack: "Backend",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Backend", "APIs", "Databases", "Beginners"],
    community_page: "https://backenddevs.com/",
    joining_link: "https://discord.gg/backenddevs",
    logo_url: "https://backenddevs.com/logo.png",
    member_count: 20000,
    activity_level: "High",
    rules: "No frontend only • Respectful • Share knowledge",
  },
  {
    title: "r/backend",
    description: "Subreddit for backend development.",
    fullDescription:
      "Discussions on backend technologies, architectures, and best practices. Part of webdev community.",
    tech_stack: "Backend",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Backend", "Reddit", "Tech", "Beginners"],
    community_page: "https://www.reddit.com/r/backend/",
    joining_link: "https://www.reddit.com/r/backend/",
    logo_url: "https://reddit.com/favicon.ico",
    member_count: 50000,
    activity_level: "Medium",
    rules: "Relevant posts • No spam • Be helpful",
  },
  {
    title: "Backend Slack",
    description: "Slack group for backend engineers.",
    fullDescription:
      "Channels for different backend stacks, job postings, and mentorship. Suitable for beginners learning server-side dev.",
    tech_stack: "Backend",
    platform: "Slack",
    location_mode: "Global/Online",
    tags: ["Backend", "Slack", "Engineering", "Beginners"],
    community_page: "https://backend.slack.com/",
    joining_link: "https://backend.slack.com/join",
    logo_url: "https://slack.com/logo.png",
    member_count: 15000,
    activity_level: "Medium",
    rules: "Professional conduct • No off-topic • Supportive",
  },
  {
    title: "ML/AI Discord",
    description: "Discord for ML and AI discussions.",
    fullDescription:
      "Community for machine learning and AI, with channels for models, datasets, and ethics. Beginners can start with basics.",
    tech_stack: "ML/AI",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["ML", "AI", "Discord", "Beginners"],
    community_page: "https://discord.gg/mlai",
    joining_link: "https://discord.gg/mlai",
    logo_url: "https://mlai.com/logo.png",
    member_count: 30000,
    activity_level: "High",
    rules: "No misinformation • Respectful • Share sources",
  },
  {
    title: "r/MachineLearning",
    description: "Subreddit for machine learning.",
    fullDescription:
      "Discussions on ML research, tools, and applications. Beginners section for intro posts.",
    tech_stack: "ML/AI",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Machine Learning", "Reddit", "Research", "Beginners"],
    community_page: "https://www.reddit.com/r/MachineLearning/",
    joining_link: "https://www.reddit.com/r/MachineLearning/",
    logo_url: "https://reddit.com/favicon.ico",
    member_count: 2000000,
    activity_level: "High",
    rules: "No self-promo • Relevant content • Be civil",
  },
  {
    title: "AI Slack Community",
    description: "Slack for AI developers.",
    fullDescription:
      "Group for AI and ML pros, sharing papers, code, and job ops. Beginners welcome in learning channels.",
    tech_stack: "ML/AI",
    platform: "Slack",
    location_mode: "Global/Online",
    tags: ["AI", "Slack", "Development", "Beginners"],
    community_page: "https://ai.slack.com/",
    joining_link: "https://ai.slack.com/join",
    logo_url: "https://slack.com/ai-logo.png",
    member_count: 25000,
    activity_level: "Medium",
    rules: "Inclusive • No spam • AI focus",
  },
  {
    title: "r/webdev",
    description: "Subreddit for web development.",
    fullDescription:
      "Community for frontend and backend web dev, tools, and trends. Beginners can post questions.",
    tech_stack: "Web Dev",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Web Dev", "Frontend", "Backend", "Beginners"],
    community_page: "https://www.reddit.com/r/webdev/",
    joining_link: "https://www.reddit.com/r/webdev/",
    logo_url:
      "https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_4g1uo0kd87c61.png",
    member_count: 1000000,
    activity_level: "High",
    rules: "No low-effort • Be respectful • Use flairs",
  },
  {
    title: "Web Dev Discord",
    description: "Discord for web developers.",
    fullDescription:
      "Channels for HTML, CSS, JS, frameworks, and hosting. Beginners can get live help.",
    tech_stack: "Web Dev",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Web Dev", "Discord", "JS", "Beginners"],
    community_page: "https://webdevdiscord.com/",
    joining_link: "https://discord.gg/webdev",
    logo_url: "https://webdevdiscord.com/logo.png",
    member_count: 30000,
    activity_level: "High",
    rules: "No ads • Helpful • Web topics",
  },
  {
    title: "Web Designers Slack",
    description: "Slack for web design and dev.",
    fullDescription:
      "Community for web professionals, discussing design tools, UX, and code. Beginners section available.",
    tech_stack: "Web Dev",
    platform: "Slack",
    location_mode: "Global/Online",
    tags: ["Web Design", "Slack", "UX", "Beginners"],
    community_page: "https://webdesigners.slack.com/",
    joining_link: "https://webdesigners.slack.com/join",
    logo_url: "https://slack.com/web-logo.png",
    member_count: 20000,
    activity_level: "Medium",
    rules: "Professional • No off-topic • Supportive",
  },
  {
    title: "Python Telegram Group",
    description: "Telegram group for Python developers.",
    fullDescription:
      "Active chat for Python coding, libraries, and projects. Beginners can ask doubts anytime.",
    tech_stack: "Python",
    platform: "Telegram",
    location_mode: "Global/Online",
    tags: ["Python", "Telegram", "Coding", "Beginners"],
    community_page: "https://t.me/python",
    joining_link: "https://t.me/python",
    logo_url: "https://telegram.org/img/t_logo.png",
    member_count: 100000,
    activity_level: "High",
    rules: "English preferred • No spam • Be helpful",
  },
  {
    title: "Developers WhatsApp Group",
    description: "WhatsApp group for general developers.",
    fullDescription:
      "Group chat for sharing code snippets, job alerts, and quick questions. Multi-language support.",
    tech_stack: "General",
    platform: "WhatsApp",
    location_mode: "Global/Online",
    tags: ["General Dev", "WhatsApp", "Networking", "Beginners"],
    community_page: "https://chat.whatsapp.com/devgroup",
    joining_link: "https://chat.whatsapp.com/devgroup",
    logo_url: "https://whatsapp.com/logo.png",
    member_count: 500,
    activity_level: "Medium",
    rules: "No forwards • Respect privacy • Dev related",
  },
  {
    title: "Dev Community on X",
    description: "X (Twitter) community for developers.",
    fullDescription:
      "Twitter spaces, threads, and polls for dev topics. Follow hashtags like #DevCommunity.",
    tech_stack: "General",
    platform: "Twitter",
    location_mode: "Global/Online",
    tags: ["Dev", "Twitter", "Networking", "Trends"],
    community_page: "https://x.com/i/communities/dev",
    joining_link: "https://x.com/i/communities/dev",
    logo_url: "https://x.com/logo.png",
    member_count: 500000,
    activity_level: "High",
    rules: "Follow X rules • No hate • Engage positively",
  },
  {
    title: "PythonPune Meetup",
    description: "Meetup group for Python in Pune.",
    fullDescription:
      "Regular meetups for Python talks, workshops, and networking in Pune, India. Hybrid events.",
    tech_stack: "Python",
    platform: "Meetup",
    location_mode: "Hybrid",
    tags: ["Python", "Meetup", "India", "Workshops"],
    community_page: "https://www.meetup.com/pythonpune/",
    joining_link: "https://www.meetup.com/pythonpune/",
    logo_url: "https://meetup.com/logo.png",
    member_count: 5000,
    activity_level: "Medium",
    rules: "RSVP required • Be punctual • Inclusive",
  },
  {
    title: "GDG New Delhi",
    description: "Google Developer Group New Delhi.",
    fullDescription:
      "Events on Google tech, Android, cloud. Online and offline meetups for Indian devs.",
    tech_stack: "General",
    platform: "Community",
    location_mode: "India/Online",
    tags: ["Google", "Dev Group", "India", "Events"],
    community_page: "https://gdg.community.dev/gdg-new-delhi/",
    joining_link: "https://gdg.community.dev/gdg-new-delhi/",
    logo_url:
      "https://developers.google.com/community/gdg/images/logo-lockup-gdg-icon.png",
    member_count: 10000,
    activity_level: "High",
    rules: "Follow CoC • Participate actively • No sales",
  },
  {
    title: "ReactJS Bangalore Meetup",
    description: "Meetup for React developers in Bangalore.",
    fullDescription:
      "Hybrid events on React, state management, and web apps. Great for networking in India.",
    tech_stack: "React",
    platform: "Meetup",
    location_mode: "Hybrid",
    tags: ["React", "Meetup", "Bangalore", "Web"],
    community_page: "https://www.meetup.com/reactjs-bangalore/",
    joining_link: "https://www.meetup.com/reactjs-bangalore/",
    logo_url: "https://meetup.com/react-logo.png",
    member_count: 27000,
    activity_level: "High",
    rules: "Attend events • Share knowledge • Inclusive",
  },
  {
    title: "Big Data & AI India Meetup",
    description: "Meetup for big data and AI in India.",
    fullDescription:
      "Offline meetups discussing big data tools, AI models, and case studies. Focused on Indian context.",
    tech_stack: "Data Science",
    platform: "Meetup",
    location_mode: "Offline",
    tags: ["Big Data", "AI", "India", "Meetup"],
    community_page: "https://www.meetup.com/big-data-ai-india/",
    joining_link: "https://www.meetup.com/big-data-ai-india/",
    logo_url: "https://meetup.com/bigdata-logo.png",
    member_count: 10000,
    activity_level: "Medium",
    rules: "In-person attendance • Network respectfully • No recruiting",
  },
  {
    title: "PyDelhi Community",
    description: "Python community in Delhi, online focus.",
    fullDescription:
      "Online events, talks, and sprints for Python devs in India. Welcomes beginners.",
    tech_stack: "Python",
    platform: "Community",
    location_mode: "India/Online",
    tags: ["Python", "Delhi", "Online", "Beginners"],
    community_page: "https://pydelhi.org/",
    joining_link: "https://pydelhi.org/join",
    logo_url: "https://pydelhi.org/logo.png",
    member_count: 5000,
    activity_level: "Medium",
    rules: "Follow PSF CoC • Participate • Inclusive",
  },
  {
    title: "DEV Community",
    description: "Blogging platform for developers.",
    fullDescription:
      "Community for sharing articles, projects, and advice on dev topics. Great for writing and reading blogs.",
    tech_stack: "General",
    platform: "Blog",
    location_mode: "Global/Online",
    tags: ["Dev", "Blog", "Articles", "Community"],
    community_page: "https://dev.to/",
    joining_link: "https://dev.to/",
    logo_url: "https://dev.to/logo.png",
    member_count: 1000000,
    activity_level: "High",
    rules: "Original content • Be kind • No plagiarism",
  },
  {
    title: "Hashnode Developers",
    description: "Blog platform for tech writers.",
    fullDescription:
      "Community for developer blogs, Q&A, and networking. Focus on sharing knowledge through writing.",
    tech_stack: "General",
    platform: "Blog",
    location_mode: "Global/Online",
    tags: ["Blog", "Tech", "Writing", "Beginners"],
    community_page: "https://hashnode.com/",
    joining_link: "https://hashnode.com/join",
    logo_url: "https://hashnode.com/logo.png",
    member_count: 500000,
    activity_level: "High",
    rules: "Quality posts • Engage • No spam",
  },
  {
    title: "LinkedIn Developers Group",
    description: "LinkedIn group for professional developers.",
    fullDescription:
      "Network, share jobs, articles, and discuss trends on LinkedIn. Professional focus.",
    tech_stack: "General",
    platform: "LinkedIn",
    location_mode: "Global/Online",
    tags: ["LinkedIn", "Networking", "Jobs", "Professional"],
    community_page: "https://www.linkedin.com/groups/developers",
    joining_link: "https://www.linkedin.com/groups/developers",
    logo_url: "https://linkedin.com/logo.png",
    member_count: 1000000,
    activity_level: "High",
    rules: "Professional • No sales pitches • Relevant content",
  },
  {
    title: "freeCodeCamp Guide",
    description: "Guide and forum for coding learners.",
    fullDescription:
      "Resources, tutorials, and forum for self-taught developers. Open source curriculum.",
    tech_stack: "General",
    platform: "Guide",
    location_mode: "Global/Online",
    tags: ["Coding", "Guide", "Learning", "Beginners"],
    community_page: "https://www.freecodecamp.org/",
    joining_link: "https://forum.freecodecamp.org/",
    logo_url: "https://freecodecamp.org/logo.png",
    member_count: 1000000,
    activity_level: "High",
    rules: "Helpful • No cheating • Follow CoC",
  },
  {
    title: "GDG Global",
    description: "Google Developer Groups worldwide.",
    fullDescription:
      "Local and online chapters for Google tech events, workshops, and networking. Both online and offline.",
    tech_stack: "General",
    platform: "Community",
    location_mode: "Global/Online & Offline",
    tags: ["Google", "Dev Groups", "Events", "Networking"],
    community_page: "https://developers.google.com/community/gdg",
    joining_link: "https://developers.google.com/community/gdg",
    logo_url: "https://developers.google.com/community/images/gdg-logo.png",
    member_count: 1000000,
    activity_level: "High",
    rules: "Inclusive • Follow Google CoC • Participate",
  },
  {
    title: "Women Who Code Delhi",
    description: "Community for women in tech in Delhi.",
    fullDescription:
      "Events and support for women developers in India, with online and offline sessions.",
    tech_stack: "General",
    platform: "Community",
    location_mode: "Global/Online & Offline",
    tags: ["Women in Tech", "Delhi", "Support", "Events"],
    community_page: "https://womenwhocode.com/delhi",
    joining_link: "https://womenwhocode.com/delhi",
    logo_url: "https://womenwhocode.com/logo.png",
    member_count: 5000,
    activity_level: "Medium",
    rules: "Empowering • Inclusive • No harassment",
  },
  {
    title: "Google Developer Community",
    description:
      "Global community of developers sharing knowledge and ideas, including GSoC discussions.",
    fullDescription:
      "A Discord server for developers worldwide, with channels for open source, GSoC, and general coding topics. Great for GSoC preparation and networking.",
    tech_stack: "Open Source",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["GSoC", "Open Source", "Developers", "Beginners"],
    community_page: "https://discord.com/invite/google-dev-community",
    joining_link: "https://discord.com/invite/google-dev-community",
    logo_url: "https://developers.google.com/images/logo.svg",
    member_count: 83594,
    activity_level: "High",
    rules:
      "Follow Discord guidelines • Be respectful • No spam • Relevant discussions",
  },
  {
    title: "r/gsoc",
    description:
      "Subreddit for Google Summer of Code applicants, mentors, and discussions.",
    fullDescription:
      "Community focused on GSoC experiences, project ideas, preparation tips, and organization selections for open source enthusiasts.",
    tech_stack: "Open Source",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["GSoC", "Open Source", "Students", "Mentors"],
    community_page: "https://www.reddit.com/r/gsoc/",
    joining_link: "https://www.reddit.com/r/gsoc/",
    logo_url: "https://www.redditstatic.com/icon.png",
    member_count: 12000,
    activity_level: "Medium",
    rules: "No spam • Relevant to GSoC • Be helpful • Follow Reddit rules",
  },
  {
    title: "Apache Software Foundation",
    description:
      "Community for Apache open source projects, frequent GSoC participant.",
    fullDescription:
      "The ASF supports numerous open source projects, offering opportunities for contributions, mentoring, and GSoC projects in various tech areas.",
    tech_stack: "Open Source",
    platform: "Community",
    location_mode: "Global/Online",
    tags: ["Apache", "Open Source", "GSoC", "Projects"],
    community_page: "https://www.apache.org/",
    joining_link: "https://www.apache.org/foundation/getinvolved.html",
    logo_url: "https://www.apache.org/foundation/press/kit/feather_small.png",
    member_count: 1000000,
    activity_level: "High",
    rules:
      "Follow ASF Code of Conduct • Inclusive • No harassment • Contribute ethically",
  },
  {
    title: "Wikimedia Foundation",
    description:
      "Open source community for Wikipedia and related projects, GSoC org.",
    fullDescription:
      "Contribute to Wikimedia projects like Wikipedia, with GSoC opportunities in web dev, data, and more for global knowledge sharing.",
    tech_stack: "Open Source",
    platform: "Community",
    location_mode: "Global/Online",
    tags: ["Wikimedia", "Open Source", "GSoC", "Knowledge"],
    community_page: "https://www.wikimedia.org/",
    joining_link:
      "https://www.mediawiki.org/wiki/How_to_become_a_MediaWiki_hacker",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/8/81/Wikimedia-logo.svg",
    member_count: 500000,
    activity_level: "High",
    rules: "Be bold • Neutral point of view • No original research • Civility",
  },
  {
    title: "Vue Land",
    description: "Official Discord for Vue.js community.",
    fullDescription:
      "Active Discord server for Vue.js developers to discuss frameworks, share code, and get help on projects.",
    tech_stack: "Vue",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Vue.js", "Frontend", "JavaScript", "Beginners"],
    community_page: "https://vue-land.js.org/",
    joining_link: "https://discord.gg/vue",
    logo_url: "https://vuejs.org/images/logo.svg",
    member_count: 25000,
    activity_level: "High",
    rules:
      "Be respectful • Use appropriate channels • No self-promotion • Help others",
  },
  {
    title: "Angular Community Discord",
    description: "Official Discord server for Angular developers.",
    fullDescription:
      "Discord with channels for Angular discussions, libraries, meetups, and international support for all levels.",
    tech_stack: "Angular",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Angular", "Frontend", "TypeScript", "Beginners"],
    community_page: "https://angular.dev/community",
    joining_link: "https://discord.com/invite/angular",
    logo_url: "https://angular.dev/assets/images/logos/angular/angular.svg",
    member_count: 45000,
    activity_level: "High",
    rules:
      "Follow community guidelines • No harassment • Stay on topic • Inclusive",
  },
  {
    title: "Unofficial Django Discord",
    description: "Vibrant Discord community for Django developers.",
    fullDescription:
      "Server with active members helping with Django queries, projects, and best practices for web development.",
    tech_stack: "Django",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Django", "Python", "Web Dev", "Beginners"],
    community_page: "https://discord.gg/jV6DBNXUdR",
    joining_link: "https://discord.gg/jV6DBNXUdR",
    logo_url:
      "https://www.djangoproject.com/s/img/logo-django.42234b6d7665.svg",
    member_count: 12000,
    activity_level: "High",
    rules:
      "Be helpful • No toxicity • Use channels correctly • English preferred",
  },
  {
    title: "Pallets Projects Discord",
    description: "Official Discord for Flask and Pallets projects.",
    fullDescription:
      "Community discussing Flask, Jinja, and other tools, with support for contributions and questions.",
    tech_stack: "Flask",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Flask", "Python", "Web Framework", "Beginners"],
    community_page: "https://discord.gg/pallets",
    joining_link: "https://discord.gg/pallets",
    logo_url: "https://palletsprojects.com/static/pallets-logo.png",
    member_count: 18000,
    activity_level: "Medium",
    rules:
      "Respectful interactions • No spam • Focus on Pallets projects • Report issues",
  },
  {
    title: "Black Hills Information Security",
    description: "Discord for cybersecurity professionals and enthusiasts.",
    fullDescription:
      "Community offering discussions on infosec topics, training resources, and networking opportunities.",
    tech_stack: "Cybersecurity",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Infosec", "Cybersecurity", "Training", "Networking"],
    community_page: "https://www.blackhillsinfosec.com/",
    joining_link: "https://discord.com/invite/BHIS",
    logo_url:
      "https://www.blackhillsinfosec.com/wp-content/uploads/2020/01/BHIS-Logo-2020.png",
    member_count: 25000,
    activity_level: "High",
    rules:
      "Professional conduct • No illegal activities • Share knowledge responsibly",
  },
  {
    title: "TryHackMe Community",
    description:
      "Discord server for cybersecurity learning platform TryHackMe.",
    fullDescription:
      "Active community for hacking challenges, CTFs, and cybersecurity education for all levels.",
    tech_stack: "Cybersecurity",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Hacking", "CTF", "Education", "Beginners"],
    community_page: "https://tryhackme.com/",
    joining_link: "https://discord.gg/tryhackme",
    logo_url: "https://tryhackme.com/img/thm-logo-white.svg",
    member_count: 50000,
    activity_level: "High",
    rules:
      "No spoilers • Respectful • Follow platform rules • Legal hacking only",
  },
  {
    title: "Developer DAO",
    description: "Discord community for web3 and blockchain developers.",
    fullDescription:
      "DAO-focused server helping new web3 devs with resources, projects, and collaborations.",
    tech_stack: "Blockchain/Web3",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Web3", "Blockchain", "DAO", "Beginners"],
    community_page: "https://www.developerdao.com/",
    joining_link: "https://discord.gg/developerdao",
    logo_url:
      "https://www.developerdao.com/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75",
    member_count: 10000,
    activity_level: "Medium",
    rules: "Collaborative spirit • No scams • Inclusive • Contribute to DAO",
  },
  {
    title: "Crypto Devs Discord",
    description: "Community for cryptocurrency and blockchain developers.",
    fullDescription:
      "Discord for discussing blockchain tech, smart contracts, and crypto projects.",
    tech_stack: "Blockchain/Web3",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Crypto", "Blockchain", "Smart Contracts"],
    community_page: "https://discord.gg/cryptodevs",
    joining_link: "https://discord.gg/cryptodevs",
    logo_url: "https://example.com/crypto-logo.png",
    member_count: 5300,
    activity_level: "High",
    rules: "No financial advice • Respectful • On-topic discussions",
  },
  {
    title: "IGDA Discord",
    description: "International Game Developers Association community.",
    fullDescription:
      "Discord for game developers worldwide, with events, mentorship, and industry discussions.",
    tech_stack: "Game Dev",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Game Dev", "Professional", "Mentorship", "Events"],
    community_page: "https://igda.org/",
    joining_link: "https://discord.gg/igda",
    logo_url: "https://igda.org/wp-content/uploads/2020/06/IGDA-Logo-2020.png",
    member_count: 15000,
    activity_level: "High",
    rules:
      "Inclusive environment • Professional • No discrimination • Follow IGDA CoC",
  },
  {
    title: "Funsmith Club",
    description: "Game design-focused Discord for developers.",
    fullDescription:
      "Server where game devs improve design skills, share ideas, and collaborate on projects.",
    tech_stack: "Game Dev",
    platform: "Discord",
    location_mode: "Global/Online",
    tags: ["Game Design", "Indie", "Collaboration", "Beginners"],
    community_page: "https://funsmith.club/",
    joining_link: "https://discord.gg/funsmith",
    logo_url: "https://funsmith.club/logo.png",
    member_count: 8000,
    activity_level: "Medium",
    rules: "Supportive • No negativity • Focus on design • Help each other",
  },
  {
    title: "r/mobiledev",
    description: "Subreddit for mobile app development.",
    fullDescription:
      "Community discussing Android, iOS, and cross-platform mobile development frameworks.",
    tech_stack: "Mobile (Android)",
    platform: "Reddit",
    location_mode: "Global/Online",
    tags: ["Mobile Dev", "Android", "iOS", "Cross-Platform"],
    community_page: "https://www.reddit.com/r/mobiledev/",
    joining_link: "https://www.reddit.com/r/mobiledev/",
    logo_url: "https://www.redditstatic.com/icon.png",
    member_count: 5000,
    activity_level: "Medium",
    rules: "Relevant posts • No spam • Be helpful • Follow Reddit policy",
  },
  {
    title: "CocoaHeads",
    description: "Slack community for iOS and macOS developers.",
    fullDescription:
      "Global and local chapters for Cocoa developers, sharing tips on Swift and Objective-C.",
    tech_stack: "Mobile (iOS)",
    platform: "Slack",
    location_mode: "Global/Online",
    tags: ["iOS", "macOS", "Swift", "Objective-C"],
    community_page: "https://cocoaheads.org/",
    joining_link: "https://cocoaheads.slack.com/",
    logo_url: "https://cocoaheads.org/logo.png",
    member_count: 20000,
    activity_level: "High",
    rules: "Professional • Use channels • No off-topic • Inclusive",
  },
  {
    title: "GDG Bangalore",
    description: "Google Developer Group in Bangalore, India.",
    fullDescription:
      "Hybrid events on Google technologies, Android, cloud, and more for Indian developers.",
    tech_stack: "General",
    platform: "Community",
    location_mode: "Hybrid",
    tags: ["GDG", "India", "Bangalore", "Events"],
    community_page: "https://gdg.community.dev/gdg-bangalore/",
    joining_link: "https://gdg.community.dev/gdg-bangalore/",
    logo_url: "https://developers.google.com/community/gdg/images/gdg-logo.png",
    member_count: 15000,
    activity_level: "High",
    rules:
      "Follow Google CoC • Participate actively • Inclusive • No sales pitches",
  },
  {
    title: "PyCon India",
    description: "Annual Python conference and community in India.",
    fullDescription:
      "Offline and hybrid events for Python developers in India, with talks, workshops, and networking.",
    tech_stack: "Python",
    platform: "Community",
    location_mode: "Offline",
    tags: ["Python", "India", "Conference", "Networking"],
    community_page: "https://in.pycon.org/",
    joining_link: "https://in.pycon.org/",
    logo_url: "https://in.pycon.org/images/pycon-logo.png",
    member_count: 10000,
    activity_level: "Medium",
    rules:
      "Follow PyCon CoC • Respectful • Engage positively • Volunteer encouraged",
  },
  {
    title: "HackwithIndia",
    description: "Hackathon community in India.",
    fullDescription:
      "Organizes hybrid hackathons across India for developers to build and innovate.",
    tech_stack: "General",
    platform: "Community",
    location_mode: "Hybrid",
    tags: ["Hackathons", "India", "Innovation", "Students"],
    community_page: "https://hackwithindia.com/",
    joining_link: "https://hackwithindia.com/",
    logo_url: "https://hackwithindia.com/logo.png",
    member_count: 25000,
    activity_level: "High",
    rules:
      "Fair play • No plagiarism • Team collaboration • Follow event rules",
  },
  {
    title: "Geek Room",
    description: "Tech community organizing hackathons in India.",
    fullDescription:
      "Fast-growing community with national-level hackathons and hire-a-thons for developers.",
    tech_stack: "General",
    platform: "Community",
    location_mode: "India/Online",
    tags: ["Geek", "Hackathons", "India", "Hiring"],
    community_page: "https://geekroom.in/",
    joining_link: "https://geekroom.in/",
    logo_url: "https://geekroom.in/logo.png",
    member_count: 100000,
    activity_level: "High",
    rules: "Inclusive • Contribute • No spam • Positive interactions",
  },
];

const mappedCommunities = communities.map((community) => ({
  ...community,
  tech_stack: getTechStack(community),
  weeklyPosts: community.weeklyPosts || 0,
  founded: community.founded || "",
}));

async function seedDatabase() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/devlinker"
    );
    console.log("Connected to MongoDB");
    await Community.deleteMany({});
    console.log("Cleared existing communities");
    await Community.insertMany(mappedCommunities);
    console.log(`Seeded ${mappedCommunities.length} communities`);
    console.log("\nTech Stack Distribution:");
    const distribution = {};
    mappedCommunities.forEach((c) => {
      distribution[c.tech_stack] = (distribution[c.tech_stack] || 0) + 1;
    });
    console.log(JSON.stringify(distribution, null, 2));
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
