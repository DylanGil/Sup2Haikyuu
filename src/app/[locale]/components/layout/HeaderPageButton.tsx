import Link from "next/link";
import { useTranslations } from "next-intl";
const HeaderPageButton = ({
  href,
  pageTitle,
  target,
  onClick,
  mobile,
}: {
  href: string;
  pageTitle: string;
  target?: string;
  onClick?: () => void;
  mobile?: boolean;
}) => {
  const t = useTranslations("page-title");
  return (
    <Link
      href={href}
      className={
        mobile
          ? "text-base font-bold text-foreground"
          : "ml-8 mt-3 text-sm font-medium text-foreground hover:text-primary"
      }
      target={target}
      onClick={onClick}
    >
      <p className="mb-4">{t(pageTitle)}</p>
    </Link>
  );
};

export default HeaderPageButton;
