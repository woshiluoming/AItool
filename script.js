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

const finderProfiles = {
  writing: {
    title: "推荐组合：ChatGPT + Claude + Notion AI",
    summary: "适合文章提纲、改稿、总结、翻译和内容结构整理。先用对话助手生成多个版本，再把最终版本沉淀到笔记或知识库。",
    steps: ["准备目标读者和语气要求", "让 AI 先出提纲而不是直接写全文", "发布前检查事实、引用和品牌语气"],
  },
  research: {
    title: "推荐组合：Perplexity + Gemini + ChatGPT",
    summary: "适合选题研究、资料检索、竞品分析和事实核验。搜索工具负责找来源，对话助手负责整理结构和输出报告。",
    steps: ["先收集多个来源", "打开原文确认日期和上下文", "把可靠资料交给对话助手整理"],
  },
  coding: {
    title: "推荐组合：Cursor + GitHub Copilot + ChatGPT",
    summary: "适合读代码、解释报错、补测试和局部重构。AI 可以提高速度，但最终仍要看 diff、跑测试、做人工审查。",
    steps: ["先让 AI 理解目录和相关文件", "要求它列出修改风险", "小步提交并运行验证"],
  },
  visual: {
    title: "推荐组合：Midjourney + DALL-E + Runway",
    summary: "适合封面草图、视觉方向、短视频镜头和创意素材。正式商用前要检查版权、人物肖像、品牌元素和画面细节。",
    steps: ["先生成多种方向", "选择最接近目标的版本二次编辑", "商用前检查授权和细节错误"],
  },
  office: {
    title: "推荐组合：ChatGPT + Notion AI + 会议转写工具",
    summary: "适合会议纪要、周报、邮件、SOP、FAQ 和知识库维护。重点是减少重复整理，而不是让 AI 处理敏感原始资料。",
    steps: ["把资料脱敏后再处理", "固定纪要和周报格式", "把高频问题沉淀进知识库"],
  },
};

const finderAdvice = {
  easy: "优先选择界面清晰、模板丰富、中文体验稳定的工具，不要一开始就配置太多产品。",
  quality: "建议用同一份任务测试多个工具，比较可修改性、稳定性和输出细节，而不是只看第一次结果。",
  source: "涉及事实和时效信息时，优先使用带来源的搜索工具，并打开原文确认上下文。",
  workflow: "选择能导出、能协作、能接入你现有软件的工具，长期价值通常更高。",
};

const frequencyAdvice = {
  daily: "如果每天都用，可以考虑付费版，但要记录它是否真的节省了时间。",
  weekly: "每周使用可以先保留免费或轻量方案，等任务稳定后再升级。",
  trial: "先用一周测试真实任务，不要因为演示效果好就立刻订阅。",
};

const finderTask = document.querySelector("#finderTask");
const finderPriority = document.querySelector("#finderPriority");
const finderFrequency = document.querySelector("#finderFrequency");
const finderResult = document.querySelector("#finderResult");

function renderFinderResult() {
  if (!finderTask || !finderPriority || !finderFrequency || !finderResult) return;
  const profile = finderProfiles[finderTask.value];
  finderResult.innerHTML = `
    <h3>${profile.title}</h3>
    <p>${profile.summary}</p>
    <ul>
      ${profile.steps.map((step) => `<li>${step}</li>`).join("")}
    </ul>
    <div class="finder-note">
      <strong>选择建议：</strong>${finderAdvice[finderPriority.value]}
    </div>
    <div class="finder-note">
      <strong>频率建议：</strong>${frequencyAdvice[finderFrequency.value]}
    </div>
  `;
}

[finderTask, finderPriority, finderFrequency].forEach((control) => {
  if (control) control.addEventListener("change", renderFinderResult);
});

renderFinderResult();

document.querySelectorAll(".copy-prompt").forEach((button) => {
  button.addEventListener("click", async () => {
    const prompt = button.closest("article").querySelector("pre").innerText;
    try {
      await navigator.clipboard.writeText(prompt);
      button.textContent = "已复制";
      setTimeout(() => {
        button.textContent = "复制模板";
      }, 1400);
    } catch {
      button.textContent = "请手动复制";
    }
  });
});

