const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-open");
  });
}

document.querySelectorAll(".desktop-nav a").forEach((link) => {
  const page = document.body.dataset.page;
  const href = link.getAttribute("href");

  if (
    (page === "home" && href === "index.html") ||
    (page === "solution" && href === "solution.html") ||
    (page === "platform" && href === "platform.html") ||
    (page === "team" && href === "team.html")
  ) {
    link.classList.add("is-current");
  }
});

const tabButtons = document.querySelectorAll(".tab-button");
const panels = {
  assessment: document.getElementById("assessmentTab"),
  result: document.getElementById("resultTab"),
  apply: document.getElementById("applyTab"),
  sachet: document.getElementById("sachetTab"), // 新增这一行
};

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;
    tabButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    Object.values(panels).forEach((panel) => {
      if (panel) panel.classList.remove("active");
    });

    if (panels[target]) panels[target].classList.add("active");
  });
});

const tongueFile = document.getElementById("tongueFile");
const tonguePreview = document.getElementById("tonguePreview");
const assessmentForm = document.getElementById("assessmentForm");
const syncApplyBtn = document.getElementById("syncApplyBtn");
const applyForm = document.getElementById("applyForm");
const applyMessage = document.getElementById("applyMessage");

const voucherButton = document.getElementById("voucherButton");
const voucherStatus = document.getElementById("voucherStatus");
const voucherCode = document.getElementById("voucherCode");

let latestName = "";
let latestSchool = "";
let latestPlan = "";
let latestPremium = "";

function constitutionInfo(type) {
  const map = {
    balanced: {
      name: "平和质倾向",
      desc: "整体状态相对稳定，适合维持规律作息与基础健康管理。"
    },
    qi_deficiency: {
      name: "气虚质倾向",
      desc: "容易疲劳、乏力，建议重点关注休息、脾胃调理与循序渐进运动。"
    },
    yang_deficiency: {
      name: "阳虚质倾向",
      desc: "可能伴随畏寒、状态偏弱，适合关注保暖、作息与温和调养。"
    },
    yin_deficiency: {
      name: "阴虚质倾向",
      desc: "可能伴随睡眠不稳、上火或状态波动，建议减少熬夜与刺激性饮食。"
    },
    phlegm_damp: {
      name: "痰湿质倾向",
      desc: "容易困倦、湿重、消化负担感较强，建议饮食清淡并增加活动量。"
    },
    damp_heat: {
      name: "湿热质倾向",
      desc: "容易出现口苦、长痘、油腻感偏重，建议减少辛辣油炸与甜饮。"
    },
    blood_stasis: {
      name: "血瘀质倾向",
      desc: "建议关注循环状态、运动习惯与保暖，避免久坐久站。"
    },
    qi_stagnation: {
      name: "气郁质倾向",
      desc: "压力和情绪波动对身体状态影响较明显，建议加入放松训练与作息调整。"
    },
    special: {
      name: "特禀质倾向",
      desc: "体质相对敏感，建议在专业指导下进行个性化健康管理。"
    }
  };

  return map[type] || map.balanced;
}

function getCheckedIssues() {
  return [...document.querySelectorAll('input[name="issue"]:checked')].map(item => item.value);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

if (tongueFile && tonguePreview) {
  tongueFile.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      tonguePreview.src = event.target.result;
      tonguePreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  });
}

