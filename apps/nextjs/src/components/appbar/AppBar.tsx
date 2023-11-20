import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar"
import NextLink from "~/components/ui/NextLink"

import ThemeDropdown from "@/components/appbar/ThemeDropdown"

const AppBar = () => {
  const menuItems = [
    {
      label: "Characters",
      href: "/characters",
    },
  ]

  return (
    <Navbar maxWidth="lg">
      <NavbarMenuToggle aria-label="menu" className="sm:hidden" />
      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        <NavbarItem>
          <NextLink href="/characters">Characters</NextLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="">
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
