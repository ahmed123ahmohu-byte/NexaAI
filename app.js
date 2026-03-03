const slogans = [
  "نيكسا ليس مجرد عميل… بل هو المستقبل.",
  "مصنوع بفخر من طلاب عرب.",
];

const screens = {
  splash: document.getElementById("splash"),
  onboarding: document.getElementById("onboarding"),
  chatApp: document.getElementById("chatApp"),
};

const typewriterEl = document.getElementById("typewriter");
const startBtn = document.getElementById("startBtn");
const enterChatBtn = document.getElementById("enterChatBtn");
const nameInput = document.getElementById("nameInput");
const welcomeTitle = document.getElementById("welcomeTitle");
const messages = document.getElementById("messages");
const promptInput = document.getElementById("promptInput");
const sendBtn = document.getElementById("sendBtn");
const codePreview = document.getElementById("codePreview");
const copyCode = document.getElementById("copyCode");
const runCode = document.getElementById("runCode");
const downloadCode = document.getElementById("downloadCode");
const runOutput = document.getElementById("runOutput");

let currentCode = "";

function showScreen(target) {
  Object.values(screens).forEach((el) => el.classList.remove("active"));
  target.classList.add("active");
}

function typeWriter(lines, speed = 45) {
  let content = "";
  const full = lines.join("\n");
  let i = 0;

  const interval = setInterval(() => {
    content += full[i] || "";
    typewriterEl.textContent = content;
    i += 1;
    if (i >= full.length) {
      clearInterval(interval);
    }
  }, speed);
}

function addMessage(text, role = "bot") {
  const el = document.createElement("div");
  el.className = `msg ${role}`;
  el.textContent = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

function extractCode(text) {
  const match = text.match(/```(?:\w+)?\n([\s\S]*?)```/);
  return match ? match[1].trim() : "";
}

function handlePrompt(input) {
  const normalized = input.toLowerCase();

  if (normalized.includes("github") || normalized.includes("repo")) {
    return `ممتاز. هذا هو Workflow المقترح:\n1) Clone\n2) تحليل Structure\n3) فحص Dependencies\n4) إصلاح تلقائي\n5) اختبار Build\n6) إصدار مستقر.`;
  }

  if (normalized.includes("apk") || normalized.includes("android")) {
    return `جاهز. سأبني Android Wrapper مع إعدادات Gradle و Manifest.\n\n\`\`\`kotlin
class NexaBuilder {
  fun buildApk(repoUrl: String) {
    println("Clone: $repoUrl")
    println("Analyze + Convert to Android")
    println("Generate signed APK")
  }
}
\`\`\``;
  }

  return "أنا Nexa، مهندس تطوير مستقل. أستطيع تصميم خطة تنفيذ كاملة للمشروع، بناء الكود، وتحليل المشاكل خطوة بخطوة.";
}

function onSend() {
  const input = promptInput.value.trim();
  if (!input) return;
  addMessage(input, "user");

  const reply = handlePrompt(input);
  setTimeout(() => {
    addMessage(reply, "bot");
    const code = extractCode(reply);
    if (code) {
      currentCode = code;
      codePreview.textContent = code;
    }
  }, 300);

  promptInput.value = "";
}

startBtn.addEventListener("click", () => showScreen(screens.onboarding));

enterChatBtn.addEventListener("click", () => {
  const user = nameInput.value.trim() || "المستخدم";
  welcomeTitle.textContent = `Nexa • أهلاً ${user}`;
  showScreen(screens.chatApp);
  addMessage(`مرحبًا ${user}! أنا Nexa. كيف تريد أن نبدأ؟`, "bot");
});

sendBtn.addEventListener("click", onSend);
promptInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    onSend();
  }
});

copyCode.addEventListener("click", async () => {
  if (!currentCode) return;
  await navigator.clipboard.writeText(currentCode);
  runOutput.textContent = "تم نسخ الكود.";
});

runCode.addEventListener("click", () => {
  if (!currentCode) return;
  try {
    const result = new Function(currentCode)();
    runOutput.textContent = `Run result: ${result ?? "Done"}`;
  } catch (error) {
    runOutput.textContent = `Error: ${error.message}`;
  }
});

downloadCode.addEventListener("click", () => {
  if (!currentCode) return;
  const blob = new Blob([currentCode], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "nexa-snippet.txt";
  link.click();
  URL.revokeObjectURL(link.href);
});

function initParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  const particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 2 + 0.6,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  }));

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(130, 170, 255, 0.8)";
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

typeWriter(slogans);
initParticles();
