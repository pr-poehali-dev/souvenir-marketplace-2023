import Icon from "@/components/ui/icon";

interface MaxButtonProps {
  phoneNumber?: string;
}

const MaxButton = ({ phoneNumber = "+79503171377" }: MaxButtonProps) => {
  const handleClick = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-fade-in group flex items-center justify-center"
      aria-label="Позвонить в MAX"
    >
      <Icon name="Phone" size={28} className="drop-shadow-lg" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-background text-foreground px-4 py-2 rounded-lg shadow-lg font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Позвонить в MAX
      </span>
    </button>
  );
};

export default MaxButton;