const agentProfiles = {
  research: {
    name: "资料研究助手",
    goal: "围绕一个主题收集资料、提取观点、列出来源和待核验问题。",
    output: "研究摘要、来源清单、观点对比表、下一步问题",
    risk: "容易把过时资料和不同语境的信息混在一起，必须打开来源核验。",
  },
  content: {
    name: "内容运营助手",
    goal: "从选题、资料、脚本、标题、封面方向到发布复盘提供流程辅助。",
    output: "选题池、脚本草稿、标题方案、复盘要点",
    risk: "不要直接发布未经核验的观点，品牌语气和事实仍需人工确认。",
  },
  support: {
    name: "客服知识库助手",
    goal: "根据知识库回答常见问题，并标记无法确认或需要人工介入的问题。",
    output: "标准回复、问题分类、知识库缺口、升级处理建议",
    risk: "不能编造政策、价格和承诺，知识库没有的信息应明确说明无法确认。",
  },
  coding: {
    name: "代码维护助手",
    goal: "阅读报错和相关文件，提出修复思路、测试清单和低风险改动建议。",
    output: "问题定位、修改方案、测试建议、风险说明",
    risk: "涉及权限、支付、删除和生产数据的改动必须人工审查并运行测试。",
  },
  sales: {
    name: "销售线索整理助手",
    goal: "整理客户资料、归类需求、生成跟进摘要和邮件草稿。",
    output: "线索摘要、客户标签、跟进建议、邮件草稿",
    risk: "客户隐私和商业信息需要脱敏，外发内容必须人工确认。",
  },
};

const autonomyProfiles = {
  assist: "建议模式：智能体只分析和给建议，不直接执行动作，适合刚开始试用。",
  draft: "草稿模式：智能体可以生成文档、邮件或方案草稿，但提交前需要人工确认。",
  semi: "半自动模式：低风险步骤可以自动执行，高风险动作保留审批。",
};

const agentToolLabels = {
  search: "搜索资料",
  docs: "阅读文档",
  write: "生成内容",
  code: "修改代码",
  email: "起草邮件",
};

const agentGoal = document.querySelector("#agentGoal");
const agentAutonomy = document.querySelector("#agentAutonomy");
const agentResult = document.querySelector("#agentResult");
const agentSceneDetail = document.querySelector("#agentSceneDetail");
const agentToolInputs = [...document.querySelectorAll("input[name='agentTool']")];
const sceneBtns = [...document.querySelectorAll(".scene-btn")];

function renderAgentSceneDetail() {
  if (!agentSceneDetail) return;
  const activeScene = sceneBtns.find((btn) => btn.classList.contains("active"));
  const sceneKey = activeScene ? activeScene.dataset.scene : "research";
  const profile = agentProfiles[sceneKey];
  const enabledTools = agentToolInputs.filter((input) => input.checked).map((input) => agentToolLabels[input.value]);
  const toolText = enabledTools.length ? enabledTools.join("、") : "暂未选择能力";
  agentSceneDetail.innerHTML = `
    <h3>${profile.name}</h3>
    <p>${profile.goal}</p>
    <div class="agent-plan">
      <strong>建议流程</strong>
      <ol>
        <li>接收任务目标和必要背景。</li>
        <li>使用已授权能力：${toolText}。</li>
        <li>输出：${profile.output}。</li>
        <li>交给人工确认关键结论和高风险动作。</li>
      </ol>
    </div>
    <div class="agent-warning">
      <strong>自动化策略：</strong>${autonomyProfiles[agentAutonomy.value]}
    </div>
    <div class="agent-warning">
      <strong>风险提醒：</strong>${profile.risk}
    </div>
  `;
}

sceneBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sceneBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderAgentSceneDetail();
  });
});

[agentAutonomy, ...agentToolInputs].forEach((control) => {
  if (control) control.addEventListener("change", renderAgentSceneDetail);
});

renderAgentSceneDetail();

const agentChecks = [...document.querySelectorAll(".agent-check")];
const agentScore = document.querySelector("#agentScore");
const agentScoreText = document.querySelector("#agentScoreText");

function renderAgentScore() {
  if (!agentScore || !agentScoreText) return;
  const checked = agentChecks.filter((input) => input.checked).length;
  agentScore.textContent = `${checked}/8`;
  if (checked <= 2) {
    agentScoreText.textContent = "先从只读建议型智能体开始。";
  } else if (checked <= 5) {
    agentScoreText.textContent = "可以做内部试运行，但要保留人工确认。";
  } else {
    agentScoreText.textContent = "方案比较成熟，可以设计小范围试点。";
  }
}

agentChecks.forEach((input) => input.addEventListener("change", renderAgentScore));
renderAgentScore();

const agentTabs = [...document.querySelectorAll(".agent-tab")];
const agentTabPanels = [...document.querySelectorAll(".agent-tab-panel")];

agentTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetTab = tab.dataset.tab;
    agentTabs.forEach((t) => t.classList.remove("active"));
    agentTabPanels.forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    const targetPanel = document.querySelector(`#tab-${targetTab}`);
    if (targetPanel) targetPanel.classList.add("active");
  });
});

