import React, { useState, useMemo, useRef } from "react";

// ----------------------------------------------------------------------
// 1. TYPES & INTERFACES
// ----------------------------------------------------------------------

type TypeID = "A" | "B" | "C" | "D" | "E" | "F" | "G";

interface QuestionOption {
  label: string;
  typeId: TypeID;
}

interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

interface DiagnosisResultType {
  id: TypeID;
  name: string;
  alias: string;
  color: string; // Tailwind bg class
  accentColor: string; // Tailwind text class
  gradient: string; // CSS Gradient
  skill: string;
  description: string;
  featuresTitle: string;
  features: string;
  reason: string;
  monetization: string;
}

type ScreenState = "start" | "quiz" | "calculating" | "result";

// ----------------------------------------------------------------------
// 2. CONSTANTS & DATA
// ----------------------------------------------------------------------

// -- AVATARS (Modern / Thin Line / Tech Style) --
const strokeStyle = {
  stroke: "#334155", // Slate-700
  strokeWidth: "1.5", // Ultra thin, stylish
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

const AvatarA = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="gradA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g transform="translate(50, 40) scale(0.5)">
        <path
          d="M50,180 L150,180 L130,80 L70,80 Z"
          stroke="#22d3ee"
          strokeWidth="1.5"
          fill="url(#gradA)"
        />
        <line x1="140" y1="180" x2="160" y2="60" {...strokeStyle} />
        <circle
          cx="160"
          cy="50"
          r="12"
          stroke="#22d3ee"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="100" cy="70" r="35" {...strokeStyle} />
        <path
          d="M70,50 L130,50 L100,10 Z"
          stroke="#22d3ee"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M85,85 Q100,120 115,85" {...strokeStyle} />
        <circle cx="90" cy="70" r="2" fill="#334155" />
        <circle cx="110" cy="70" r="2" fill="#334155" />
      </g>
    </svg>
  </div>
);

const AvatarB = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="gradB" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f472b6" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g transform="translate(50, 40) scale(0.5)">
        <path
          d="M60,180 Q60,120 100,120 Q140,120 140,180"
          stroke="#f472b6"
          strokeWidth="1.5"
          fill="url(#gradB)"
        />
        <path d="M80,130 Q100,150 120,130" {...strokeStyle} />
        <circle cx="100" cy="90" r="40" {...strokeStyle} />
        <ellipse
          cx="110"
          cy="65"
          rx="45"
          ry="18"
          stroke="#f472b6"
          strokeWidth="1.5"
          fill="none"
          transform="rotate(-10 110 65)"
        />
        <rect
          x="150"
          y="80"
          width="14"
          height="60"
          transform="rotate(30 150 110)"
          {...strokeStyle}
        />
        <circle cx="90" cy="90" r="2" fill="#334155" />
        <circle cx="115" cy="90" r="2" fill="#334155" />
      </g>
    </svg>
  </div>
);

const AvatarC = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="gradC" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g transform="translate(50, 40) scale(0.5)">
        <rect
          x="60"
          y="130"
          width="80"
          height="60"
          rx="10"
          stroke="#94a3b8"
          strokeWidth="1.5"
          fill="url(#gradC)"
        />
        <rect x="70" y="60" width="60" height="65" rx="12" {...strokeStyle} />
        <rect x="65" y="75" width="28" height="18" rx="6" {...strokeStyle} />
        <rect x="110" y="75" width="28" height="18" rx="6" {...strokeStyle} />
        <line x1="93" y1="84" x2="107" y2="84" {...strokeStyle} />
        <path
          d="M140,120 L165,95"
          stroke="#cbd5e1"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="M158,92 L168,102" {...strokeStyle} />
      </g>
    </svg>
  </div>
);

const AvatarD = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="gradD" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g transform="translate(50, 40) scale(0.5)">
        <path
          d="M60,180 L140,180 L120,110 L80,110 Z"
          stroke="#818cf8"
          strokeWidth="1.5"
          fill="url(#gradD)"
        />
        <circle cx="100" cy="80" r="35" {...strokeStyle} />
        <rect x="80" y="75" width="18" height="12" {...strokeStyle} />
        <rect x="105" y="75" width="18" height="12" {...strokeStyle} />
        <line x1="98" y1="81" x2="105" y2="81" {...strokeStyle} />
        <path
          d="M110,130 L150,130 L145,160 L105,160 Z"
          stroke="#818cf8"
          strokeWidth="1.5"
          fill="none"
          transform="rotate(-10 130 145)"
        />
      </g>
    </svg>
  </div>
);

