import { AllEmoji } from "./utils";

// تعریف نوع پراپرتی‌های ورودی کامپوننت
interface MasterEmojiListProps {
  emojis: AllEmoji[];
  onEmojiSelect: (emoji: AllEmoji) => void;
}

export function MasterEmojiList({ emojis, onEmojiSelect }: MasterEmojiListProps) {
  return (
    <div className="master-list-container">
      <style>
        {`
          .master-list-container {
            width: 100%; max-height: 300px; overflow-y: auto;
            background-color: #f8f9fa; border: 1px solid #dee2e6;
            border-radius: 15px; padding: 1rem;
          }
          .emoji-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
            gap: 0.5rem;
          }
          .emoji-item {
            cursor: pointer; transition: transform 0.2s; padding: 5px;
            border-radius: 10px;
          }
          .emoji-item:hover { transform: scale(1.2); background-color: #e9ecef; }
          .emoji-item img { width: 100%; height: 100%; }
        `}
      </style>
      <div className="emoji-grid">
        {emojis.map((emoji) => (
          <div
            key={emoji.unicode}
            className="emoji-item"
            onClick={() => onEmojiSelect(emoji)}
            title={emoji.alt}
          >
            <img src={emoji.gStatic} alt={emoji.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
