"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mic,
  Volume2,
  Headphones,
  Trophy,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Star,
  Layers,
  Heart,
  BookOpen,
  Puzzle,
} from "lucide-react";
import { HindiNavbar as Navbar } from "@/components/HindiNavbar";
import { SettingsModal } from "@/components/SettingsModal";
import { ToleranceMode } from "@/lib/comparison";
import { CATEGORIES } from "@/data/hindiContent";
import { useProgress } from "@/hooks/useProgress";

export default function HomePage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tolerance, setTolerance] = useState<ToleranceMode>("normal");
  const [speechRate, setSpeechRate] = useState<number>(0.82);
  const [showParentOverride, setShowParentOverride] = useState<boolean>(true);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const { progress } = useProgress();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        tolerance={tolerance}
        onToleranceChange={setTolerance}
        speechRate={speechRate}
        onSpeechRateChange={setSpeechRate}
        showParentOverride={showParentOverride}
        onToggleParentOverride={setShowParentOverride}
        autoAdvance={autoAdvance}
        onToggleAutoAdvance={setAutoAdvance}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-pink-500 p-8 sm:p-14 text-white shadow-2xl overflow-hidden mb-12">
          {/* Decorative floating bubbles */}
          <div className="absolute top-2 right-4 text-7xl opacity-30 select-none animate-spin-slow">
            🎈
          </div>
          <div className="absolute -bottom-8 -left-8 text-8xl opacity-20 select-none">
            ⭐
          </div>

          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-xs sm:text-sm mb-4 border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>बच्चों के लिए बोलकर सीखने का नया तरीका!</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-4 drop-shadow">
              सुनो, बोलो और <br />
              <span className="text-yellow-200">हिंदी सीखो!</span>
            </h1>

            <p className="text-base sm:text-xl font-medium text-amber-50 mb-8 leading-relaxed max-w-xl">
              बड़ी हिंदी आकृतियाँ, सही उच्चारण, माइक से आवाज़ पहचान (hi-IN) और ढेर सारे चमचमाते सितारे!
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/word-builder"
                className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-black text-lg shadow-xl hover:bg-amber-50 transition-transform active:scale-95 flex items-center gap-3"
              >
                <Puzzle className="w-6 h-6 text-orange-500" />
                <span>शब्द बनाओ (Word Builder)</span>
                <ArrowRight className="w-5 h-5 text-slate-400" />
              </Link>

              <Link
                href="/sound-reading"
                className="px-6 py-4 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-base border border-white/40 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-yellow-200" />
                <span>शब्द-पठन (2, 3, 4 अक्षर)</span>
              </Link>

              <Link
                href="/barakhadi"
                className="px-6 py-4 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-base border border-white/40 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-200 animate-spin-slow" />
                <span>बारहखड़ी</span>
              </Link>

              <Link
                href="/practice"
                className="px-6 py-4 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-base border border-white/40 transition-all flex items-center gap-2"
              >
                <Mic className="w-5 h-5 text-yellow-200" />
                <span>सुनो और बोलो</span>
              </Link>

              <Link
                href="/my-voice"
                className="px-6 py-4 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-base border border-white/40 transition-all flex items-center gap-2"
              >
                <Headphones className="w-5 h-5 text-sky-200" />
                <span>मेरी आवाज़ सुनो</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Modes Grid */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
              सीखने के मज़ेदार तरीके 🎯
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              अपनी पसंद का अभ्यास चुनें और बोलना शुरू करें
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Mode 1: चित्र देखकर शब्द बनाओ (Word Builder) */}
            <Link
              href="/word-builder"
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border-4 border-orange-400 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  🧩
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  चित्र देखकर शब्द बनाओ
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  चित्र देखो और खाली स्लॉट्स में सही अक्षर (क, म, ल) व मात्राएँ जोड़कर पूरा शब्द बनाएं! क से ज्ञ तक 270+ बारहखड़ी शब्द और 6 स्तर उपलब्ध।
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-orange-600 font-black text-sm">
                <span>शब्द बनाएं</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Mode 2: शब्द-पठन (2, 3, 4 अक्षर) */}
            <Link
              href="/sound-reading"
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border-4 border-amber-400 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  📖
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  शब्द-पठन (2, 3, 4 अक्षर)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  दो, तीन और चार अक्षर वाले शब्द। अलग-अलग अक्षर सुनो, ध्वनियाँ जोड़कर पढ़ो, चित्र चुनो और अपनी आवाज़ मिलाओ!
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-amber-600 font-black text-sm">
                <span>पठन शुरू करें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Mode 2: बारहखड़ी */}
            <Link
              href="/barakhadi"
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border-4 border-emerald-300 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  ✨
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  संपूर्ण बारहखड़ी
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  क से ज्ञ तक सभी 34 व्यंजनों की पूरी बारहखड़ी, सही उच्चारण व बोलने का अभ्यास!
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-emerald-600 font-black text-sm">
                <span>बारहखड़ी खोलें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Mode 3: सुनो और बोलो */}
            <Link
              href="/practice"
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border-4 border-orange-300 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  🎙️
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  सुनो और बोलो
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  शब्द सुनो, माइक से खुद बोलो और तुरंत देखो कि तुमने कितना सही बोला!
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-orange-600 font-black text-sm">
                <span>अभ्यास करें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Mode 4: मेरी आवाज़ सुनो */}
            <Link
              href="/my-voice"
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border-4 border-sky-300 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  🎧
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  मेरी आवाज़ सुनो
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  अपनी आवाज़ रिकॉर्ड करो, ध्वनि तरंगें (Waveform) देखो और सही आवाज़ से बारी-बारी मिलाओ।
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sky-600 font-black text-sm">
                <span>रिकॉर्ड करें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Mode 5: मिलती-जुलती ध्वनियाँ */}
            <Link
              href="/similar-sounds"
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border-4 border-teal-300 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  👂
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  मिलती-जुलती ध्वनियाँ
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  त vs ट, द vs ड, स vs श, ब vs व में अंतर समझो और जीभ की सही स्थिति जानो।
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-teal-600 font-black text-sm">
                <span>अंतर समझें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Mode 6: प्रगति व सितारे */}
            <Link
              href="/progress"
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border-4 border-purple-300 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  🏆
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  प्रगति व मेडल
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  कमाए गए सितारे ⭐, पूरे किए गए पाठ और अनलॉक किए गए पुरस्कार देखें।
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-purple-600 font-black text-sm">
                <span>सितारे ({progress.starsEarned})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800">
                पाठ्यक्रम श्रेणियाँ 📚
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                स्वर, व्यंजन से लेकर पूरे मात्रा वाले शब्दों तक
              </p>
            </div>
            <Link
              href="/practice"
              className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>सभी देखें</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/practice?category=${cat.id}`}
                className="p-5 rounded-3xl bg-white border-2 border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-black text-slate-800 text-base mb-1">
                  {cat.nameHindi}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Kid Safety & Browser Support Guarantee */}
        <div className="rounded-3xl bg-amber-100/70 border-2 border-amber-300 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shrink-0 text-2xl shadow-sm">
              🛡️
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                100% सुरक्षित और स्थानीय (Private & Child-Friendly)
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl leading-relaxed">
                बच्चे की आवाज़ केवल ब्राउज़र के अंदर जांची जाती है। कोई भी ऑडियो किसी सर्वर पर अपलोड नहीं किया जाता। यदि ब्राउज़र में माइक उपलब्ध न हो तो शिक्षक/अभिभावक मंज़ूरी से आगे बढ़ा जा सकता है।
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="shrink-0 px-5 py-3 rounded-2xl bg-white text-slate-800 font-bold text-sm shadow hover:bg-slate-50 transition-colors border border-amber-200"
          >
            ⚙️ सेटिंग्स देखें
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t-2 border-amber-200 bg-white py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🎈 बोलो हिंदी — बच्चों के लिए आनंदमय हिंदी भाषा शिक्षण</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for young learners
          </span>
        </div>
      </footer>
    </div>
  );
}

