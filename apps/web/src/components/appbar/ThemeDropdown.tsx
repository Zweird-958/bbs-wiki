"use client"

import { Button } from "@nextui-org/button"
import { NavbarItem } from "@nextui-org/navbar"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { MoonIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useCallback, useState, type Key } from "react"

import { useLanguage } from "@/hooks/useLanguage"

const ThemeDropdown = () => {
  const { theme, setTheme } = useTheme()
  const [themeSelected, setThemeSelected] = useState(
    new Set([theme ?? "system"]),
  )

  const {
    translations: { common },
  } = useLanguage()

  const handleChangeTheme = useCallback(
    (themeKey: Key) => {
      const themeChosen = themeKey.toString()

      setTheme(themeChosen)
      setThemeSelected(new Set([themeChosen]))
    },
    [setTheme],
  )

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button isIconOnly disableRipple variant="light">
            <MoonIcon />
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="themes-choices"
        onAction={handleChangeTheme}
        selectedKeys={themeSelected}
        selectionMode="single"
      >
        <DropdownItem key="system">{common.system}</DropdownItem>
        <DropdownItem key="light">{common.light}</DropdownItem>
        <DropdownItem key="dark">{common.dark}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ThemeDropdown