const AvatarE = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="gradE" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g transform="translate(50, 40) scale(0.5)">
        <path
          d="M70,180 L130,180 L130,130 L70,130 Z"
          stroke="#c084fc"
          strokeWidth="1.5"
          fill="url(#gradE)"
        />
        <circle cx="100" cy="90" r="35" {...strokeStyle} />
        <path
          d="M70,80 L60,50 L80,60 L90,40 L110,60 L130,40 L140,80"
          stroke="#c084fc"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M65,90 Q100,40 135,90"
          fill="none"
          stroke="#334155"
          strokeWidth="1.5"
        />
        <circle cx="65" cy="90" r="12" {...strokeStyle} />
        <circle cx="135" cy="90" r="12" {...strokeStyle} />
        <path d="M85,98 L115,98" stroke="#334155" strokeWidth="1.5" />
      </g>
    </svg>
  </div>
);

const AvatarF = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="gradF" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g transform="translate(50, 40) scale(0.5)">
        <path
          d="M50,180 Q100,100 150,180"
          stroke="#34d399"
          strokeWidth="1.5"
          fill="url(#gradF)"
        />
        <path
          d="M70,100 Q100,40 130,100"
          stroke="#34d399"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="100" cy="100" r="25" {...strokeStyle} />
        <path
          d="M100,145 L88,133 Q82,127 88,121 Q94,115 100,127 Q106,115 112,121 Q118,127 112,133 Z"
          stroke="#34d399"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M90,100 Q95,95 100,100"
          stroke="#334155"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M100,100 Q105,95 110,100"
          stroke="#334155"
          strokeWidth="1.5"
          fill="none"
        />
      </g>
    </svg>
  </div>
);

const AvatarG = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="gradG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g transform="translate(50, 40) scale(0.5)">
        <path
          d="M40,180 L160,180 L130,120 L70,120 Z"
          stroke="#fb923c"
          strokeWidth="1.5"
          fill="url(#gradG)"
        />
        <circle cx="100" cy="90" r="35" {...strokeStyle} />
        <path
          d="M70,70 L80,40 L100,60 L120,40 L130,70"
          stroke="#fbbf24"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M90,105 Q100,115 110,105"
          fill="none"
          stroke="#334155"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  </div>
);

const TypeIcon = ({
  typeId,
  className,
}: {
  typeId: TypeID;
  className?: string;
}) => {
  switch (typeId) {
    case "A":
      return <AvatarA className={className} />;
    case "B":
      return <AvatarB className={className} />;
    case "C":
      return <AvatarC className={className} />;
    case "D":
      return <AvatarD className={className} />;
    case "E":
      return <AvatarE className={className} />;
    case "F":
      return <AvatarF className={className} />;
    case "G":
      return <AvatarG className={className} />;
    default:
      return <AvatarA className={className} />;
  }
};