const workflowSteps = {
  research: {
    light: [
      { title: "明确研究主题", desc: "确定核心问题和研究范围" },
      { title: "搜索相关资料", desc: "使用 AI 搜索收集多个来源" },
      { title: "整理关键观点", desc: "提取主要观点并标注来源" },
      { title: "生成研究摘要", desc: "汇总资料形成结构化摘要" },
    ],
    medium: [
      { title: "明确研究主题", desc: "确定核心问题和研究范围" },
      { title: "搜索相关资料", desc: "使用 AI 搜索收集多个来源" },
      { title: "来源质量评估", desc: "检查信息时效性和可信度" },
      { title: "整理关键观点", desc: "提取主要观点并标注来源" },
      { title: "观点对比分析", desc: "对比不同来源的立场和证据" },
      { title: "生成研究摘要", desc: "汇总资料形成结构化摘要" },
      { title: "列出待核验问题", desc: "标记需要进一步确认的内容" },
    ],
    deep: [
      { title: "明确研究主题", desc: "确定核心问题和研究范围" },
      { title: "搜索相关资料", desc: "使用 AI 搜索收集多个来源" },
      { title: "来源质量评估", desc: "检查信息时效性和可信度" },
      { title: "阅读原始文档", desc: "打开关键来源阅读原文" },
      { title: "整理关键观点", desc: "提取主要观点并标注来源" },
      { title: "观点对比分析", desc: "对比不同来源的立场和证据" },
      { title: "数据交叉验证", desc: "用多个来源验证关键事实" },
      { title: "生成研究摘要", desc: "汇总资料形成结构化摘要" },
      { title: "列出待核验问题", desc: "标记需要进一步确认的内容" },
      { title: "制定后续计划", desc: "确定下一步研究方向" },
    ],
  },
  content: {
    light: [
      { title: "确定内容主题", desc: "明确目标读者和内容方向" },
      { title: "收集参考资料", desc: "搜索相关素材和案例" },
      { title: "生成文章提纲", desc: "规划文章结构和要点" },
      { title: "撰写初稿内容", desc: "按提纲生成完整草稿" },
    ],
    medium: [
      { title: "确定内容主题", desc: "明确目标读者和内容方向" },
      { title: "收集参考资料", desc: "搜索相关素材和案例" },
      { title: "生成标题方案", desc: "提供多个标题选项" },
      { title: "生成文章提纲", desc: "规划文章结构和要点" },
      { title: "撰写初稿内容", desc: "按提纲生成完整草稿" },
      { title: "优化内容结构", desc: "调整段落顺序和逻辑" },
      { title: "事实核验检查", desc: "确认关键信息的准确性" },
    ],
    deep: [
      { title: "确定内容主题", desc: "明确目标读者和内容方向" },
      { title: "收集参考资料", desc: "搜索相关素材和案例" },
      { title: "分析受众需求", desc: "了解目标读者痛点和兴趣" },
      { title: "生成标题方案", desc: "提供多个标题选项" },
      { title: "生成文章提纲", desc: "规划文章结构和要点" },
      { title: "撰写初稿内容", desc: "按提纲生成完整草稿" },
      { title: "优化内容结构", desc: "调整段落顺序和逻辑" },
      { title: "润色语言表达", desc: "提升文字质量和可读性" },
      { title: "事实核验检查", desc: "确认关键信息的准确性" },
      { title: "生成封面方向", desc: "提供视觉设计建议" },
      { title: "准备发布素材", desc: "生成摘要、标签和配图文案" },
    ],
  },
  support: {
    light: [
      { title: "接收用户问题", desc: "获取用户咨询内容" },
      { title: "检索知识库", desc: "查找相关知识条目" },
      { title: "生成回复方案", desc: "根据知识库生成标准回复" },
      { title: "人工确认发送", desc: "审核后发送给用户" },
    ],
    medium: [
      { title: "接收用户问题", desc: "获取用户咨询内容" },
      { title: "意图识别分类", desc: "判断问题类型和优先级" },
      { title: "检索知识库", desc: "查找相关知识条目" },
      { title: "生成回复方案", desc: "根据知识库生成标准回复" },
      { title: "检测不确定性", desc: "识别无法确认的内容" },
      { title: "人工确认发送", desc: "审核后发送给用户" },
      { title: "记录问题反馈", desc: "收集未解决问题用于知识库更新" },
    ],
    deep: [
      { title: "接收用户问题", desc: "获取用户咨询内容" },
      { title: "意图识别分类", desc: "判断问题类型和优先级" },
      { title: "检索知识库", desc: "查找相关知识条目" },
      { title: "生成回复方案", desc: "根据知识库生成标准回复" },
      { title: "检测不确定性", desc: "识别无法确认的内容" },
      { title: "风险评估", desc: "判断是否涉及敏感信息" },
      { title: "升级处理判断", desc: "确定是否需要转人工处理" },
      { title: "人工确认发送", desc: "审核后发送给用户" },
      { title: "记录问题反馈", desc: "收集未解决问题用于知识库更新" },
      { title: "知识库更新建议", desc: "提出知识条目优化建议" },
    ],
  },
  coding: {
    light: [
      { title: "理解问题需求", desc: "明确代码修改目标" },
      { title: "分析相关代码", desc: "阅读受影响的文件" },
      { title: "提出修改方案", desc: "生成代码改动建议" },
      { title: "人工审查验证", desc: "检查代码并运行测试" },
    ],
    medium: [
      { title: "理解问题需求", desc: "明确代码修改目标" },
      { title: "分析相关代码", desc: "阅读受影响的文件" },
      { title: "定位问题根源", desc: "找到问题所在的具体位置" },
      { title: "提出修改方案", desc: "生成代码改动建议" },
      { title: "评估修改风险", desc: "分析可能的副作用" },
      { title: "编写测试用例", desc: "生成相关测试代码" },
      { title: "人工审查验证", desc: "检查代码并运行测试" },
    ],
    deep: [
      { title: "理解问题需求", desc: "明确代码修改目标" },
      { title: "分析相关代码", desc: "阅读受影响的文件" },
      { title: "理解系统架构", desc: "了解模块间的依赖关系" },
      { title: "定位问题根源", desc: "找到问题所在的具体位置" },
      { title: "提出修改方案", desc: "生成代码改动建议" },
      { title: "评估修改风险", desc: "分析可能的副作用" },
      { title: "编写测试用例", desc: "生成相关测试代码" },
      { title: "执行代码修改", desc: "应用代码变更" },
      { title: "运行测试验证", desc: "执行测试确保没有回归" },
      { title: "人工审查验证", desc: "检查代码 diff 并确认" },
      { title: "提交代码变更", desc: "创建 PR 并记录变更说明" },
    ],
  },
  sales: {
    light: [
      { title: "收集客户资料", desc: "获取客户基本信息" },
      { title: "分析客户需求", desc: "理解客户痛点和目标" },
      { title: "生成跟进摘要", desc: "整理关键信息用于后续跟进" },
      { title: "起草跟进邮件", desc: "生成邮件草稿" },
    ],
    medium: [
      { title: "收集客户资料", desc: "获取客户基本信息" },
      { title: "分析客户需求", desc: "理解客户痛点和目标" },
      { title: "客户标签分类", desc: "按行业、规模、需求类型分类" },
      { title: "生成跟进摘要", desc: "整理关键信息用于后续跟进" },
      { title: "制定跟进策略", desc: "建议下一步行动方案" },
      { title: "起草跟进邮件", desc: "生成邮件草稿" },
      { title: "记录跟进结果", desc: "更新客户状态和反馈" },
    ],
    deep: [
      { title: "收集客户资料", desc: "获取客户基本信息" },
      { title: "分析客户需求", desc: "理解客户痛点和目标" },
      { title: "客户标签分类", desc: "按行业、规模、需求类型分类" },
      { title: "评估客户价值", desc: "判断潜在合作价值" },
      { title: "生成跟进摘要", desc: "整理关键信息用于后续跟进" },
      { title: "制定跟进策略", desc: "建议下一步行动方案" },
      { title: "起草跟进邮件", desc: "生成邮件草稿" },
      { title: "准备演示材料", desc: "提供针对性材料建议" },
      { title: "记录跟进结果", desc: "更新客户状态和反馈" },
      { title: "分析转化瓶颈", desc: "识别阻碍成交的问题" },
      { title: "优化跟进策略", desc: "根据反馈调整后续方案" },
    ],
  },
};

const workflowTask = document.querySelector("#workflowTask");
const workflowDepth = document.querySelector("#workflowDepth");
const generateWorkflowBtn = document.querySelector("#generateWorkflow");
const workflowOutput = document.querySelector("#workflowOutput");

function renderWorkflow() {
  if (!workflowTask || !workflowDepth || !workflowOutput) return;
  const task = workflowTask.value;
  const depth = workflowDepth.value;
  const steps = workflowSteps[task][depth];
  const taskNames = {
    research: "资料研究",
    content: "内容创作",
    support: "客户支持",
    coding: "代码开发",
    sales: "销售跟进",
  };
  workflowOutput.innerHTML = `
    <h3>${taskNames[task]}工作流（${depth === "light" ? "轻量" : depth === "medium" ? "标准" : "深度"}）</h3>
    <div class="workflow-steps">
      ${steps.map((step, index) => `
        <div class="workflow-step">
          <span class="workflow-step-number">${index + 1}</span>
          <div class="workflow-step-content">
            <strong>${step.title}</strong>
            <p>${step.desc}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

if (generateWorkflowBtn) {
  generateWorkflowBtn.addEventListener("click", renderWorkflow);
}

renderWorkflow();