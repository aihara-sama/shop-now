import { MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import { countryToFlag } from "utils/countryToFlag";

const LanguageToggle = () => {
  const router = useRouter();
  const { pathname, asPath, query, locale, locales } = router;

  const toggleLanguage = (lg: string) => {
    router.push({ pathname, query }, asPath, {
      locale: lg,
    });
  };

  return (
    <Select
      size="small"
      data-testid="select-locale"
      value={locale}
      onChange={(e) => {
        toggleLanguage(e.target.value);
      }}
    >
      {locales.map((val, idx) => (
        <MenuItem data-testid={`menu-item-${val}`} value={val} key={idx}>
          {countryToFlag(val.toUpperCase())}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageToggle;
