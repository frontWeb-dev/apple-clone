(() => {
  let yOffset = 0; // scrollY
  let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 scroll-section들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된 scroll-section

  const sectionInfo = [
    {
      // scroll-section-0
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1],
        messageA_transform: [],
      },
    },
    {
      // scroll-section-1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      // scroll-section-2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      // scroll-section-3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  const setLayout = () => {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sectionInfo.length; i++) {
      sectionInfo[i].scrollHeight = sectionInfo[i].heightNum * window.innerHeight;
      sectionInfo[i].objs.container.style.height = `${sectionInfo[i].scrollHeight}px`;
    }

    // 새로고침 했을 때 활성화 된 씬 고정
    yOffset = window.scrollY;
    let totalScrollHeight = 0;
    for (let i = 0; i < sectionInfo.length; i++) {
      totalScrollHeight += sectionInfo[i].scrollHeight;

      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  };

  const calcValues = (values, currentYOffset) => {
    let rv;

    //  현재 씬 (스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    let scrollRatio = currentYOffset / sectionInfo[currentScene].scrollHeight;

    rv = scrollRatio * (values[1] - values[0]) + values[0];

    return rv;
  };

  const playAnimation = () => {
    const objs = sectionInfo[currentScene].objs;
    const values = sectionInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    switch (currentScene) {
      case 0:
        let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
        let messageA_opacity_out = calcValues(values.messageA_opacity, currentYOffset);

        objs.messageA.style.opacity = messageA_opacity_in;
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  };

  const scrollLoop = () => {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sectionInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sectionInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    playAnimation();
  };

  // window.addEventListener('DOMContentLoaded', setLayout)
  window.addEventListener("load", setLayout);
  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    yOffset = window.scrollY;
    scrollLoop();
  });
})();
