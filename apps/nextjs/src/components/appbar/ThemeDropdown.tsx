"use client"

import type { Key } from "react"
import { useCallback, useState } from "react"
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

const ThemeDropdown = () => {
  const { theme, setTheme } = useTheme()
  const [themeSelected, setThemeSelected] = useState(
    new Set([theme ?? "system"]),
  )

  const handleChangeTheme = useCallback(
    (themeKey: Key) => {
      const theme = themeKey.toString()

      setTheme(theme)
      setThemeSelected(new Set([theme]))
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
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="light">Light</DropdownItem>
        <DropdownItem key="dark">Dark</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ThemeDropdown