if (assessmentForm) {
  assessmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    latestName = document.getElementById("userName").value.trim();
    latestSchool = document.getElementById("userSchool").value.trim();

    const sleepLevel = Number(document.getElementById("sleepLevel").value);
    const stressLevel = Number(document.getElementById("stressLevel").value);
    const dietLevel = Number(document.getElementById("dietLevel").value);
    const exerciseLevel = Number(document.getElementById("exerciseLevel").value);

    const issues = getCheckedIssues();
    const constitution = document.querySelector('input[name="constitution"]:checked')?.value || "balanced";

    let hair = 18 + sleepLevel * 7 + stressLevel * 10 + dietLevel * 4;
    let sleep = 18 + sleepLevel * 18 + stressLevel * 10;
    let stomach = 18 + dietLevel * 18 + stressLevel * 5;

    if (exerciseLevel === 0) {
      hair += 4;
      stomach += 6;
    }
    if (exerciseLevel >= 2) {
      sleep -= 5;
      stomach -= 3;
    }

    if (issues.includes("hair")) hair += 24;
    if (issues.includes("sleep")) sleep += 25;
    if (issues.includes("stomach")) stomach += 25;
    if (issues.includes("throat")) sleep += 4;
    if (issues.includes("acne")) stomach += 8;
    if (issues.includes("pain")) sleep += 6;
    if (issues.includes("fatigue")) {
      hair += 8;
      sleep += 8;
      stomach += 8;
    }

    if (constitution === "qi_deficiency") {
      hair += 8;
      stomach += 8;
    }
    if (constitution === "yang_deficiency") {
      stomach += 6;
      sleep += 4;
    }
    if (constitution === "yin_deficiency") {
      sleep += 12;
      hair += 6;
    }
    if (constitution === "phlegm_damp") {
      stomach += 14;
    }
    if (constitution === "damp_heat") {
      stomach += 12;
      hair += 4;
    }
    if (constitution === "blood_stasis") {
      sleep += 4;
      stomach += 3;
    }
    if (constitution === "qi_stagnation") {
      sleep += 12;
    }
    if (constitution === "special") {
      sleep += 5;
      stomach += 5;
    }

    hair = clamp(hair, 10, 95);
    sleep = clamp(sleep, 10, 95);
    stomach = clamp(stomach, 10, 95);

    const average = Math.round((hair + sleep + stomach) / 3);

    let level = "";
    let basePremium = 0;
    let premiumDescription = "";

    if (average < 35) {
      level = "低风险";
      basePremium = 180;
      premiumDescription = "基础险参考保费位于 180—260 元/年区间内，当前结果更接近低档。";
    } else if (average < 60) {
      level = "中风险";
      basePremium = 220;
      premiumDescription = "基础险参考保费位于 180—260 元/年区间内，当前结果更接近中档。";
    } else {
      level = "较高风险";
      basePremium = 260;
      premiumDescription = "基础险参考保费位于 180—260 元/年区间内，当前结果更接近高档。";
    }

    const needSportsAddon = issues.includes("sports") || exerciseLevel >= 2;
    latestPlan = needSportsAddon
      ? "基础险 + 运动损伤中医调理附加险"
      : "基础险（特定慢性病中医调理津贴）";

    latestPremium = needSportsAddon
      ? `基础险 ¥${basePremium}/年 + 附加险 ¥80—120/年`
      : `基础险 ¥${basePremium}/年`;

    const c = constitutionInfo(constitution);

    document.getElementById("constitutionName").textContent = c.name;
    document.getElementById("constitutionDescription").textContent = c.desc;
    document.getElementById("riskLevel").textContent = level;
    document.getElementById("riskDescription").textContent = "根据所填信息生成阶段性健康评估结果。";
    document.getElementById("premiumResult").textContent = latestPremium;
    document.getElementById("premiumDescription").textContent = premiumDescription;

    document.getElementById("hairBar").style.width = `${hair}%`;
    document.getElementById("sleepBar").style.width = `${sleep}%`;
    document.getElementById("stomachBar").style.width = `${stomach}%`;

    document.getElementById("hairValue").textContent = `${hair}%`;
    document.getElementById("sleepValue").textContent = `${sleep}%`;
    document.getElementById("stomachValue").textContent = `${stomach}%`;

    const adviceList = document.getElementById("adviceList");
    adviceList.innerHTML = "";

    const advice = [
      "建议尽量在 23:30 前入睡，避免长期熬夜造成状态反复。",
      "建议保持更稳定的三餐节奏，减少油炸、生冷、辛辣及高糖饮食频率。"
    ];

    if (sleep >= 60) advice.push("当前睡眠风险偏高，建议固定作息并减少睡前电子设备使用。");
    if (stomach >= 60) advice.push("当前脾胃风险偏高，建议从饮食规律、进食速度和晚间宵夜控制入手。");
    if (hair >= 60) advice.push("当前脱发风险偏高，建议同步关注压力管理、睡眠和营养摄入。");
    if (needSportsAddon) advice.push("如有长期运动恢复需求，可考虑附加险作为专项补充。");
    if (issues.includes("throat")) advice.push("如存在慢性咽部不适，建议同步关注作息、饮水与用嗓频率。");
    if (issues.includes("acne")) advice.push("如存在痤疮困扰，建议减少油炸辛辣和高糖饮料摄入。");

    advice.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      adviceList.appendChild(li);
    });

    const recommendationBox = document.getElementById("recommendationBox");
    recommendationBox.innerHTML = `
      <strong>${latestPlan}</strong>
      <p>基础险责任：50元/天，单次最高7天，年度累计最高60天，年度最高3000元。</p>
      <p>参考保费：${latestPremium}</p>
    `;

    const resultButton = [...tabButtons].find(btn => btn.dataset.tab === "result");
    if (resultButton) resultButton.click();
  });
}

