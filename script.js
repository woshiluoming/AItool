const tools = [
  {
    name: "ChatGPT",
    category: "对话助手",
    description: "适合写作、问答、代码辅助、资料整理和灵感发散。",
    tags: ["通用", "写作", "编程"],
    url: "https://chat.openai.com/",
  },
  {
    name: "Claude",
    category: "对话助手",
    description: "长文本理解、文档分析和严谨写作体验出色。",
    tags: ["长文档", "研究", "写作"],
    url: "https://claude.ai/",
  },
  {
    name: "Gemini",
    category: "对话助手",
    description: "结合搜索、办公和多模态能力的通用 AI 助手。",
    tags: ["多模态", "搜索", "办公"],
    url: "https://gemini.google.com/",
  },
  {
    name: "Midjourney",
    category: "图像生成",
    description: "高质量艺术图像、视觉概念和风格化海报生成。",
    tags: ["绘图", "海报", "概念图"],
    url: "https://www.midjourney.com/",
  },
  {
    name: "DALL-E",
    category: "图像生成",
    description: "通过自然语言生成和编辑图片，适合创意探索。",
    tags: ["图片", "编辑", "创意"],
    url: "https://openai.com/dall-e",
  },
  {
    name: "Runway",
    category: "视频创作",
    description: "AI 视频生成、抠像、镜头编辑和创意短片制作。",
    tags: ["视频", "剪辑", "生成"],
    url: "https://runwayml.com/",
  },
  {
    name: "Pika",
    category: "视频创作",
    description: "面向短视频和动效的 AI 视频生成工具。",
    tags: ["短视频", "动效", "生成"],
    url: "https://pika.art/",
  },
  {
    name: "Cursor",
    category: "编程开发",
    description: "内置 AI 能力的代码编辑器，适合项目级编程辅助。",
    tags: ["IDE", "代码", "效率"],
    url: "https://cursor.com/",
  },
  {
    name: "GitHub Copilot",
    category: "编程开发",
    description: "代码补全、解释、重构和测试生成助手。",
    tags: ["补全", "重构", "测试"],
    url: "https://github.com/features/copilot",
  },
  {
    name: "Notion AI",
    category: "办公效率",
    description: "在笔记、项目管理和知识库中直接生成与整理内容。",
    tags: ["笔记", "知识库", "协作"],
    url: "https://www.notion.so/product/ai",
  },
  {
    name: "Perplexity",
    category: "搜索研究",
    description: "带来源引用的 AI 搜索，适合快速调研和资料核验。",
    tags: ["搜索", "引用", "研究"],
    url: "https://www.perplexity.ai/",
  },
  {
    name: "ElevenLabs",
    category: "音频语音",
    description: "高拟真语音合成、配音和声音克隆工具。",
    tags: ["配音", "TTS", "音频"],
    url: "https://elevenlabs.io/",
  },
];

const categoryList = document.querySelector("#categoryList");
const toolGrid = document.querySelector("#toolGrid");
const searchInput = document.querySelector("#searchInput");
const activeTitle = document.querySelector("#activeTitle");
const resultHint = document.querySelector("#resultHint");
const emptyState = document.querySelector("#emptyState");
const toolCount = document.querySelector("#toolCount");
const categoryCount = document.querySelector("#categoryCount");

let activeCategory = "全部";

const categories = ["全部", ...new Set(tools.map((tool) => tool.category))];

toolCount.textContent = tools.length;
categoryCount.textContent = categories.length - 1;

function renderCategories() {
  categoryList.innerHTML = categories
    .map((category) => {
      const count = category === "全部" ? tools.length : tools.filter((tool) => tool.category === category).length;
      const activeClass = category === activeCategory ? " active" : "";
      return `
        <button class="category-btn${activeClass}" type="button" data-category="${category}">
          <span>${category}</span>
          <small>${count}</small>
        </button>
      `;
    })
    .join("");
}

function getFilteredTools() {
  const keyword = searchInput.value.trim().toLowerCase();
  return tools.filter((tool) => {
    const inCategory = activeCategory === "全部" || tool.category === activeCategory;
    const haystack = [tool.name, tool.category, tool.description, ...tool.tags].join(" ").toLowerCase();
    return inCategory && (!keyword || haystack.includes(keyword));
  });
}

function renderTools() {
  const filteredTools = getFilteredTools();
  activeTitle.textContent = activeCategory === "全部" ? "全部工具" : activeCategory;
  resultHint.textContent = `当前显示 ${filteredTools.length} 个工具`;
  emptyState.hidden = filteredTools.length > 0;
  toolGrid.innerHTML = filteredTools
    .map((tool) => {
      const initials = tool.name.slice(0, 2).toUpperCase();
      return `
        <article class="tool-card">
          <div class="tool-top">
            <span class="tool-icon">${initials}</span>
            <div>
              <h3>${tool.name}</h3>
            </div>
          </div>
          <p>${tool.description}</p>
          <div class="tags">
            ${tool.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
          <a class="card-link" href="${tool.url}" target="_blank" rel="noreferrer">访问工具</a>
        </article>
      `;
    })
    .join("");
}

categoryList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderTools();
});

searchInput.addEventListener("input", renderTools);

renderCategories();
renderTools();
