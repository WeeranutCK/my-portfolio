import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-6 ${
      theme === "light" ? "" : "text-white"
    }`}>
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Weeranut Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