if (syncApplyBtn) {
  syncApplyBtn.addEventListener("click", () => {
    const applyName = document.getElementById("applyName");
    const applySchool = document.getElementById("applySchool");
    const applyPlan = document.getElementById("applyPlan");
    const applyPremium = document.getElementById("applyPremium");

    if (applyName) applyName.value = latestName;
    if (applySchool) applySchool.value = latestSchool;
    if (applyPlan) applyPlan.value = latestPlan || "基础险（特定慢性病中医调理津贴）";
    if (applyPremium) applyPremium.value = latestPremium || "基础险 ¥180/年";

    const applyButton = [...tabButtons].find(btn => btn.dataset.tab === "apply");
    if (applyButton) applyButton.click();
  });
}

if (applyForm) {
  applyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("applyName").value.trim();
    const phone = document.getElementById("applyPhone").value.trim();
    const agreeA = document.getElementById("agreeA")?.checked;
    const agreeB = document.getElementById("agreeB")?.checked;
    const agreeC = document.getElementById("agreeC")?.checked;

    if (!name || !phone) {
      applyMessage.textContent = "请先完整填写姓名和手机号。";
      applyMessage.style.color = "#9b3d2a";
      return;
    }

    if (!agreeA || !agreeB || !agreeC) {
      applyMessage.textContent = "请先勾选全部授权与说明。";
      applyMessage.style.color = "#9b3d2a";
      return;
    }

    applyMessage.textContent = "投保申请已提交（演示版）。后续可接入数据库、支付与短信验证。";
    applyMessage.style.color = "#29453a";
  });
}

if (voucherButton && voucherStatus && voucherCode) {
  voucherButton.addEventListener("click", () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    voucherCode.textContent = `ZYB-2026-${code}`;
    voucherStatus.textContent = "已激活";
    voucherStatus.style.color = "#29453a";
  });
}
// ==========================================
// 香包定制模块交互逻辑
// ==========================================
const aiAnalyzeBtn = document.getElementById("aiAnalyzeBtn");
const aiResultUI = document.getElementById("aiResultUI");
const sachetForm = document.getElementById("sachetForm");
const sachetMessage = document.getElementById("sachetMessage");

if (aiAnalyzeBtn && aiResultUI) {
  aiAnalyzeBtn.addEventListener("click", () => {
    const fileInput = document.getElementById("sachetFile");
    
    // 简单校验是否上传了文件
    if (!fileInput.files.length) {
      alert("请先上传医疗凭证或测评结果文件。");
      return;
    }

    // 触发 AI 分析状态
    const originalText = aiAnalyzeBtn.textContent;
    aiAnalyzeBtn.textContent = "AI 智能分析中...";
    aiAnalyzeBtn.style.opacity = "0.7";
    aiAnalyzeBtn.disabled = true;
    aiResultUI.classList.add("hidden");
    
    if (sachetMessage) sachetMessage.textContent = "";

    // 模拟 1 秒延迟的 AI 分析过程
    setTimeout(() => {
      aiAnalyzeBtn.textContent = originalText;
      aiAnalyzeBtn.style.opacity = "1";
      aiAnalyzeBtn.disabled = false;
      
      // 显示配方结果和配送输入框
      aiResultUI.classList.remove("hidden");
    }, 1000);
  });
}

if (sachetForm) {
  sachetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const address = document.getElementById("deliveryAddress").value.trim();

    if (!address) {
      sachetMessage.textContent = "请填写配送地址。";
      sachetMessage.style.color = "#9b3d2a";
      return;
    }

    // 成功提示
    sachetMessage.textContent = "香包定制服务已确认！我们将尽快为您调配并配送。";
    sachetMessage.style.color = "#29453a";
  });
}