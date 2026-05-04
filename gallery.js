const galleryData = [
  { 
    src: "images/DSC_1833.webp", 
    alt: "武汉的钢铁丛林",
    caption: "秩序的钢铁丛林，有无数的梦想在这里生根发芽" ,
    span:"full"
  },
  { 
    src: "images/the_dream_land.webp", 
    alt: "梦想之地",
    caption: "梦想之地，充满无限可能" ,
    span: "half"
  },
  { 
    src: "images/DSC_3567.webp", 
    alt: "东京的暮色",
    caption: "暮色倒灌进钢铁丛林的缝隙。在这场黑白的默片里，庞大的都市静默如海。" ,
    span: "half"
  },
  { 
    src: "images/DSC_1890.webp", 
    alt: "深夜的武汉",
    caption: "深夜的城市剥落了白日的伪装，化作一头以光流为血脉的钢铁巨兽。" ,
    span: "quarter"
  },
  { 
    src: "images/shuangzita.webp", 
    alt: "双子塔",
    caption: "我们修筑通往云端的阶梯，直到躯壳在光芒中消散，塔尖归于虚无。" ,
    span: "quarter"
  },
  { 
    src: "images/DSC_3552.webp", 
    alt: "街道鸿沟两端的烟火与安宁",
    caption: "街道的片刻安宁，是被两端的烟火夹击着的。它们在光影里交织成一场无声的对峙。" ,
    span: "half"
  },
  { 
    src: "images/DSC_1224.webp", 
    alt: "斑驳墙头巡视领地的猫",
    caption: "它踩着斑驳的碎光巡视领地。墙外是喧嚣的人间，墙上是只属于它的慵懒纪元。" ,
    span: "full"
  },
  { 
    src: "images/kashi_football_boys.webp", 
    alt: "踢球的男孩",
    caption: "在这一瞬间只有对足球的热爱和纯粹的快乐。" ,
    span: "half"
  },
  { 
    src: "images/kind_old_man.webp", 
    alt: "慈祥的老者",
    caption: "岁月在他脸上刻下了痕迹，他是时间的见证者。" ,
    span: "quarter"
  },
  { 
    src: "images/twin_sisters_in_kashi.webp", 
    alt: "双胞胎姐妹",
    caption: "西域的街道充满了神秘的色彩，这对双胞胎姐妹在其中如同童话中的精灵。" ,
    span: "quarter"
  },
  { 
    src: "images/DSC_3371.webp", 
    alt: "京都黄昏下交织的电线与守候的灯笼",
    caption: "电线网切碎了京都的黄昏，灯笼守候着夜。一不小心，就会踩到旧时光斑驳的倒影。" ,
    span: "quarter"
  },
  { 
    src: "images/DSC_3275.webp", 
    alt: "大阪列车站交错的光影虚影",
    caption: "大阪列车的虚影划破空间，都市的脉搏在快门下凝固成斑驳的流光。" ,
    span: "quarter"
  },
  { 
    src: "images/DSC_3393.webp", 
    alt: "京都二年坂沉淀温度的青石板路",
    caption: "京都的青石板路，时间在这里沉淀出苔藓的温度。每一步，都像是踩在江户时代的影子里。", 
    span: "quarter"
  },
  { 
    src: "images/Tokyo_Tower.webp", 
    alt: "东京塔下的城市霓虹与航标",
    caption: "所有的跋涉，都是为了抵达这片霓虹的彼岸。在东京的潮汐里，它是唯一永恒的航标。" ,
    span: "quarter"
  },
  { 
    src: "images/DSC_3549.webp", 
    alt: "玻璃幕墙后的城市雨景与咖啡馆坐标",
    caption: "玻璃弧线切开了光影的象限。在这个坐标，现实与幻境之间，只隔着一场新海诚式的阵雨。" ,
    span: "quarter"
  },
  { 
    src: "images/Kelingking_Beach.webp", 
    alt: "佩尼达岛精灵坠崖的雨幕绝景",
    caption: "深海吞噬了光，精灵坠入永恒的雨幕。在这里，孤独被雕刻成了山的形状。" ,
    span: "full"
  },

  { 
    src: "images/lone_tree_bromo.webp", 
    alt: "布罗莫火山荒芜边缘的孤独之树",
    caption: "在世界荒芜的边缘，忍受极致的孤独。万物肃杀，唯有风在吟诵地心的回响。" ,
    span: "quarter"
  },
  { 
    src: "images/DSC_4125.webp", 
    alt: "黑色火山灰地貌上的引擎与浓雾",
    caption: "引擎咆哮在漆黑的火山岩上，像是在异星荒原上的流浪。浓雾尽头，巨兽正在地心沉睡。" ,
    span: "quarter"
  },
  { 
    src: "images/Driver_Agung_bromo.webp", 
    alt: "在火山灰烟尘中穿行的向导Agung",
    caption: "火山灰在指尖熄灭，烟尘里藏着最真实的连接。这是属于荒野向导的无声史诗。" ,
    span: "quarter"
  },
  { 
    src: "images/DSC_4424.webp", 
    alt: "慕士塔格冰川上空的沉静落日",
    caption: "慕士塔格的冰川横跨万年，默默注视这颗星球的落日。积雪之下，也藏着我过去的伤痕。" ,
    span: "quarter"
  },
  { 
    src: "images/DSC_3635.webp", 
    alt: "红月背景下地球与月球的星辰轻吻",
    caption: "一场跨越星辰的暗恋。地球在时间的流沙中轻吻月球。那一抹血色，是宇宙最沉默的温柔。" ,
    span: "three-quarters"
  },
  { 
    src: "images/moon.webp", 
    alt: "月球",
    caption: "仰望，是人类试图触碰宇宙时，最不动声色的野心。" ,
    span: "quarter"
  },
];

 document.addEventListener("DOMContentLoaded", function() {
  const galleryContainer = document.getElementById('gallery-container');
  if (!galleryContainer) return;

  // 1. 设置标尺，为 Masonry 提供基准
  let htmlContent = '<div class="grid-sizer w-[1%]"></div>';

  // 2. 组装照片数据
  galleryData.forEach(photo => {
    let widthClass = "w-full md:w-1/2"; 
    if (photo.span === "full") widthClass = "w-full";
    else if (photo.span === "three-quarters") widthClass = "w-full md:w-3/4";
    else if (photo.span === "third") widthClass = "w-full md:w-1/3";
    else if (photo.span === "quarter") widthClass = "w-full md:w-1/4";

    htmlContent += `
      <div class="gallery-item ${widthClass} p-1 md:p-2 float-left">
        <div class="overflow-hidden w-full rounded-sm">
          <a href="${photo.src}" data-fancybox="gallery" data-caption="${photo.caption || ''}">
            <img alt="${photo.alt || 'Photo'}" 
                 class="block w-full h-auto object-cover opacity-0 transition duration-500 transform hover:scale-105" 
                 src="${photo.src}">
          </a>
        </div>
      </div>
    `;
  });

  // 3. 将生成的 HTML 注入容器
  galleryContainer.innerHTML = htmlContent;

  // 4. 🔥 核心修复：一加载完 HTML 就立刻激活 Fancybox，不被网络延迟拖累
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind("[data-fancybox]", {
      Thumbs: false,
      autoFocus: false, 
      placeFocusBack: false,
      Toolbar: { display: { left: ["infobar"], middle: [], right: ["zoom", "close"] } }
    });
  }

  // 5. 等图片真正下载完后，再执行 Masonry 排版和淡入特效
  if (typeof imagesLoaded !== 'undefined') {
    imagesLoaded(galleryContainer, function() {
      
      // 启动砖块排版
      new Masonry(galleryContainer, {
        itemSelector: '.gallery-item', 
        columnWidth: '.grid-sizer', 
        percentPosition: true          
      });

      // 启动淡入动画
      const photos = galleryContainer.querySelectorAll("img");
      photos.forEach((img, index) => {
        setTimeout(() => {
          img.classList.remove("opacity-0");
          img.classList.add("opacity-100");
        }, index * 100);
      });
    });
  }
});