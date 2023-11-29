"use client"

import { Button } from "@nextui-org/button"
import { NavbarItem } from "@nextui-org/navbar"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import type { Key } from "react"

import FlagImage from "@/components/appbar/FlagImage"
import { useLanguage } from "@/hooks/useLanguage"
import config from "@/utils/config"

const LanguageDropdown = () => {
  const { language, selectedKeys, handleChangeLanguage } = useLanguage()

  const currentLanguage = config.languages.find(({ key }) => key === language)

  const handleSelectLanguage = async (languageKey: Key) => {
    const newLanguage = config.languages.find(({ key }) => key === languageKey)
      ?.key

    if (!newLanguage) {
      return
    }

    await handleChangeLanguage(newLanguage)
  }

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button disableRipple variant="light">
            <FlagImage flag={currentLanguage?.flag} />
            {currentLanguage?.label}
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="themes-choices"
        onAction={void handleSelectLanguage}
        selectedKeys={selectedKeys}
        selectionMode="single"
      >
        {config.languages.map(({ key, label, flag }) => (
          <DropdownItem key={key} startContent={<FlagImage flag={flag} />}>
            {label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default LanguageDropdown
