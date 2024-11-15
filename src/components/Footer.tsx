import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-6 ${
      theme === "light" ? "bg-gray-200/30" : "bg-white/5 text-white"
    }`}>
      <div className="container mx-auto text-center">
        <p>v1.0.0 <span className="px-1">|</span> &copy; 2023 Weeranut Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
