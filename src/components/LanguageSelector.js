import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  return (
    <>
      <img
        title="தமிழ்"
        onClick={() => i18n.changeLanguage("ta")}
        src="https://flagcdn.com/32x24/in.png"
        alt="Tamil Indian Flag"
      />
      <img
        title="English"
        onClick={() => i18n.changeLanguage("en")}
        src="https://flagcdn.com/32x24/gb-eng.png"
        alt="English GB Flag"
      />
    </>
  );
};

export default LanguageSelector;