const DIAGNOSIS_TYPES: Record<TypeID, DiagnosisResultType> = {
  A: {
    id: "A",
    name: "言語の魔術師",
    alias: "Word Wizard",
    color: "bg-cyan-50",
    accentColor: "text-cyan-600",
    gradient: "from-cyan-400 to-blue-500",
    skill: "【召喚魔法】高度言語モデル / プロンプト設計",
    description: "言葉で世界を定義する論理の支配者",
    featuresTitle: "論理で殴るのが好き",
    features:
      "あなたは感情論よりも「定義」や「構造」を好むタイプ。会話の中で「それってどういう定義？」と聞きたくなる衝動を抑えているかもしれません。曖昧な指示を嫌い、複雑な事象をパズルのように分解して整理することに、一種の快感を覚えます。",
    reason:
      "生成AIの本質は「言葉によるプログラミング」です。あなたの持つ「言語化能力」と「論理的思考」は、AIに対する最強の指揮棒となります。多くの人がAIに曖昧な指示を出して失敗する中、あなたは正確無比な呪文（プロンプト）で、AIの性能を100%引き出せます。",
    monetization:
      "【プロンプトエンジニア / 技術ライター】\n企業向けに「絶対に誤作動しない業務効率化プロンプト」を設計・販売するのが最短ルート。また、専門知識をAIと壁打ちしながら体系化し、技術書やノウハウ記事を爆速で出版する「AI共著」も、印税収入と権威性を同時に得られる賢い戦略です。",
  },
  B: {
    id: "B",
    name: "幻想の錬金術師",
    alias: "Visual Alchemist",
    color: "bg-pink-50",
    accentColor: "text-pink-600",
    gradient: "from-pink-400 to-rose-500",
    skill: "【創造魔法】画像生成AI / デザイン自動化",
    description: "無から有を生むクリエイティブモンスター",
    featuresTitle: "説明書は読まない派",
    features:
      "理屈よりも「直感」と「美意識」で生きているタイプ。「なんかいい感じ」という感覚を言語化するのは苦手でも、ビジュアルで表現するのは得意。頭の中には常に、現実世界よりも鮮やかな妄想ワールドが広がっています。",
    reason:
      "画像生成AIは「偶然の奇跡（ガチャ）」を楽しむツールです。論理でガチガチに固めるよりも、AIが出してきた予想外の絵を「これ面白くない？」と面白がれるあなたの感性が最大の武器。AIはあなたの脳内イメージを具現化するための「賢い絵筆」になります。",
    monetization:
      "【AI広告クリエイター / 素材販売】\n「架空のモデル」を使った写真集販売や、企業のSNS広告画像の制作代行が熱い市場です。あなたの美的センスで厳選した画像をストックフォトとして販売したり、スタンプ等を量産するなど、「数打ちゃ当たる」戦略をAIで超高速化できます。",
  },
  C: {
    id: "C",
    name: "絡繰の技師",
    alias: "Automation Engineer",
    color: "bg-slate-100",
    accentColor: "text-slate-600",
    gradient: "from-slate-400 to-gray-500",
    skill: "【自動化魔法】ワークフロー自動化 / API連携",
    description: "自分が動かず世界を回す効率の悪魔",
    featuresTitle: "「面倒くさい」が最大の原動力",
    features:
      "同じ作業を2回繰り返すのが死ぬほど嫌いなタイプ。「もっと楽な方法があるはず」と常にショートカットを探しています。あなたが努力するのは「将来の自分がサボるため」であり、そのための労力は惜しまない「勤勉な怠け者」です。",
    reason:
      "AI単体ではなく、AI同士を繋げて全自動の工場（ワークフロー）を作ることに天才的な適性があります。あなたはプレイヤーとして戦うのではなく、無数のAIボットを指揮する「将軍」になるべきです。寝ている間に仕事が終わっている快感は、あなただけのものです。",
    monetization:
      "【業務自動化コンサルタント】\n中小企業の面倒な事務作業（請求書処理や日程調整）をAIで全自動化するシステムを構築し、月額保守料をもらうビジネスモデルが最強。「一度作れば終わり」の仕組みを量産することで、労働時間に比例しない「不労所得的」な収益柱を築けます。",
  },
  D: {
    id: "D",
    name: "真理の探求者",
    alias: "Deep Seeker",
    color: "bg-indigo-50",
    accentColor: "text-indigo-600",
    gradient: "from-indigo-400 to-violet-500",
    skill: "【解析魔法】検索AI / データ分析",
    description: "情報の海から真実を釣り上げる賢者",
    featuresTitle: "ソースがないと信じない",
    features:
      "疑り深く、納得いくまで調べないと気が済まないタイプ。ネットの噂話よりも「一次情報はどこ？」とデータを確認する癖があります。オタク気質があり、興味を持ったことはとことん深掘りするため、特定分野の知識量は異常なレベルになりがちです。",
    reason:
      "AIは平気で嘘をつきますが、あなたはそれを見抜く「鑑識眼」を持っています。AIを「超高速のリサーチャー」として使いこなし、膨大な論文やデータを要約・分析させることで、人間一人では到達できない知の領域にアクセスできます。",
    monetization:
      "【特化型レポート販売 / 投資分析】\n「AI関連の最新技術要約」や「特定業界の市場動向レポート」など、精度の高い情報をnoteや有料記事で販売しましょう。AIを使って情報の収集・要約コストを極限まで下げつつ、あなたの「洞察（インサイト）」を付加価値として売るモデルです。",
  },
  E: {
    id: "E",
    name: "旋律の吟遊詩人",
    alias: "Trend Bard",
    color: "bg-purple-50",
    accentColor: "text-purple-600",
    gradient: "from-purple-400 to-fuchsia-500",
    skill: "【魅了魔法】動画生成AI / 音声合成",
    description: "流行の波を乗りこなすカリスマ",
    featuresTitle: "飽きっぽいのは進化の証",
    features:
      "「楽しいか、つまらないか」が全ての判断基準。新しいもの好きで、流行には敏感。難しい理屈よりも、人の感情を揺さぶるストーリーや、ノリの良い音楽、インパクトのある動画が好き。場を盛り上げる才能の持ち主です。",
    reason:
      "今のAIトレンドは「動画」と「音楽」です。あなたの「バズる感覚」をAIに教え込めば、ショート動画やSNSで再生数を稼ぐコンテンツを量産できます。クオリティよりもスピードとインパクト勝負の今のSNS戦国時代において、あなたは最強の武将です。",
    monetization:
      "【AIインフルエンサー / ショート動画】\n顔出し不要のAIアバターを使って、流行のダンスやミーム動画を量産し、広告収益や企業案件で稼ぐのが王道。また、AIで作ったBGMやナレーション素材を配信するなど、エンタメの力でファンを集めるビジネスが向いています。",
  },
  F: {
    id: "F",
    name: "聖なる治癒士",
    alias: "Mental Healer",
    color: "bg-emerald-50",
    accentColor: "text-emerald-600",
    gradient: "from-emerald-400 to-teal-500",
    skill: "【対話魔法】AIペルソナ設計 / チャットボット",
    description: "AIに心を宿す唯一無二の媒介者",
    featuresTitle: "人の痛みがわかる優しさ",
    features:
      "感受性が豊かで、他人の感情に敏感なタイプ。競争やマウントの取り合いよりも、平和で優しい世界を好みます。友人の相談に乗ることが多く、相手が何と言って欲しいのかを直感的に察知できる能力があります。",
    reason:
      "AIはただの計算機ですが、そこに「人格（ペルソナ）」を宿らせることができるのは、あなたの人間理解力だけです。ユーザーが話していて心地よいと感じる話し方、間合い、共感の言葉をAIに教え込むことで、愛されるAIキャラクターを生み出せます。",
    monetization:
      "【AIカウンセラー / 占いbot開発】\n「愚痴聞きbot」や「メンタルケアAI」、あるいは「推し活用の恋人AI」など、感情的価値を提供するチャットボットを作成・公開しましょう。機能的な便利さではなく、「癒やし」や「寂しさの解消」にお金を払う層は巨大なマーケットです。",
  },
  G: {
    id: "G",
    name: "叡智の賢者",
    alias: "Grand Sage",
    color: "bg-orange-50",
    accentColor: "text-orange-600",
    gradient: "from-orange-400 to-amber-500",
    skill: "【統率魔法】AI導入支援 / 組織マネジメント",
    description: "人とAIを繋ぎ導く教育者",
    featuresTitle: "教えること、シェアすることが好き",
    features:
      "物事を俯瞰して見るのが得意なリーダータイプ。自分一人で成果を出すよりも、チーム全体のレベルが上がることや、誰かに知識を教えて「ありがとう」と言われることに喜びを感じます。バランス感覚に優れ、調整役として重宝されます。",
    reason:
      "特定の技術に特化するより、「どのAIをどう使えば課題解決できるか」という全体設計（ディレクション）に向いています。AIアレルギーのある人たちに、わかりやすくAIの魅力を伝え、導入をサポートする架け橋としての役割は、今後最も需要が高まります。",
    monetization:
      "【AI研修講師 / コミュニティ運営】\n企業向けのAI導入研修や、初心者向けのAI活用セミナーを開催するのがベスト。技術的な詳細よりも「どう役立つか」を翻訳して伝える能力が高く評価されます。オンラインサロン運営など、人を集めて導くビジネスで大きな収益を上げられます。",
  },
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "新しいことを学ぶ時、一番頭に入るのは？",
    options: [
      { label: "本や記事を読む（じっくり派）", typeId: "A" },
      { label: "図解やイラストを見る（一目瞭然）", typeId: "B" },
      { label: "動画や音声を聞く（ながら学習）", typeId: "E" },
      { label: "とりあえずやって失敗する（体当たり）", typeId: "G" },
    ],
  },
  {
    id: 2,
    text: "スマホの写真フォルダ、一番多いのは？",
    options: [
      { label: "推し・アイドル", typeId: "E" },
      { label: "ペット・動物", typeId: "F" },
      { label: "風景・綺麗な場所", typeId: "B" },
      { label: "美味しいご飯", typeId: "G" },
    ],
  },
  {
    id: 3,
    text: "夏休みの宿題、どう進めてた？",
    options: [
      { label: "計画的にコツコツ終わらせた", typeId: "A" },
      { label: "最終日に泣きながらやった", typeId: "E" },
      { label: "答えを写すか、やらないで開き直る", typeId: "C" },
    ],
  },
  {
    id: 4,
    text: "自分の部屋、どんな状態？",
    options: [
      { label: "どこに何があるか把握している", typeId: "C" },
      { label: "インテリアにはこだわっている", typeId: "B" },
      { label: "思い出の品が捨てられない", typeId: "F" },
    ],
  },
  {
    id: 5,
    text: "映画を見て感動！人にどう伝える？",
    options: [
      { label: "伏線回収が凄かった！と解説する", typeId: "A" },
      { label: "映像と音楽がヤバかった！と熱弁", typeId: "E" },
      { label: "とにかく泣けた、エモかった...", typeId: "F" },
    ],
  },
  {
    id: 6,
    text: "説明する時、よく使う言葉は？",
    options: [
      { label: "「論理的に言うと」「要するに」", typeId: "A" },
      { label: "「バーっと」「シュッと」などの擬音", typeId: "B" },
      { label: "「例えば〜」と例え話を出す", typeId: "G" },
    ],
  },
  {
    id: 7,
    text: "予想外のトラブル発生！どうする？",
    options: [
      { label: "原因を分析して解決策を練る", typeId: "D" },
      { label: "直感で「こっちだ！」と動く", typeId: "B" },
      { label: "誰かに相談する、助けを呼ぶ", typeId: "F" },
    ],
  },
  {
    id: 8,
    text: "単純作業（コピペなど）を続けるのは？",
    options: [
      { label: "無心になれるから意外と好き", typeId: "A" },
      { label: "3分で飽きる、無理", typeId: "E" },
      { label: "どうにかして自動化できないか考える", typeId: "C" },
    ],
  },
  {
    id: 9,
    text: "人との会話で気になるのは？",
    options: [
      { label: "話の矛盾や事実関係", typeId: "D" },
      { label: "相手の表情や声のトーン", typeId: "F" },
      { label: "話のオチや面白さ", typeId: "E" },
    ],
  },
  {
    id: 10,
    text: "「完璧主義」って言われる？",
    options: [
      { label: "細部までこだわらないと気が済まない", typeId: "A" },
      { label: "全体の雰囲気が良ければOK", typeId: "B" },
      { label: "80点でいいから早く終わらせたい", typeId: "C" },
    ],
  },
  {
    id: 11,
    text: "得意なのはどっち？",
    options: [
      { label: "0から1を生み出す（新規アイデア）", typeId: "B" },
      { label: "1を100にする（改善・拡大）", typeId: "G" },
    ],
  },
  {
    id: 12,
    text: "LINEやメールの返信は？",
    options: [
      { label: "文章でしっかり書くのが好き", typeId: "A" },
      { label: "スタンプや短文で済ませがち", typeId: "E" },
    ],
  },
  {
    id: 13,
    text: "嘘をつくのは得意？",
    options: [
      { label: "絶対にバレない自信がある", typeId: "D" },
      { label: "顔に出るから無理", typeId: "F" },
      { label: "場を盛り上げるためなら多少は", typeId: "E" },
    ],
  },
  {
    id: 14,
    text: "音楽を聴くとき重視するのは？",
    options: [
      { label: "歌詞の意味・世界観", typeId: "A" },
      { label: "メロディ・リズム・ノリ", typeId: "E" },
    ],
  },
  {
    id: 15,
    text: "AIを「相棒」にするなら？",
    options: [
      { label: "命令を完璧にこなすロボット", typeId: "C" },
      { label: "人間味があって相談できる奴", typeId: "F" },
    ],
  },
  {
    id: 16,
    text: "他人の間違いを見つけたら？",
    options: [
      { label: "指摘して正してあげる", typeId: "A" },
      { label: "傷つけないように遠回しに言う", typeId: "F" },
      { label: "面倒だからスルーする", typeId: "C" },
    ],
  },
  {
    id: 17,
    text: "情報を調べる時、信頼するのは？",
    options: [
      { label: "公的機関のデータ・論文", typeId: "D" },
      { label: "SNSの口コミ・評判", typeId: "E" },
      { label: "信頼できる人のオススメ", typeId: "G" },
    ],
  },
  {
    id: 18,
    text: "AIで100万円稼ぐなら？",
    options: [
      { label: "自分の名前で有名になって稼ぐ", typeId: "E" },
      { label: "すごい作品を作って販売する", typeId: "B" },
      { label: "全自動の仕組みを作って放置で稼ぐ", typeId: "C" },
    ],
  },
  {
    id: 19,
    text: "今、一番「面倒だ」と感じていることは？",
    options: [
      { label: "考えること（決断疲れ）", typeId: "F" },
      { label: "作業すること（単純労働）", typeId: "C" },
    ],
  },
  {
    id: 20,
    text: "最終的に手に入れたいのは？",
    options: [
      { label: "圧倒的な知能（脳の拡張）", typeId: "D" },
      { label: "神のような創造力（手足の拡張）", typeId: "B" },
      { label: "働かない自由（時間の拡張）", typeId: "C" },
      { label: "人からの感謝・信頼（心の拡張）", typeId: "G" },
    ],
  },
];

