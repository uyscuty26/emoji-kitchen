import { useEffect, useMemo, useState } from "react";
import { AllEmoji, getSupportedEmojis, getValidEmojis } from "./utils";
import { MasterEmojiList } from "./MasterEmojiList"; // فایل جدیدی که خواهیم ساخت

export function Kitchen() {
  const [leftEmoji, setLeftEmoji] = useState<AllEmoji | null>(null);
  const [rightEmoji, setRightEmoji] = useState<AllEmoji | null>(null);
  const [result, setResult] = useState<string>("");
  const [activeBox, setActiveBox] = useState<1 | 2>(1); // 1 برای کادر چپ، 2 برای راست

  const supportedEmojis = useMemo(() => getSupportedEmojis(), []);

  useEffect(() => {
    if (leftEmoji && rightEmoji) {
      const valid = getValidEmojis(leftEmoji.unicode, rightEmoji.unicode);
      setResult(valid?.gStatic || "");
    } else {
      setResult("");
    }
  }, [leftEmoji, rightEmoji]);

  // این تابع وقتی کاربر یک ایموجی از لیست بالا انتخاب می‌کند، اجرا می‌شود
  const handleEmojiSelect = (emoji: AllEmoji) => {
    if (activeBox === 1) {
      setLeftEmoji(emoji);
      // اگر ایموجی دوم هم وجود داشت، آن را پاک میکنیم تا ترکیب جدید ساخته شود
      if (rightEmoji) setRightEmoji(null);
      setActiveBox(2); // به صورت خودکار کادر دوم را فعال می‌کنیم
    } else {
      setRightEmoji(emoji);
      setActiveBox(1); // به کادر اول برمیگردیم برای ترکیب بعدی
    }
  };

  const copyToClipboard = async () => {
    if (!result) return;
    try {
      const response = await fetch(result);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      alert("استیکر کپی شد! حالا می‌توانی در تلگرام Paste کنی.");
    } catch (error) {
      console.error("Failed to copy image: ", error);
      alert("خطا در کپی کردن استیکر.");
    }
  };

  return (
    <div className="kitchen-container">
      {/* استایل‌های جدید برای ظاهر مدرن */}
      <style>
        {`
          .kitchen-container { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
          .combo-box { display: flex; align-items: center; justify-content: center; gap: 1rem; font-size: 2.5rem; }
          .emoji-slot {
            width: 100px; height: 100px; border: 3px dashed #ccc; border-radius: 20px;
            display: flex; align-items: center; justify-content: center; cursor: pointer;
            transition: border-color 0.2s, transform 0.2s;
          }
          .emoji-slot.active { border-color: #007bff; transform: scale(1.1); }
          .emoji-slot img { width: 80%; height: 80%; }
          .result-slot { width: 120px; height: 120px; cursor: pointer; }
          .result-slot img { width: 100%; height: 100%; transition: transform 0.2s; }
          .result-slot img:hover { transform: scale(1.1); }
        `}
      </style>

      {/* لیست کامل ایموجی‌ها در بالا */}
      <MasterEmojiList emojis={supportedEmojis} onEmojiSelect={handleEmojiSelect} />

      {/* بخش ترکیب ایموجی در وسط */}
      <div className="combo-box">
        <div
          className={`emoji-slot ${activeBox === 1 ? "active" : ""}`}
          onClick={() => setActiveBox(1)}
        >
          {leftEmoji ? <img src={leftEmoji.gStatic} alt={leftEmoji.alt} /> : "?"}
        </div>
        <span>+</span>
        <div
          className={`emoji-slot ${activeBox === 2 ? "active" : ""}`}
          onClick={() => setActiveBox(2)}
        >
          {rightEmoji ? <img src={rightEmoji.gStatic} alt={rightEmoji.alt} /> : "?"}
        </div>
        <span>=</span>
        <div className="result-slot" onClick={copyToClipboard} title="برای کپی کردن کلیک کن">
          {result ? <img src={result} alt="Combined Emoji" /> : "..."}
        </div>
      </div>
    </div>
  );
}
