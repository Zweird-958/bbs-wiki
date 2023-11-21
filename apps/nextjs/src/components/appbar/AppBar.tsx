import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar"

import LanguageDropdown from "@/components/appbar/LanguageDropdown"
import ThemeDropdown from "@/components/appbar/ThemeDropdown"
import NextLink from "@/components/ui/NextLink"
import getServerLanguage from "@/utils/getServerLanguage"
import getTranslations from "@/utils/language/getTranslations"

const AppBar = async () => {
  const menuItems = [
    {
      label: "Characters",
      href: "/characters",
    },
  ]
  const language = getServerLanguage()
  const { common } = await getTranslations(language)

  return (
    <Navbar maxWidth="lg">
      <NavbarMenuToggle aria-label="menu" className="sm:hidden" />
      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        <NavbarItem>
          <NextLink href="/characters">{common.characters}</NextLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="">
        <LanguageDropdown />
        <ThemeDropdown />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(({ label, href }, index) => (
          <NavbarMenuItem key={`${href}-${index}`}>
            <NextLink className="w-full" href={href}>
              {label}
            </NextLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default AppBar
