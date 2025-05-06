const scenes = [
    {
      text: "You hear soft whispers in the dark. A spiral glows faintly.",
      video: "https://dnznrvs05pmza.cloudfront.net/c6de49e1-3890-42e9-bc34-23292e405bc0.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNDY3ZDViOGQzYzJjZGI4OCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0YXNlc yIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0NjY2MjQwMH0.AfpO-k-qeEP791dQ2WRLu2y6ryN2NRcElnSAXuHmpig",
      duration: 8000
    },
    {
      text: "Golden morning light filters through the window of a small cottage.",
      video: "https://dnznrvs05pmza.cloudfront.net/58591a3a-3fa4-4e70-a3da-0d910a7e6241.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNWI0Mjk1ZjQ2NDFhN2EwZSIsImJ1b2xldCI6InJ1bndheS10YXNrLWFydGlmYWN0YXNlc yIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0NjY2MjQwMH0.cDnPG2fgLhAiR9e0Suo546Ohb0MN92vFQrMddqGyTgc",
      duration: 10000
    },
    {
      text: "Villagers outside move slowly. Fog creeps along the edge of the forest.",
      video: "https://dnznrvs05pmza.cloudfront.net/0fbb3e08-8590-404e-b012-c5c608a86057.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYjJjMTRhMGYwZmQwYTgxYSIsImJ1b2xldCI6InJ1bndheS10YXNrLWFydGlmYWN0YXNlc yIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0NjY2MjQwMH0.kw-NDhjEVkK5bk3nQCFUcuG-uBnJYJTlk3XbE1ILhvo",
      duration: 10000
    },
    {
      text: "In the mirror, your reflection mouths something silently: 'This isn’t real.'",
      video: "https://dnznrvs05pmza.cloudfront.net/37bfbe47-d534-4007-882f-57362a733020.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYjM4ZGJmNzdjZDM1YWE5MCIsImJ1b2xldCI6InJ1bndheS10YXNrLWFydGlmYWN0YXNlc yIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0NjY2MjQwMH0.9D2mpNLL9zKRtDgY1ufIIYxpr-fIENxz216dLJFHEbc",
      duration: 10000
    },
    {
      text: "…",
      video: "https://dnznrvs05pmza.cloudfront.net/58f0b6f9-1b9e-4cc1-836a-5e8540742552.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYWFiZjg4MDQwZTI2NjMwMSIsImJ1b2xldCI6InJ1bndheS10YXNrLWFydGlmYWN0YXNlc yIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc0NjY2MjQwMH0.PZPNYSeAd4_4oNHCvHtU9KhYhJ5RobFtNYFyFXiIgaU",
      duration: 8000
    }
  ];
  
  let current = 0;
  const cutscene = document.getElementById("cutscene");
  const videoEl  = document.getElementById("scene-video");
  const boxEl    = document.getElementById("dialogue-box");
  const textEl   = document.getElementById("dialogue-text");
  const nameDiv  = document.getElementById("name-input");
  
  function fadeIn(el) {
    return new Promise(res => {
      el.style.opacity = 1;
      setTimeout(res, 1000);
    });
  }
  function fadeOut(el) {
    return new Promise(res => {
      el.style.opacity = 0;
      setTimeout(res, 1000);
    });
  }
  
  async function playScene({ text, video, duration }) {
    textEl.textContent = text;
    videoEl.src = video;
    videoEl.currentTime = 0;
    videoEl.play();
  
    await fadeIn(videoEl);
    await fadeIn(boxEl);
  
    await new Promise(res => {
      let done = false;
      const advance = () => {
        if (done) return;
        done = true;
        cutscene.removeEventListener("click", advance);
        res();
      };
      cutscene.addEventListener("click", advance);
      setTimeout(advance, duration);
    });
  
    await fadeOut(boxEl);
    await fadeOut(videoEl);
    videoEl.pause();
  }
  
  async function runCutscene() {
    for (; current < scenes.length; current++) {
      await playScene(scenes[current]);
    }
    cutscene.classList.add("hidden");
    nameDiv.classList.remove("hidden");
  }
  
  runCutscene();
  