// ----------------------------------------------------------------------
// 3. COMPONENTS
// ----------------------------------------------------------------------

// -- Start Screen --
interface StartScreenProps {
  nickname: string;
  setNickname: (name: string) => void;
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({
  nickname,
  setNickname,
  onStart,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center space-y-12 animate-fade-in relative z-10">
      <div className="space-y-6 relative">
        <div className="inline-block bg-slate-900/5 backdrop-blur-md text-slate-500 text-xs font-semibold px-4 py-1.5 rounded-full border border-slate-200 tracking-widest">
          WIZAI PROJECT v1.2.0
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tighter drop-shadow-sm leading-tight">
          AI適性
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            スキル診断
          </span>
        </h1>

        <p className="text-slate-600 text-sm md:text-lg max-w-lg mx-auto font-medium leading-relaxed">
          AI時代の働き方をハックせよ。
          <br />
          20の質問で、あなたの
          <span className="font-bold text-slate-800 border-b-2 border-blue-200">
            隠れた才能
          </span>
          と
          <span className="font-bold text-slate-800 border-b-2 border-purple-200">
            最強の稼ぎ方
          </span>
          を分析します。
        </p>
      </div>

      <div className="w-full max-w-sm space-y-6 bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-2xl shadow-blue-900/10">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Codename
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="ニックネームを入力"
            className="w-full bg-slate-50 text-slate-900 text-center text-lg font-semibold py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400 transition-all"
            maxLength={10}
          />
        </div>

        <button
          onClick={onStart}
          disabled={!nickname.trim()}
          className={`w-full py-4 rounded-xl font-bold text-lg tracking-widest transition-all duration-300 transform 
            ${
              nickname.trim()
                ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-1"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
        >
          START DIAGNOSIS
        </button>
      </div>
    </div>
  );
};

// -- Question Screen --
interface QuestionScreenProps {
  question: Question;
  totalQuestions: number;
  currentStep: number;
  onAnswer: (option: QuestionOption) => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  totalQuestions,
  currentStep,
  onAnswer,
}) => {
  const progress = ((currentStep + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 min-h-[85vh] flex flex-col justify-center animate-fade-in-up">
      {/* Progress Bar Container */}
      <div className="mb-10 w-full max-w-md mx-auto">
        <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 tracking-wider">
          <span>MISSION {currentStep + 1}</span>
          <span>GOAL {totalQuestions}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
        {/* Badge */}
        <div className="inline-block mb-6 bg-slate-100 text-slate-500 px-3 py-1 text-xs font-bold rounded-full tracking-wide">
          QUESTION {question.id}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-10 leading-relaxed">
          {question.text}
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className="w-full p-4 md:p-5 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50/50 text-left transition-all duration-300 flex items-center group/btn shadow-sm hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover/btn:bg-blue-500 group-hover/btn:text-white mr-5 flex items-center justify-center text-sm font-bold transition-colors duration-300">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-base md:text-lg text-slate-600 group-hover/btn:text-slate-900 font-medium transition-colors">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// -- Result Screen --
interface ResultScreenProps {
  result: DiagnosisResultType;
  nickname: string;
  onReset: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  nickname,
  onReset,
}) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Replaced D3 with inline SVG for Tech Background to avoid dependencies
  const TechBackground = () => (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50"
      viewBox="0 0 300 300"
    >
      <g transform="translate(150, 150)">
        {/* Circle 1 */}
        <circle r="80" fill="none" stroke="#e2e8f0" strokeWidth="1" />
        {/* Circle 2 (Dashed) */}
        <circle
          r="120"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="0.5"
          strokeDasharray="4,4"
        />
        {/* Dots */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * 2 * Math.PI;
          const x = Math.cos(angle) * 120;
          const y = Math.sin(angle) * 120;
          return <circle key={i} cx={x} cy={y} r="3" fill="#cbd5e1" />;
        })}
      </g>
    </svg>
  );

  const handleDownloadPDF = async () => {
    if (!resultRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const html2canvas = (window as any).html2canvas;
      const jspdf = (window as any).jspdf;

      if (!html2canvas || !jspdf) {
        throw new Error("PDF libraries not loaded");
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        scrollY: -window.scrollY,
        windowHeight: document.documentElement.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = jspdf;

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const pdfWidth = 210;
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`wizai_diagnosis_${result.id}.pdf`);
    } catch (error) {
      console.error("PDF Generation Failed", error);
      alert("PDFの保存に失敗しました。");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-12 animate-fade-in font-sans">
      {/* Result Container to Capture */}
      <div
        ref={resultRef}
        className="bg-white p-0 overflow-hidden shadow-2xl rounded-none"
      >
        {/* Cover Section */}
        <div
          className={`relative p-12 text-center overflow-hidden bg-gradient-to-br ${result.gradient} text-white`}
        >
          <div
            className="absolute top-0 left-0 w-full h-full bg-white opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="relative z-10">
            <div className="inline-block px-4 py-1 mb-6 border border-white/30 rounded-full text-xs font-medium tracking-widest uppercase bg-white/10 backdrop-blur-sm">
              Analysis Complete for {nickname}
            </div>

            <p className="text-lg font-bold opacity-90 mb-2 uppercase tracking-wide">
              {result.alias}
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              {result.name}
            </h1>
            <p className="text-xl md:text-2xl font-medium opacity-90 max-w-xl mx-auto leading-relaxed">
              "{result.description}"
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 space-y-12">
          {/* Avatar & Skill */}
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <TechBackground />
              <TypeIcon typeId={result.id} className="relative z-10 p-2" />
            </div>

            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                Unique Skill
              </span>
              <div className={`text-2xl font-bold ${result.accentColor}`}>
                {result.skill}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Deep Dive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-2">
                <div
                  className={`w-1 h-6 rounded ${result.color.replace(
                    "bg-",
                    "bg-"
                  )}-400`}
                ></div>
                <h3 className="font-bold text-lg text-slate-800">
                  適性タイプの特徴
                </h3>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase">
                {result.featuresTitle}
              </p>
              <p className="text-slate-600 text-sm leading-7 text-justify">
                {result.features}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-2">
                <div
                  className={`w-1 h-6 rounded ${result.color.replace(
                    "bg-",
                    "bg-"
                  )}-400`}
                ></div>
                <h3 className="font-bold text-lg text-slate-800">
                  なぜこのタイプ？
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-7 text-justify">
                {result.reason}
              </p>
            </div>
          </div>

          {/* Monetization Box */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full mb-2">
                MONETIZATION
              </span>
              <h3 className="font-bold text-xl text-slate-800">
                適性スキルで
                <span className="border-b-4 border-yellow-200">
                  100万円稼ぐ
                </span>
                アイデア
              </h3>
            </div>
            <p className="text-slate-700 text-sm leading-7 text-justify font-medium">
              {result.monetization}
            </p>
          </div>

          {/* Footer */}
          <div className="text-center text-slate-300 text-[10px] font-mono pt-8">
            WIZAI // AI SKILL DIAGNOSIS REPORT
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mt-12 px-4 max-w-2xl mx-auto">
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPdf}
          className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center disabled:opacity-50"
        >
          {isGeneratingPdf ? (
            <span className="flex items-center animate-pulse">
              Generating...
            </span>
          ) : (
            <>
              <span className="mr-2 text-xl">↓</span> Save as PDF
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="flex-1 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center"
        >
          <span className="mr-2 text-xl">↺</span> Restart
        </button>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 4. MAIN APP CONTROLLER
// ----------------------------------------------------------------------

export default function App() {
  const [screen, setScreen] = useState<ScreenState>("start");
  const [nickname, setNickname] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [scores, setScores] = useState<Record<TypeID, number>>({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
  });
  const [lateScores, setLateScores] = useState<Record<TypeID, number>>({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
  });

  const handleStart = () => {
    setScreen("quiz");
  };

  const handleAnswer = (option: QuestionOption) => {
    const questionId = QUESTIONS[currentQuestionIndex].id;
    const typeId = option.typeId;

    const newScores = { ...scores, [typeId]: scores[typeId] + 1 };
    setScores(newScores);

    const LATE_STAGE_THRESHOLD = 14;
    let newLateScores = lateScores;
    if (questionId >= LATE_STAGE_THRESHOLD) {
      newLateScores = { ...lateScores, [typeId]: lateScores[typeId] + 1 };
      setLateScores(newLateScores);
    }

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateResult(newScores, newLateScores);
    }
  };

  const calculateResult = (
    finalScores: Record<TypeID, number>,
    finalLateScores: Record<TypeID, number>
  ) => {
    setScreen("calculating");
    setTimeout(() => {
      setScreen("result");
    }, 2000);
  };

  const winnerId = useMemo(() => {
    const types = Object.keys(scores) as TypeID[];
    const sortedTypes = types.sort((a, b) => {
      const scoreDiff = scores[b] - scores[a];
      if (scoreDiff !== 0) return scoreDiff;
      return lateScores[b] - lateScores[a];
    });
    return sortedTypes[0];
  }, [scores, lateScores]);

  const resetDiagnosis = () => {
    setScores({ A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 });
    setLateScores({ A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 });
    setCurrentQuestionIndex(0);
    setScreen("start");
    setNickname("");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .animate-fade-in-up { animation: fade-in 0.5s ease-out; }
      `}</style>

      {/* Dynamic Aurora Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-cyan-100/40 rounded-full blur-[80px] animate-pulse delay-500"></div>
      </div>

      <main className="relative z-10 w-full pt-12 pb-16">
        {screen === "start" && (
          <StartScreen
            nickname={nickname}
            setNickname={setNickname}
            onStart={handleStart}
          />
        )}
        {screen === "quiz" && (
          <QuestionScreen
            question={QUESTIONS[currentQuestionIndex]}
            totalQuestions={QUESTIONS.length}
            currentStep={currentQuestionIndex}
            onAnswer={handleAnswer}
          />
        )}
        {screen === "calculating" && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
            <div className="relative w-24 h-24">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-100 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-xl font-bold tracking-widest mt-8 text-slate-400 uppercase">
              Processing...
            </h2>
          </div>
        )}
        {screen === "result" && (
          <ResultScreen
            result={DIAGNOSIS_TYPES[winnerId]}
            nickname={nickname}
            onReset={resetDiagnosis}
          />
        )}
      </main>

      <footer className="fixed bottom-0 w-full py-4 text-center text-[10px] text-slate-400 pointer-events-none z-50 tracking-widest">
        WIZAI PROJECT &copy; 2024
      </footer>
    </div>
  );
}
