// 在 galleryData 中维护照片，保存并刷新页面即可生效。添加方法见 README.md。
// 每张照片用一组 { ... }, 表示；可在最后的 ]; 上方粘贴新的一组，id 不要重复。
// 可新增分类；照片的 category 对应下方的键名，筛选按钮和数量自动生成。
const galleryCategories = { city: '城市', life: '人间', wild: '旷野', sky: '天体' };
// 首页封面使用哪张照片：填写下方对应的 id。
const featuredPhotoId = 'frame-16';
const galleryData = [
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/DSC_1833.webp",
    "alt": "武汉的钢铁丛林",
    "caption": "秩序的钢铁丛林，有无数的梦想在这里生根发芽",
    "width": 2560,
    "height": 1145,
    "id": "frame-01",
    "title": "钢铁丛林",
    "location": "武汉",
    "category": "city"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/the_dream_land.webp",
    "alt": "梦想之地",
    "caption": "梦想之地，充满无限可能",
    "width": 2560,
    "height": 1440,
    "id": "frame-02",
    "title": "梦想之地",
    "location": "沿途",
    "category": "city"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/DSC_3567.webp",
    "alt": "东京的暮色",
    "caption": "暮色倒灌进钢铁丛林的缝隙。在这场黑白的默片里，庞大的都市静默如海。",
    "width": 2560,
    "height": 1461,
    "id": "frame-03",
    "title": "暮色倒灌",
    "location": "东京",
    "category": "city"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/DSC_1890.webp",
    "alt": "深夜的武汉",
    "caption": "深夜的城市剥落了白日的伪装，化作一头以光流为血脉的钢铁巨兽。",
    "width": 1708,
    "height": 2560,
    "id": "frame-04",
    "title": "深夜的血脉",
    "location": "武汉",
    "category": "city"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/shuangzita.webp",
    "alt": "双子塔",
    "caption": "我们修筑通往云端的阶梯，直到躯壳在光芒中消散，塔尖归于虚无。",
    "width": 1706,
    "height": 2560,
    "id": "frame-05",
    "title": "通往云端",
    "location": "双子塔",
    "category": "city"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/DSC_3552.webp",
    "alt": "街道鸿沟两端的烟火与安宁",
    "caption": "街道的片刻安宁，是被两端的烟火夹击着的。它们在光影里交织成一场无声的对峙。",
    "width": 2560,
    "height": 1708,
    "id": "frame-06",
    "title": "街道的两端",
    "location": "街头",
    "category": "city"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/DSC_1224.webp",
    "alt": "斑驳墙头巡视领地的猫",
    "caption": "它踩着斑驳的碎光巡视领地。墙外是喧嚣的人间，墙上是只属于它的慵懒纪元。",
    "width": 2560,
    "height": 1280,
    "id": "frame-07",
    "title": "墙上的纪元",
    "location": "街头",
    "category": "life"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/kashi_football_boys.webp",
    "alt": "踢球的男孩",
    "caption": "在这一瞬间只有对足球的热爱和纯粹的快乐。",
    "width": 2560,
    "height": 1708,
    "id": "frame-08",
    "title": "纯粹的快乐",
    "location": "喀什",
    "category": "life"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/kind_old_man.webp",
    "alt": "慈祥的老者",
    "caption": "岁月在他脸上刻下了痕迹，他是时间的见证者。",
    "width": 2048,
    "height": 2560,
    "id": "frame-09",
    "title": "时间的见证者",
    "location": "喀什",
    "category": "life"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/twin_sisters_in_kashi.webp",
    "alt": "双胞胎姐妹",
    "caption": "西域的街道充满了神秘的色彩，这对双胞胎姐妹在其中如同童话中的精灵。",
    "width": 2048,
    "height": 2560,
    "id": "frame-10",
    "title": "童话里的身影",
    "location": "沿途",
    "category": "life"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/DSC_3371.webp",
    "alt": "京都黄昏下交织的电线与守候的灯笼",
    "caption": "电线网切碎了京都的黄昏，灯笼守候着夜。一不小心，就会踩到旧时光斑驳的倒影。",
    "width": 1708,
    "height": 2560,
    "id": "frame-11",
    "title": "灯笼守候着夜",
    "location": "京都",
    "category": "city"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/DSC_3275.webp",
    "alt": "大阪列车站交错的光影虚影",
    "caption": "大阪列车的虚影划破空间，都市的脉搏在快门下凝固成斑驳的流光。",
    "width": 1708,
    "height": 2560,
    "id": "frame-12",
    "title": "列车的虚影",
    "location": "大阪",
    "category": "city"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/DSC_3393.webp",
    "alt": "京都二年坂沉淀温度的青石板路",
    "caption": "京都的青石板路，时间在这里沉淀出苔藓的温度。每一步，都像是踩在江户时代的影子里。",
    "width": 2560,
    "height": 1440,
    "id": "frame-13",
    "title": "旧时光的温度",
    "location": "京都",
    "category": "city"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/Tokyo_Tower.webp",
    "alt": "东京塔下的城市霓虹与航标",
    "caption": "所有的跋涉，都是为了抵达这片霓虹的彼岸。在东京的潮汐里，它是唯一永恒的航标。",
    "width": 1708,
    "height": 2306,
    "id": "frame-14",
    "title": "霓虹的航标",
    "location": "东京",
    "category": "city"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/DSC_3549.webp",
    "alt": "玻璃幕墙后的城市雨景与咖啡馆坐标",
    "caption": "玻璃弧线切开了光影的象限。在这个坐标，现实与幻境之间，只隔着一场新海诚式的阵雨。",
    "width": 2560,
    "height": 1708,
    "id": "frame-15",
    "title": "光影的象限",
    "location": "城市",
    "category": "city"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/Kelingking_Beach.webp",
    "alt": "佩尼达岛精灵坠崖的雨幕绝景",
    "caption": "深海吞噬了光，精灵坠入永恒的雨幕。在这里，孤独被雕刻成了山的形状。",
    "width": 2560,
    "height": 1356,
    "id": "frame-16",
    "title": "孤独的形状",
    "location": "佩尼达岛",
    "category": "wild"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/lone_tree_bromo.webp",
    "alt": "布罗莫火山荒芜边缘的孤独之树",
    "caption": "在世界荒芜的边缘，忍受极致的孤独。万物肃杀，唯有风在吟诵地心的回响。",
    "width": 2560,
    "height": 1440,
    "id": "frame-17",
    "title": "荒原上的独白",
    "location": "布罗莫",
    "category": "wild"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/DSC_4125.webp",
    "alt": "黑色火山灰地貌上的引擎与浓雾",
    "caption": "引擎咆哮在漆黑的火山岩上，像是在异星荒原上的流浪。浓雾尽头，巨兽正在地心沉睡。",
    "width": 2560,
    "height": 1439,
    "id": "frame-18",
    "title": "巨兽沉睡之地",
    "location": "布罗莫",
    "category": "wild"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/Driver_Agung_bromo.webp",
    "alt": "在火山灰烟尘中穿行的向导Agung",
    "caption": "火山灰在指尖熄灭，烟尘里藏着最真实的连接。这是属于荒野向导的无声史诗。",
    "width": 2560,
    "height": 1440,
    "id": "frame-19",
    "title": "向导 Agung",
    "location": "布罗莫",
    "category": "life"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/DSC_4424.webp",
    "alt": "慕士塔格冰川上空的沉静落日",
    "caption": "慕士塔格的冰川横跨万年，默默注视这颗星球的落日。积雪之下，也藏着我过去的伤痕。",
    "width": 2276,
    "height": 1280,
    "id": "frame-20",
    "title": "万年的落日",
    "location": "慕士塔格",
    "category": "wild"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/DSC_3635.webp",
    "alt": "红月背景下地球与月球的星辰轻吻",
    "caption": "一场跨越星辰的暗恋。地球在时间的流沙中轻吻月球。那一抹血色，是宇宙最沉默的温柔。",
    "width": 2560,
    "height": 1239,
    "id": "frame-21",
    "title": "星辰的轻吻",
    "location": "月食",
    "category": "sky"
  },
  {
    "src": "https://chenjt-portfolio-1420941215.cos.ap-shanghai.myqcloud.com/images/moon.webp",
    "alt": "月球",
    "caption": "仰望，是人类试图触碰宇宙时，最不动声色的野心。",
    "width": 1041,
    "height": 1562,
    "id": "frame-22",
    "title": "仰望",
    "location": "月球",
    "category": "sky"
  },
];
